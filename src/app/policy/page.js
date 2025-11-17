import Link from 'next/link';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              AI Wellness
            </Link>
            <Link href="/" className="text-gray-600 hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> January 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Account information (name, email)</li>
                <li>Face images for analysis</li>
                <li>Food images for scanning</li>
                <li>Usage analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide AI analysis services</li>
                <li>Improve app functionality</li>
                <li>Send service updates</li>
                <li>Process payments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Google Gemini AI for image analysis</li>
                <li>Cloudinary for image storage</li>
                <li>Buy Me a Coffee for payments</li>
                <li>MongoDB for data storage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-700">
                For privacy questions: privacy@aiwellness.app
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}