
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "What is RecoAI?",
      answer:
        "RecoAI is an AI-powered analytics and recommendation platform designed specifically for e-commerce stores. It helps you understand customer behavior, personalize shopping experiences, and boost your sales through intelligent insights and recommendations.",
    },
    {
      question: "How does the 14-day free trial work?",
      answer:
        "You can sign up for any plan and try all features completely free for 14 days. No credit card is required to start your trial. At the end of your trial period, you can choose to continue with your selected plan or downgrade/upgrade as needed.",
    },
    {
      question: "Do I need technical skills to use RecoAI?",
      answer:
        "Not at all! RecoAI is designed to be user-friendly for store owners of all technical backgrounds. Our simple dashboard and one-click installation make it easy to get started. If you ever need help, our support team is ready to assist you.",
    },
    {
      question: "Which e-commerce platforms does RecoAI integrate with?",
      answer:
        "RecoAI seamlessly integrates with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and more. We also offer a simple API for custom integrations.",
    },
    {
      question: "How long does it take to set up RecoAI?",
      answer:
        "Most store owners complete the setup in less than 10 minutes. Simply create an account, install our tracking code on your store (we provide easy instructions), and RecoAI will start collecting data and generating insights immediately.",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can change your plan at any time. If you upgrade, you'll be billed the prorated difference. If you downgrade, you'll receive credit toward your next billing cycle.",
    },
    {
      question: "Is my data secure with RecoAI?",
      answer:
        "Absolutely. We take data security seriously. RecoAI is GDPR compliant and uses bank-level encryption to protect your data. We never sell your information to third parties, and you maintain complete ownership of your data.",
    },
    {
      question: "What kind of support does RecoAI offer?",
      answer:
        "We provide email support for all plans, with priority support for Business and Enterprise customers. Enterprise plans also include dedicated account managers. Our comprehensive knowledge base and video tutorials are available to all users.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-recoai-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-1 text-recoai-gray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-recoai-gray mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="inline-flex gap-4">
              <a
                href="/contact"
                className="inline-flex items-center text-recoai-purple hover:text-recoai-purple/90 font-medium"
              >
                Contact Support
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
