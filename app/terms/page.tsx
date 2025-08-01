import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Terms & Conditions</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Please read these terms and conditions carefully before using Memoriestore services.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 2024</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              By accessing and using Memoriestore's website and services, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please do not use this
              service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Service Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Memoriestore provides customizable video invitation templates for various events including weddings,
              birthdays, parties, and other celebrations. Our services include:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Access to video invitation templates</li>
              <li>• Customization tools for personalizing invitations</li>
              <li>• Digital delivery of final video files</li>
              <li>• Customer support services</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Creation</h4>
              <p className="text-gray-600">
                You must create an account to purchase our services. You are responsible for maintaining the
                confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Responsibilities</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Provide accurate and complete information</li>
                <li>• Keep your account information updated</li>
                <li>• Maintain the security of your password</li>
                <li>• Notify us immediately of any unauthorized use</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Purchases and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Pricing</h4>
              <p className="text-gray-600">
                All prices are listed in Indian Rupees (INR) and are subject to change without notice. The price you pay
                is the price displayed at the time of purchase.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment Processing</h4>
              <p className="text-gray-600">
                Payments are processed through Razorpay. By making a purchase, you agree to Razorpay's terms of service.
                We do not store your payment information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Order Completion</h4>
              <p className="text-gray-600">
                Orders are considered complete upon successful payment processing. You will receive immediate access to
                download your customized video invitation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Refund Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Refund Eligibility</h4>
              <p className="text-gray-600">
                We offer a 100% refund within 24 hours of purchase if you are not satisfied with your video invitation,
                provided you have not downloaded the final video file.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Refund Process</h4>
              <p className="text-gray-600">
                To request a refund, contact our support team at memoriestore01@gmail.com with your order details.
                Refunds will be processed within 5-7 business days to your original payment method.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Non-Refundable Situations</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• After downloading the final video file</li>
                <li>• After 24 hours from purchase</li>
                <li>• For customization errors due to incorrect information provided by the user</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Our Content</h4>
              <p className="text-gray-600">
                All video templates, designs, graphics, music, and other content provided by Memoriestore are protected
                by copyright and other intellectual property laws. You may not reproduce, distribute, or create
                derivative works without our written permission.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">License to Use</h4>
              <p className="text-gray-600">
                Upon purchase, you receive a non-exclusive, non-transferable license to use the customized video
                invitation for personal use only. Commercial use is prohibited without explicit written permission.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">User Content</h4>
              <p className="text-gray-600">
                You retain ownership of any content you provide for customization. By using our services, you grant us a
                license to use your content solely for the purpose of creating your video invitation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">You may not use our services for:</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>
                • Violating any international, federal, provincial, or state regulations, rules, laws, or local
                ordinances
              </li>
              <li>
                • Infringing upon or violating our intellectual property rights or the intellectual property rights of
                others
              </li>
              <li>
                • Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or
                discriminating
              </li>
              <li>• Submitting false or misleading information</li>
              <li>• Uploading or transmitting viruses or any other type of malicious code</li>
              <li>• Collecting or tracking the personal information of others</li>
              <li>• Spamming, phishing, pharming, pretexting, spidering, crawling, or scraping</li>
              <li>• Any obscene or immoral purpose or to encourage others to perform such acts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Memoriestore shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
              resulting from your use of our services. Our total liability shall not exceed the amount you paid for the
              specific service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our services are provided "as is" and "as available" without any warranties of any kind, either express or
              implied. We do not warrant that our services will be uninterrupted, secure, or error-free, or that defects
              will be corrected.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You agree to defend, indemnify, and hold harmless Memoriestore and its affiliates, officers, directors,
              employees, and agents from and against any and all claims, damages, obligations, losses, liabilities,
              costs, or debt, and expenses (including attorney's fees) arising from your use of our services or
              violation of these terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We may terminate or suspend your account and access to our services immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the terms. Upon
              termination, your right to use our services will cease immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              These terms shall be interpreted and governed by the laws of India. Any disputes arising from these terms
              or your use of our services shall be subject to the exclusive jurisdiction of the courts in Gurgaon,
              Haryana, India.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We reserve the right to modify or replace these terms at any time. If a revision is material, we will try
              to provide at least 30 days notice prior to any new terms taking effect. Your continued use of our
              services after changes constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> memoriestore01@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +91 76760 21271
              </p>
              <p>
                <strong>Address:</strong> KundalaHalli Gate, MarathaHalli, Bengaluru, Karnataka
                560037, India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
