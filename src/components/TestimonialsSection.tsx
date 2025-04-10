
import React from "react";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  stars: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, image, stars }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={16} fill="#FFC107" color="#FFC107" />
        ))}
      </div>
      <p className="text-recoai-darkGray mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <div>
          <h4 className="font-bold text-recoai-darkGray">{author}</h4>
          <p className="text-sm text-recoai-gray">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "RecoAI has transformed how we understand our customers. Our conversion rate is up 28% since implementing their recommendations.",
      author: "Sarah Johnson",
      role: "E-commerce Manager",
      company: "Urban Outfitters",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      stars: 5
    },
    {
      quote: "The insights from RecoAI helped us focus our marketing efforts on what actually drives sales. It paid for itself within the first month.",
      author: "David Chen",
      role: "Founder",
      company: "Eco Essentials",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      stars: 5
    },
    {
      quote: "As a small business owner, I was skeptical about AI tools, but RecoAI is incredibly user-friendly and the results speak for themselves.",
      author: "Emily Rodriguez",
      role: "Owner",
      company: "Bella Boutique",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      stars: 4
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-lg text-recoai-gray max-w-2xl mx-auto">
            Hear from store owners who've transformed their business with RecoAI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
