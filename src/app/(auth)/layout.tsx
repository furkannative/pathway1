'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center items-center p-12 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md relative z-10"
        >
          <div className="mb-8 flex flex-col items-center">
            {/* Animation will be inserted here by the onboarding page */}
            <div id="step-animation-container" className="flex justify-center mb-6"></div>
            
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Mappin
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Plan your organization's growth with data-driven insights. Visualize your team structure, project future growth, and make informed decisions.
            </motion.p>
          
            <motion.div 
              className="mt-8 flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="flex items-center">
                <div className="bg-green-400 h-2 w-2 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Team Planning</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-400 h-2 w-2 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Growth Projection</span>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-400 h-2 w-2 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Hiring Strategy</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
