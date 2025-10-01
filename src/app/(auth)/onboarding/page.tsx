'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  CheckCircleIcon,
  BuildingOfficeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { getStepAnimation } from '@/components/Onboarding/StepAnimations';
import { createRoot } from 'react-dom/client';

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1001+ employees',
];

const INDUSTRIES = [
  'FinTech',
  'Banking',
  'Investment Management',
  'Insurance',
  'Payments',
  'Blockchain & Crypto',
  'Lending',
  'Wealth Management',
  'Other Financial Services',
];

const GROWTH_GOALS = [
  'Expand our team rapidly',
  'Grow strategically in specific departments',
  'Plan for international expansion',
  'Restructure our organization',
  'Visualize current structure only',
];

const CHALLENGES = [
  'Hiring and recruitment',
  'Team structure planning',
  'Department coordination',
  'Succession planning',
  'Budget allocation',
  'Visualizing growth projections',
];

const FEATURES_INTEREST = [
  'Time-based projections',
  'Department-based organization',
  'Hiring status tracking',
  'Role-based visualization',
  'Export and sharing options',
  'Budget planning integration',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [growthGoal, setGrowthGoal] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [featuresInterest, setFeaturesInterest] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const totalSteps = 5;

  // Insert animation into layout container
  useEffect(() => {
    const container = document.getElementById('step-animation-container');
    if (container) {
      // Clear previous content
      container.innerHTML = '';
      
      // Create a new div for the animation
      const animationDiv = document.createElement('div');
      animationDiv.className = 'flex justify-center';
      
      // Render the animation into the div
      const animationElement = getStepAnimation(step);
      
      // Use ReactDOM to render the React component into the DOM element
      if (animationElement) {
        const root = createRoot(animationDiv);
        root.render(animationElement);
        container.appendChild(animationDiv);
      }
    }
  }, [step]);

  const handleNext = async () => {
    // Validate current step
    if (step === 1 && !companySize) {
      setError('Please select your company size');
      return;
    }
    
    if (step === 2 && !industry) {
      setError('Please select your industry');
      return;
    }
    
    if (step === 3 && !growthGoal) {
      setError('Please select your primary growth goal');
      return;
    }
    
    if (step === 4 && challenges.length === 0) {
      setError('Please select at least one challenge');
      return;
    }
    
    if (step === 5 && featuresInterest.length === 0) {
      setError('Please select at least one feature');
      return;
    }

    setError('');
    
    if (step === totalSteps) {
      // Final step - submit and redirect
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Skip API call and redirect directly to welcome page
        router.push('/');
      }, 1500);
      
      return;
    }

    // Move to next step
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const toggleChallenge = (challenge: string) => {
    if (challenges.includes(challenge)) {
      setChallenges(challenges.filter(c => c !== challenge));
    } else {
      setChallenges([...challenges, challenge]);
    }
  };

  const toggleFeature = (feature: string) => {
    if (featuresInterest.includes(feature)) {
      setFeaturesInterest(featuresInterest.filter(f => f !== feature));
    } else {
      setFeaturesInterest([...featuresInterest, feature]);
    }
  };

  const getStepIcon = (currentStep: number) => {
    switch(currentStep) {
      case 1: return <BuildingOfficeIcon className="h-6 w-6" />;
      case 2: return <CurrencyDollarIcon className="h-6 w-6" />;
      case 3: return <ChartBarIcon className="h-6 w-6" />;
      case 4: return <UsersIcon className="h-6 w-6" />;
      case 5: return <PresentationChartLineIcon className="h-6 w-6" />;
      default: return <BuildingOfficeIcon className="h-6 w-6" />;
    }
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'How big is your company?';
      case 2: return 'What industry are you in?';
      case 3: return 'What is your primary growth goal?';
      case 4: return 'What challenges are you facing?';
      case 5: return 'Which features interest you most?';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch(step) {
      case 1: return 'This helps us tailor the experience to your company size';
      case 2: return 'We\'ll customize your experience based on your industry';
      case 3: return 'Tell us about your organization\'s growth objectives';
      case 4: return 'Select all that apply to your current situation';
      case 5: return 'Select the features that would be most valuable to you';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step > index + 1 ? 'bg-indigo-100 text-indigo-600' : 
                  step === index + 1 ? 'bg-indigo-600 text-white' : 
                  'bg-gray-100 text-gray-400'
                }`}
              >
                {step > index + 1 ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`h-0.5 w-full ${
                    step > index + 1 ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                  style={{ width: '100%', minWidth: '3rem' }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {getStepTitle()}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {getStepDescription()}
        </p>
      </div>

      <motion.div 
        className="bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
            >
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Company Size */}
              {step === 1 && (
                <div className="space-y-3">
                  {COMPANY_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setCompanySize(size)}
                      className={`w-full text-left px-4 py-3 border rounded-lg hover:border-indigo-500 transition-colors ${
                        companySize === size ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Industry */}
              {step === 2 && (
                <div className="space-y-3">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`w-full text-left px-4 py-3 border rounded-lg hover:border-indigo-500 transition-colors ${
                        industry === ind ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Growth Goal */}
              {step === 3 && (
                <div className="space-y-3">
                  {GROWTH_GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setGrowthGoal(goal)}
                      className={`w-full text-left px-4 py-3 border rounded-lg hover:border-indigo-500 transition-colors ${
                        growthGoal === goal ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 4: Challenges */}
              {step === 4 && (
                <div className="space-y-3">
                  {CHALLENGES.map((challenge) => (
                    <button
                      key={challenge}
                      onClick={() => toggleChallenge(challenge)}
                      className={`w-full text-left px-4 py-3 border rounded-lg hover:border-indigo-500 transition-colors ${
                        challenges.includes(challenge) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 mr-3 rounded border flex items-center justify-center ${
                          challenges.includes(challenge) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                        }`}>
                          {challenges.includes(challenge) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {challenge}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 5: Features Interest */}
              {step === 5 && (
                <div className="space-y-3">
                  {FEATURES_INTEREST.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`w-full text-left px-4 py-3 border rounded-lg hover:border-indigo-500 transition-colors ${
                        featuresInterest.includes(feature) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 mr-3 rounded border flex items-center justify-center ${
                          featuresInterest.includes(feature) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                        }`}>
                          {featuresInterest.includes(feature) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {feature}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium ${
                step === 1 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={loading}
              className={`flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Setting up...
                </>
              ) : (
                <>
                  {step === totalSteps ? 'Finish' : 'Next'}
                  {step !== totalSteps && <ChevronRightIcon className="w-5 h-5 ml-1" />}
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Step {step} of {totalSteps} • Mappin will customize your experience based on these preferences
        </p>
      </div>
    </motion.div>
  );
}
