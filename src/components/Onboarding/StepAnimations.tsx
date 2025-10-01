'use client';

import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

// Company Size Animation (Step 1)
export const CompanySizeAnimation = () => {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <BuildingOfficeIcon className="h-20 w-20 text-indigo-600" />
      </motion.div>
      
      {/* Small, medium, large building representations */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-5 left-5 bg-indigo-100 rounded-lg h-8 w-6"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-2 left-14 bg-indigo-200 rounded-lg h-12 w-8"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-0 right-10 bg-indigo-300 rounded-lg h-16 w-10"
      />
      
      {/* People icons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center"
      >
        <UserGroupIcon className="h-12 w-12 text-indigo-500" />
      </motion.div>
    </div>
  );
};

// Industry Animation (Step 2)
export const IndustryAnimation = () => {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
          <motion.path
            d="M50 10C27.91 10 10 27.91 10 50C10 72.09 27.91 90 50 90C72.09 90 90 72.09 90 50C90 27.91 72.09 10 50 10Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 20C33.43 20 20 33.43 20 50C20 66.57 33.43 80 50 80C66.57 80 80 66.57 80 50C80 33.43 66.57 20 50 20Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      </motion.div>
      
      {/* Industry icons */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-2 left-2 bg-blue-100 rounded-lg p-1"
      >
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-2 right-2 bg-purple-100 rounded-lg p-1"
      >
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute bottom-2 left-2 bg-green-100 rounded-lg p-1"
      >
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-2 right-2 bg-red-100 rounded-lg p-1"
      >
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </motion.div>
    </div>
  );
};

// Growth Goal Animation (Step 3)
export const GrowthGoalAnimation = () => {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <ChartBarIcon className="h-20 w-20 text-indigo-600" />
      </motion.div>
      
      {/* Growth chart elements */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 15, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-5 left-5 bg-indigo-200 rounded-t-md w-6"
      />
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 25, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-5 left-14 bg-indigo-300 rounded-t-md w-6"
      />
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 40, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-5 left-23 bg-indigo-400 rounded-t-md w-6"
      />
      
      <motion.div
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute top-10 right-5"
      >
        <ArrowTrendingUpIcon className="h-12 w-12 text-green-500" />
      </motion.div>
    </div>
  );
};

// Challenges Animation (Step 4)
export const ChallengesAnimation = () => {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <UsersIcon className="h-20 w-20 text-indigo-600" />
      </motion.div>
      
      {/* Puzzle pieces representing challenges */}
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-0 left-0"
      >
        <PuzzlePieceIcon className="h-10 w-10 text-orange-400" />
      </motion.div>
      
      <motion.div
        initial={{ rotate: 20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-0 right-0"
      >
        <PuzzlePieceIcon className="h-10 w-10 text-blue-400" />
      </motion.div>
      
      <motion.div
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-0 left-0"
      >
        <PuzzlePieceIcon className="h-10 w-10 text-green-400" />
      </motion.div>
      
      <motion.div
        initial={{ rotate: 20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-0 right-0"
      >
        <PuzzlePieceIcon className="h-10 w-10 text-purple-400" />
      </motion.div>
    </div>
  );
};

// Features Interest Animation (Step 5)
export const FeaturesAnimation = () => {
  return (
    <div className="relative h-32 w-32 mx-auto">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <PresentationChartLineIcon className="h-20 w-20 text-indigo-600" />
      </motion.div>
      
      {/* Feature elements */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-2 left-1/2 transform -translate-x-1/2"
      >
        <DocumentChartBarIcon className="h-8 w-8 text-indigo-400" />
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <RocketLaunchIcon className="h-10 w-10 text-indigo-500" />
      </motion.div>
      
      {/* Orbit effect */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transformOrigin: 'center center' }}
      >
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-blue-500"
          style={{ top: '10%', left: '50%', marginLeft: '-6px' }}
        />
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-green-500"
          style={{ top: '50%', right: '10%', marginTop: '-6px' }}
        />
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-purple-500"
          style={{ bottom: '10%', left: '50%', marginLeft: '-6px' }}
        />
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-yellow-500"
          style={{ top: '50%', left: '10%', marginTop: '-6px' }}
        />
      </motion.div>
    </div>
  );
};

// Get the animation component based on the step
export const getStepAnimation = (step: number) => {
  switch(step) {
    case 1: return <CompanySizeAnimation />;
    case 2: return <IndustryAnimation />;
    case 3: return <GrowthGoalAnimation />;
    case 4: return <ChallengesAnimation />;
    case 5: return <FeaturesAnimation />;
    default: return <CompanySizeAnimation />;
  }
};
