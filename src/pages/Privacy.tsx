
import React from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose max-w-none text-recoai-gray">
              <p className="mb-4">
                <strong>Last updated:</strong> April 12, 2025
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
              <p className="mb-4">
                CortexCart ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="mb-4">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Register for an account</li>
                <li>Use our services</li>
                <li>Subscribe to our newsletter</li>
                <li>Respond to surveys or questionnaires</li>
                <li>Contact our customer support</li>
              </ul>
              <p className="mb-4">
                The types of information we may collect include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Contact information (name, email address, phone number)</li>
                <li>Billing information (billing address, payment method details)</li>
                <li>Account credentials (username, password)</li>
                <li>Company information (name, website, industry)</li>
                <li>Usage data (features used, interactions with our platform)</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Provide customer support</li>
                <li>Send marketing communications</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize and improve your experience</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a business transaction, such as a merger or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p className="mb-4">
                We do not sell your personal information to third parties.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights and Choices</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing of your personal information</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at privacy@recoai.com.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="mb-4">
                Email: privacy@cortexcart.com<br />
                Address: 123 AI Street, San Francisco, CA 94103, United States
              </p>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Privacy;
