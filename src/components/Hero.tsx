import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 radial-gradient -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 radial-gradient -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                <Sparkles className="h-4 w-4 mr-1" />
                Next Generation AI
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transform Your Business with{" "}
              <span className="gradient-text">Botifyx AI</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Botifyx helps businesses automate workflows, gain valuable
              insights, and boost productivity with our cutting-edge artificial
              intelligence solutions.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/chat" className="btn btn-primary">
                Try Botifyx Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#demo" className="btn btn-outline">
                Watch Demo
              </a>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">4.9/5</span> from
                  over 1,000+ reviews
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-6 w-6 text-primary-600" />
                      <span className="text-lg font-semibold">
                        Botifyx Assistant
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                      <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                      <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">U</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                        Can you show me my highest priority Jira tickets?
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <Brain className="h-4 w-4 text-primary-600" />
                        </div>
                      </div>
                      <div className="bg-primary-50 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                        <p>
                          I've found 3 high priority tickets assigned to you:
                        </p>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                          <li>
                            <span className="font-medium">PROJ-423:</span> API
                            integration failing in production
                          </li>
                          <li>
                            <span className="font-medium">PROJ-415:</span>{" "}
                            Update authentication workflow
                          </li>
                          <li>
                            <span className="font-medium">PROJ-408:</span> Fix
                            dashboard loading performance
                          </li>
                        </ul>
                        <p className="mt-2">
                          Would you like me to help you schedule these tasks or
                          provide more details?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">U</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 text-sm">
                        Tell me more about PROJ-423 and suggest a solution.
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                      <span className="px-2 text-xs text-gray-500">
                        Analyzing ticket data...
                      </span>
                      <div className="h-0.5 flex-1 bg-gray-200"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex">
                  <input
                    type="text"
                    className="flex-1 border-0 bg-white rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    placeholder="Ask Botifyx anything..."
                    disabled={true}
                  />
                  <button
                    className="ml-2 p-2 rounded-lg bg-primary-600 text-white"
                    style={{ cursor: "default" }}
                  >
                    <Zap className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -z-10 w-40 h-40 bg-secondary-400/20 rounded-full blur-2xl"
              animate={{
                x: [0, 20, 0],
                y: [0, 30, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              style={{ top: "10%", right: "5%" }}
            />

            <motion.div
              className="absolute -z-10 w-60 h-60 bg-primary-400/20 rounded-full blur-2xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
              style={{ bottom: "5%", left: "10%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
