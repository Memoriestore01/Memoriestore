"use client"

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { QrCode } from 'lucide-react'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeComponent({ value, size = 200, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('QR Code useEffect triggered:', { value, size, hasCanvas: !!canvasRef.current })
    
    if (canvasRef.current && value) {
      console.log('Generating QR code for value:', value)
      setError(false)
      setLoading(true)
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(() => {
        console.log('QR code generated successfully')
        setLoading(false)
      }).catch((err) => {
        console.error('Error generating QR code:', err)
        setError(true)
        setLoading(false)
      })
    } else {
      console.log('Cannot generate QR code:', { hasCanvas: !!canvasRef.current, hasValue: !!value })
      if (!value) {
        setLoading(false)
      }
    }
  }, [value, size])

  if (!value) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300`}
        style={{ width: size, height: size }}
      >
        <div className="text-center text-gray-500">
          <QrCode className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">No QR Code Data</p>
          <p className="text-xs">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300`}
        style={{ width: size, height: size }}
      >
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
          <p className="text-sm">Generating QR Code...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300`}
        style={{ width: size, height: size }}
      >
        <div className="text-center text-gray-500">
          <QrCode className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">QR Code Error</p>
          <p className="text-xs">Use UPI ID instead</p>
        </div>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${className} qr-code-canvas`}
      style={{ width: size, height: size }}
    />
  )
} 