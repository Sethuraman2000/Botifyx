import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How does Botifyx work with my existing data?',
    answer: 'Botifyx seamlessly integrates with your existing data sources through our secure API connections. We support all major database systems, cloud storage providers, and business applications. Our platform can ingest structured and unstructured data, then process it using our advanced AI models to generate insights.'
  },
  {
    id: 2,
    question: 'Is my data secure with Botifyx?',
    answer: 'Absolutely. Security is our top priority. We use bank-level encryption for all data in transit and at rest. Our platform is compliant with GDPR, HIPAA, and other major regulatory frameworks. We never share your data with third parties, and you maintain complete ownership of your information at all times.'
  },
  {
    id: 3,
    question: 'How long does it take to implement Botifyx?',
    answer: 'Most customers are up and running within 1-2 weeks. Our onboarding team will guide you through the setup process, including data integration, user training, and initial configuration. For more complex enterprise deployments, we offer custom implementation plans tailored to your specific needs.'
  },
  {
    id: 4,
    question: 'Can I customize the AI models for my specific industry?',
    answer: 'Yes, customization is available on our Professional and Enterprise plans. We can fine-tune our AI models using your historical data to improve accuracy for your specific use cases. Our team of data scientists will work with you to develop custom models that address your unique business challenges.'
  },
  {
    id: 5,
    question: 'What kind of support do you offer?',
    answer: 'We provide multiple tiers of support based on your plan. All customers receive access to our comprehensive documentation, knowledge base, and community forums. Professional and Enterprise customers get priority email and chat support, while Enterprise customers also receive dedicated account management and 24/7 phone support.'
  },
  {
    id: 6,
    question: 'Can I try Botifyx before committing to a subscription?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial. You can explore the platform, connect your data sources, and see the value Botifyx can bring to your business before making a decision.'
  }
];

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="faq" className="section bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-bg -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about Botifyx
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {openId === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openId === faq.id ? 'auto' : 0, opacity: openId === faq.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="#contact" className="btn btn-primary">
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;