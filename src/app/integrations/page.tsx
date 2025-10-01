'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PuzzlePieceIcon, 
  CubeIcon, 
  CpuChipIcon, 
  ArrowTopRightOnSquareIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Integration card types
type IntegrationType = 'native' | 'stack' | 'agent';

interface IntegrationCard {
  id: string;
  title: string;
  description: string;
  type: IntegrationType;
  icon: string;
  status: 'available' | 'coming-soon' | 'beta';
  popular?: boolean;
}

// Helper functions
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'beta':
      return 'bg-purple-100 text-purple-800';
    case 'coming-soon':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: IntegrationType) => {
  switch(type) {
    case 'native':
      return <PuzzlePieceIcon className="h-5 w-5 text-blue-500" />;
    case 'stack':
      return <CubeIcon className="h-5 w-5 text-orange-500" />;
    case 'agent':
      return <CpuChipIcon className="h-5 w-5 text-violet-500" />;
    default:
      return <PuzzlePieceIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<IntegrationType | 'all'>('all');
  
  // Sample integration data
  const integrations: IntegrationCard[] = [
    // Native Integrations
    {
      id: 'slack',
      title: 'Slack',
      description: 'Connect your org chart with Slack for real-time updates and notifications.',
      type: 'native',
      icon: '/icons/slack.svg',
      status: 'available',
      popular: true
    },
    {
      id: 'microsoft-teams',
      title: 'Microsoft Teams',
      description: 'Integrate with Teams for seamless collaboration and org visibility.',
      type: 'native',
      icon: '/icons/teams.svg',
      status: 'available'
    },
    {
      id: 'google-workspace',
      title: 'Google Workspace',
      description: 'Sync with Google Workspace to keep your org chart up-to-date.',
      type: 'native',
      icon: '/icons/google.svg',
      status: 'available'
    },
    {
      id: 'zoom',
      title: 'Zoom',
      description: 'Connect with Zoom to manage meetings and team communications.',
      type: 'native',
      icon: '/icons/zoom.svg',
      status: 'coming-soon'
    },
    
    // Stack Management - SaaS Spend Management Tools
    {
      id: 'vendr',
      title: 'Vendr',
      description: 'Streamline SaaS procurement and optimize spending across your organization.',
      type: 'stack',
      icon: '/icons/vendr.svg',
      status: 'available',
      popular: true
    },
    {
      id: 'sastriy',
      title: 'Sastriy',
      description: 'Comprehensive SaaS management platform for visibility and cost optimization.',
      type: 'stack',
      icon: '/icons/sastriy.svg',
      status: 'available'
    },
    {
      id: 'torii',
      title: 'Torii',
      description: 'Automated SaaS management to discover, optimize and control your applications.',
      type: 'stack',
      icon: '/icons/torii.svg',
      status: 'available'
    },
    {
      id: 'productiv',
      title: 'Productiv',
      description: 'SaaS intelligence platform for application engagement and spend management.',
      type: 'stack',
      icon: '/icons/productiv.svg',
      status: 'beta'
    },
    {
      id: 'stack',
      title: 'Stack',
      description: 'All-in-one platform for managing SaaS tools, subscriptions and spending.',
      type: 'stack',
      icon: '/icons/stack.svg',
      status: 'coming-soon'
    },
    
    // Agent Marketplace
    {
      id: 'copilot-hr',
      title: 'HR Copilot',
      description: 'AI assistant for HR planning and organizational design.',
      type: 'agent',
      icon: '/icons/hr-copilot.svg',
      status: 'available',
      popular: true
    },
    {
      id: 'growth-predictor',
      title: 'Growth Predictor',
      description: 'AI system that forecasts team growth needs based on business metrics.',
      type: 'agent',
      icon: '/icons/growth.svg',
      status: 'beta'
    },
    {
      id: 'skill-mapper',
      title: 'Skill Mapper',
      description: 'AI agent that maps skills across your organization and identifies gaps.',
      type: 'agent',
      icon: '/icons/skills.svg',
      status: 'available'
    },
    {
      id: 'succession-planner',
      title: 'Succession Planner',
      description: 'AI system for planning leadership succession and identifying high potentials.',
      type: 'agent',
      icon: '/icons/succession.svg',
      status: 'coming-soon'
    }
  ];
  
  // Filter integrations based on active tab
  const filteredIntegrations = activeTab === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.type === activeTab);
  
  // Group integrations by type for the card sections
  const nativeIntegrations = integrations.filter(i => i.type === 'native');
  const stackIntegrations = integrations.filter(i => i.type === 'stack');
  const agentIntegrations = integrations.filter(i => i.type === 'agent');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-white border-b">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Integration Marketplace</h1>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Beta</span>
            </div>
            <p className="text-gray-500">Connect your organization with external systems, tools, and AI agents</p>
          </div>
          
          {/* Filter tabs */}
          <div className="flex items-center space-x-1">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  activeTab === 'all'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('native')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1 ${
                  activeTab === 'native'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <PuzzlePieceIcon className="h-4 w-4" />
                Native
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1 ${
                  activeTab === 'stack'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <CubeIcon className="h-4 w-4" />
                SaaS Spend
              </button>
              <button
                onClick={() => setActiveTab('agent')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1 ${
                  activeTab === 'agent'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <CpuChipIcon className="h-4 w-4" />
                Agents
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Integration Cards */}
      <div className="flex-grow p-4 overflow-auto">
        {activeTab === 'all' ? (
          <div className="space-y-8">
            {/* Native Integrations Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <PuzzlePieceIcon className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">Native Integrations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nativeIntegrations.map(integration => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </section>
            
            {/* SaaS Spend Management Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <CubeIcon className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">SaaS Spend Management</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stackIntegrations.map(integration => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </section>
            
            {/* Agent Marketplace Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <CpuChipIcon className="h-5 w-5 text-violet-500" />
                <h2 className="text-xl font-semibold text-gray-900">Agent Marketplace</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentIntegrations.map(integration => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Integration Card Component
function IntegrationCard({ integration }: { integration: IntegrationCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
              {/* Placeholder for actual icon */}
              {getTypeIcon(integration.type)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{integration.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(integration.status)}`}>
                  {integration.status === 'coming-soon' ? 'Coming Soon' : 
                   integration.status === 'beta' ? 'Beta' : 'Available'}
                </span>
                {integration.popular && (
                  <span className="flex items-center text-xs text-amber-600">
                    <StarIcon className="h-3 w-3 mr-0.5" />
                    Popular
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-500">
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
        
        <div className="mt-auto">
          <button 
            className={`w-full py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2
              ${integration.status === 'available' 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
            disabled={integration.status !== 'available'}
          >
            {integration.status === 'available' ? (
              <>
                <CheckCircleIcon className="h-4 w-4" />
                Connect
              </>
            ) : (
              integration.status === 'beta' ? 'Join Beta' : 'Notify Me'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
