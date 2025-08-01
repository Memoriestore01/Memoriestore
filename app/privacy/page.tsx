import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4">Privacy Policy</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your privacy is important to us. This policy explains how Memoriestore collects, uses, and protects your
          information.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 2024</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <p className="text-gray-600">
                When you create an account or make a purchase, we collect information such as your name, email address,
                phone number, and billing information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customization Data</h4>
              <p className="text-gray-600">
                We collect the information you provide when customizing video invitations, including event details,
                names, dates, and messages.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Information</h4>
              <p className="text-gray-600">
                We automatically collect information about how you use our website, including your IP address, browser
                type, pages visited, and time spent on our site.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-600">
              <li>• To provide and improve our video invitation services</li>
              <li>• To process your orders and payments</li>
              <li>• To communicate with you about your account and orders</li>
              <li>• To send you marketing communications (with your consent)</li>
              <li>• To provide customer support</li>
              <li>• To prevent fraud and ensure security</li>
              <li>• To comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• With service providers who help us operate our business (payment processors, hosting providers)</li>
              <li>• When required by law or to protect our rights</li>
              <li>• In connection with a business transfer or merger</li>
              <li>• With your explicit consent</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• SSL encryption for data transmission</li>
              <li>• Secure servers and databases</li>
              <li>• Regular security audits</li>
              <li>• Access controls and authentication</li>
              <li>• Employee training on data protection</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We use cookies and similar technologies to enhance your experience on our website. Cookies help us:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Remember your preferences and settings</li>
              <li>• Analyze website traffic and usage patterns</li>
              <li>• Provide personalized content and advertisements</li>
              <li>• Improve our services</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You can control cookies through your browser settings, but disabling cookies may affect your experience on
              our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">You have the following rights regarding your personal information:</p>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <strong>Access:</strong> Request a copy of your personal information
              </li>
              <li>
                • <strong>Correction:</strong> Update or correct inaccurate information
              </li>
              <li>
                • <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                • <strong>Portability:</strong> Request transfer of your data to another service
              </li>
              <li>
                • <strong>Objection:</strong> Object to processing of your information
              </li>
              <li>
                • <strong>Withdrawal:</strong> Withdraw consent for marketing communications
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              To exercise these rights, please contact us at memoriestore01@gmail.com
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We retain your personal information for as long as necessary to provide our services and comply with legal
              obligations. Account information is retained until you request deletion. Order and payment information is
              retained for 7 years for tax and legal purposes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you believe we have collected information from a child under 13,
              please contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. International Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information in accordance with this privacy policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting
              the new policy on our website and updating the "Last updated" date. Your continued use of our services
              after changes constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> memoriestore01@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +91 76760 21271
              </p>
              <p>
                <strong>Address:</strong> KundalaHalli Gate, MarathaHalli,
                Bengaluru, Karnataka 560037 , India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
