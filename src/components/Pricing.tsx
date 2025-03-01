import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: 'Starter',
    price: '$9',
    description: 'Perfect for small businesses and startups',
    features: [
      'AI-powered data analysis',
      'Basic reporting',
      'Up to 5 users',
      '10,000 API calls per month',
      'Email support',
    ],
    cta: 'Start Free Trial'
  },
  {
    id: 2,
    name: 'Professional',
    price: '$29',
    description: 'Ideal for growing companies',
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Custom dashboards',
      'Up to 20 users',
      '50,000 API calls per month',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs',
    features: [
      'Everything in Professional',
      'Unlimited users',
      'Unlimited API calls',
      'Custom AI model training',
      'Dedicated account manager',
      'SLA guarantees',
      'On-premise deployment option'
    ],
    cta: 'Contact Sales'
  }
];

const Pricing: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="pricing" className="section relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 radial-gradient -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 radial-gradient -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for your business
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 scale-105 md:scale-110 z-10' 
                  : 'bg-white hover:shadow-xl'
              }`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="bg-primary-500 text-white text-center py-2 font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-gray-50 rounded-xl p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
              <p className="text-gray-600">Contact our sales team for a personalized quote.</p>
            </div>
            <a href="#contact" className="mt-4 md:mt-0 btn btn-primary">
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;