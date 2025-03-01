import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  LineChart, 
  Zap, 
  Shield, 
  Users, 
  Code
} from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 1,
    title: 'Advanced AI Processing',
    description: 'Our state-of-the-art AI models process and analyze complex data with unprecedented accuracy and speed.',
    icon: Brain
  },
  {
    id: 2,
    title: 'Intelligent Analytics',
    description: 'Transform raw data into actionable insights with our powerful analytics capabilities.',
    icon: LineChart
  },
  {
    id: 3,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your business processes to boost productivity.',
    icon: Zap
  },
  {
    id: 4,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and security protocols keep your data safe and compliant.',
    icon: Shield
  },
  {
    id: 5,
    title: 'Collaborative Platform',
    description: 'Enable seamless collaboration across teams with our intuitive sharing features.',
    icon: Users
  },
  {
    id: 6,
    title: 'Easy Integration',
    description: 'Connect with your existing tools through our extensive API and pre-built integrations.',
    icon: Code
  }
];

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="features" className="section bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover how Botifyx can transform your business with these innovative capabilities
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="card card-hover bg-white"
              variants={itemVariants}
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;