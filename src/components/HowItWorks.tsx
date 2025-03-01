import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Cpu, 
  BarChart, 
  Lightbulb 
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      id: 1,
      title: 'Data Collection',
      description: 'Connect your data sources or upload your data directly to our secure platform.',
      icon: Search,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 2,
      title: 'AI Processing',
      description: 'Our advanced AI models analyze your data using state-of-the-art algorithms.',
      icon: Cpu,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 3,
      title: 'Insight Generation',
      description: 'The system generates actionable insights and visualizations from your data.',
      icon: BarChart,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 4,
      title: 'Intelligent Response',
      description: 'Receive personalized recommendations to optimize your business decisions.',
      icon: Lightbulb,
      color: 'bg-amber-100 text-amber-600',
    },
  ];

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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="how-it-works" className="section relative">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-bg -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How <span className="gradient-text">Botifyx</span> Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our streamlined process transforms your data into valuable insights in just four simple steps
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg w-full">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="mt-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  {step.id}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;