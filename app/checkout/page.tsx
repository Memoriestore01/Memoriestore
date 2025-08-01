"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  Download
} from "lucide-react"

import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CheckoutItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  customization: { [key: string]: string }
}

interface CheckoutData {
  items: CheckoutItem[]
  total: number
  type: 'cart' | 'direct_purchase'
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items: cartItems, total: cartTotal, clearCart } = useCart()
  const router = useRouter()
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'BANK_TRANSFER'>('UPI')
  const [transactionId, setTransactionId] = useState('')
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string>('')
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  })
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Check for direct purchase from product page
    if (typeof window !== 'undefined') {
      const directPurchase = sessionStorage.getItem('directPurchase')
      if (directPurchase) {
        try {
          const data = JSON.parse(directPurchase)
          setCheckoutData(data)
          sessionStorage.removeItem('directPurchase')
        } catch (error) {
          console.error('Error parsing direct purchase data:', error)
          toast.error('Invalid checkout data. Please try again.')
          // Use setTimeout to avoid navigation during render
          setTimeout(() => router.push('/'), 0)
        }
      } else if (cartItems.length > 0) {
        // Use cart items
        setCheckoutData({
          items: cartItems,
          total: cartTotal,
          type: 'cart'
        })
      } else {
        // No items to checkout
        // Use setTimeout to avoid navigation during render
        setTimeout(() => {
          router.push('/')
          toast.error('No items to checkout')
        }, 0)
      }
    } else if (cartItems.length > 0) {
      // Use cart items
      setCheckoutData({
        items: cartItems,
        total: cartTotal,
        type: 'cart'
      })
    }
  }, [cartItems, cartTotal, router, toast])

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB')
        return
      }
      
      setPaymentScreenshot(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setScreenshotPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }



  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order')
      return
    }

    if (paymentMethod === 'UPI') {
      if (!transactionId.trim()) {
        toast.error('Please enter transaction ID')
        return
      }

      if (!paymentScreenshot) {
        toast.error('Please upload payment screenshot')
        return
      }
    } else if (paymentMethod === 'BANK_TRANSFER') {
      if (!transactionId.trim()) {
        toast.error('Please enter bank transfer reference number')
        return
      }

      if (!paymentScreenshot) {
        toast.error('Please upload bank transfer receipt')
        return
      }
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      toast.error('Please fill in all shipping address fields')
      return
    }

    setLoading(true)

    try {
      // Upload screenshot first
      const formData = new FormData()
      formData.append('file', paymentScreenshot!)
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload screenshot')
      }

      const uploadData = await uploadResponse.json()
      const screenshotUrl = uploadData.url

      // Create order
      const orderData = {
        items: checkoutData!.items,
        subtotal: checkoutData!.total,
        shipping: 0,
        total: checkoutData!.total,
        paymentDetails: {
          method: paymentMethod === 'UPI' ? 'UPI' : 'BANK_TRANSFER',
          upiId: paymentMethod === 'UPI' ? 'sharmabhupender206@oksbi' : undefined,
          bankDetails: paymentMethod === 'BANK_TRANSFER' ? {
            bankName: 'HDFC Bank',
            accountNumber: '1234567890',
            ifscCode: 'HDFC1234567',
            accountHolder: 'Bhupender Sharma'
          } : undefined,
          transactionId: transactionId,
          amount: checkoutData!.total,
          screenshot: screenshotUrl,
          status: 'pending'
        },
        shippingAddress,
        notes
      }

      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderResult = await orderResponse.json()

      // Clear cart if order was from cart
      if (checkoutData!.type === 'cart') {
        await clearCart()
      }

      toast.success('Order placed successfully! Payment will be verified by admin.')
      router.push(`/orders/${orderResult.order.orderId}`)

    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
          <div className="mt-4 text-xs text-gray-500">
            Debug: Cart items: {cartItems.length}, Cart total: {cartTotal}
          </div>
        </div>
      </div>
    )
  }

  // Add error boundary
  if (!checkoutData.items || checkoutData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No items to checkout</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkoutData.items.map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {Object.keys(item.customization).length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.customization).map(([key, value]) => (
                            <div key={key}>{key}: {value}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(checkoutData.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{formatPrice(checkoutData.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Shipping */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    key="upi-button"
                    variant={paymentMethod === 'UPI' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('UPI')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="font-semibold">UPI Payment</span>
                    <span className="text-xs text-gray-600">Scan QR or use UPI ID</span>
                  </Button>
                  
                  <Button
                    key="bank-button"
                    variant={paymentMethod === 'BANK_TRANSFER' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('BANK_TRANSFER')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="font-semibold">Bank Transfer</span>
                    <span className="text-xs text-gray-600">Direct bank transfer</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bank Account Details */}
            {paymentMethod === 'BANK_TRANSFER' && (
              <Card key="bank-transfer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Bank Account Details
                  </CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-blue-800">Bank Name:</span>
                      <p className="text-lg font-mono text-blue-900 bg-blue-100 p-2 rounded mt-1">
                        HDFC Bank
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-800">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-mono text-blue-900 bg-blue-100 p-2 rounded mt-1 flex-1">
                          1234567890
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard('1234567890')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-800">IFSC Code:</span>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-mono text-blue-900 bg-blue-100 p-2 rounded mt-1 flex-1">
                          HDFC1234567
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard('HDFC1234567')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-800">Account Holder:</span>
                      <p className="text-lg font-mono text-blue-900 bg-blue-100 p-2 rounded mt-1">
                        Bhupender Sharma
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Important for Bank Transfer:</p>
                      <ul className="space-y-1">
                        <li>• Use the exact account number and IFSC code</li>
                        <li>• Add your order reference in the transfer description</li>
                        <li>• Keep the transfer receipt for verification</li>
                        <li>• Transfer amount: <span className="font-bold">{formatPrice(checkoutData?.total || 0)}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {/* UPI Payment */}
            {paymentMethod === 'UPI' && (
            <Card key="upi-payment">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  UPI Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-800">UPI ID:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('sharmabhupender206@oksbi')}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-lg font-mono text-green-900 bg-green-100 p-2 rounded">
                    sharmabhupender206@oksbi
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                    <div className="flex justify-center mb-4">
                      <img 
                        src="/upi.png" 
                        alt="UPI QR Code" 
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a')
                          link.download = 'upi-qr-code.png'
                          link.href = '/upi.png'
                          link.click()
                          toast.success('QR code downloaded!')
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download QR
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">Scan QR code to pay</p>
                    <p className="text-xs text-gray-500 mt-1">Or use UPI ID above</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="transaction-id" className="text-sm font-medium">
                    {paymentMethod === 'UPI' ? 'Transaction ID *' : 'Bank Transfer Reference *'}
                  </Label>
                  <Input
                    id="transaction-id"
                    placeholder={paymentMethod === 'UPI' ? 'Enter UPI transaction ID' : 'Enter bank transfer reference number'}
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="screenshot" className="text-sm font-medium">
                    {paymentMethod === 'UPI' ? 'Payment Screenshot *' : 'Bank Transfer Receipt *'}
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="screenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="screenshot"
                      className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      {screenshotPreview ? (
                        <img
                          src={screenshotPreview}
                          alt="Payment screenshot"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload {paymentMethod === 'UPI' ? 'screenshot' : 'receipt'}
                          </p>
                          <p className="text-xs text-gray-500">Max 5MB</p>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street" className="text-sm font-medium">Street Address *</Label>
                  <Input
                    id="street"
                    placeholder="Enter street address"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="zipCode" className="text-sm font-medium">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="Enter ZIP code"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any special instructions or notes for your order"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Place Order - {formatPrice(checkoutData.total)}
                </div>
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Important:</p>
                  <ul className="space-y-1">
                    <li>• Make payment using the UPI ID provided</li>
                    <li>• Upload the payment screenshot</li>
                    <li>• Enter the transaction ID from your UPI app</li>
                    <li>• Admin will verify your payment within 24 hours</li>
                    <li>• Order will be processed after payment verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
