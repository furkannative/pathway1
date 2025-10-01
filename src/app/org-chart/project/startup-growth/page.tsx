'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  RocketLaunchIcon,
  LightBulbIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Template data
const templateData = {
  id: 'startup-growth',
  name: 'Startup Growth Template',
  description: 'Perfect for rapidly scaling startups with flat hierarchies and cross-functional teams',
  createdAt: 'April 15, 2025',
  lastUpdated: 'April 20, 2025',
  teamStructure: {
    leadership: [
      { role: 'CEO/Founder', description: 'Visionary leader who sets company direction' },
      { role: 'CTO/Technical Co-Founder', description: 'Oversees all technical aspects and engineering' },
      { role: 'COO', description: 'Manages day-to-day operations and execution' },
    ],
    coreTeams: [
      { 
        name: 'Product', 
        roles: ['Product Manager', 'UX Designer', 'UI Designer', 'Product Marketing'],
        description: 'Cross-functional team focused on product development and market fit'
      },
      { 
        name: 'Engineering', 
        roles: ['Full-Stack Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer'],
        description: 'Agile development team with full-stack capabilities'
      },
      { 
        name: 'Growth', 
        roles: ['Growth Hacker', 'Digital Marketing Specialist', 'Content Creator', 'SEO Specialist'],
        description: 'Focused on user acquisition, activation, and retention'
      },
      { 
        name: 'Operations', 
        roles: ['Operations Manager', 'Customer Success', 'Finance Specialist', 'HR Generalist'],
        description: 'Handles business operations and customer support'
      }
    ],
    scalingPhases: [
      {
        phase: 'Pre-Seed (1-10 employees)',
        focus: 'MVP development and initial traction',
        structure: 'Flat, with founders handling multiple roles'
      },
      {
        phase: 'Seed (10-25 employees)',
        focus: 'Product-market fit and early growth',
        structure: 'Small functional teams begin to form'
      },
      {
        phase: 'Series A (25-75 employees)',
        focus: 'Scaling core functions and establishing processes',
        structure: 'Defined teams with dedicated leads'
      },
      {
        phase: 'Series B+ (75+ employees)',
        focus: 'Rapid scaling and market expansion',
        structure: 'Department structure with specialized roles'
      }
    ]
  },
  growthMetrics: {
    headcountProjections: [
      { stage: 'Pre-Seed', total: 8, product: 2, engineering: 4, growth: 1, operations: 1 },
      { stage: 'Seed', total: 20, product: 4, engineering: 10, growth: 3, operations: 3 },
      { stage: 'Series A', total: 50, product: 10, engineering: 25, growth: 8, operations: 7 },
      { stage: 'Series B', total: 120, product: 24, engineering: 60, growth: 20, operations: 16 }
    ],
    keyRatios: [
      { name: 'Eng to Non-Eng Ratio', value: '2:1', description: 'Engineering-heavy focus in early stages' },
      { name: 'Revenue per Employee', value: '$200K-$250K', description: 'Target efficiency metric for SaaS startups' },
      { name: 'Burn Rate per Employee', value: '$8K-$12K/month', description: 'Monthly cash burn including salary and overhead' }
    ]
  },
  bestPractices: [
    {
      title: 'Flat Hierarchy',
      description: 'Maintain minimal management layers to enable rapid decision-making and agility',
      icon: 'UserGroupIcon'
    },
    {
      title: 'Cross-Functional Squads',
      description: 'Organize around product features or customer journeys rather than strict functional departments',
      icon: 'RocketLaunchIcon'
    },
    {
      title: 'Flexible Roles',
      description: 'Encourage team members to wear multiple hats, especially in early stages',
      icon: 'LightBulbIcon'
    },
    {
      title: 'Transparent Communication',
      description: 'Implement open communication channels and regular all-hands meetings',
      icon: 'ChartBarIcon'
    },
    {
      title: 'Milestone-Based Planning',
      description: 'Structure growth around funding milestones and key business objectives',
      icon: 'CurrencyDollarIcon'
    },
    {
      title: 'Growth Mindset',
      description: 'Cultivate a culture of continuous learning and rapid iteration',
      icon: 'ArrowTrendingUpIcon'
    }
  ]
};

// Icons mapping
const iconMapping = {
  UserGroupIcon: <UserGroupIcon className="w-5 h-5" />,
  RocketLaunchIcon: <RocketLaunchIcon className="w-5 h-5" />,
  LightBulbIcon: <LightBulbIcon className="w-5 h-5" />,
  ChartBarIcon: <ChartBarIcon className="w-5 h-5" />,
  CurrencyDollarIcon: <CurrencyDollarIcon className="w-5 h-5" />,
  ArrowTrendingUpIcon: <ArrowTrendingUpIcon className="w-5 h-5" />
};

export default function StartupGrowthTemplate() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [scalingPhase, setScalingPhase] = useState('Seed');
  
  // Get headcount data for selected phase
  const headcountData = templateData.growthMetrics.headcountProjections.find(
    item => item.stage === scalingPhase
  ) || templateData.growthMetrics.headcountProjections[1]; // Default to Seed
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{templateData.name}</h1>
            <p className="mt-1 text-gray-500">{templateData.description}</p>
          </div>
          <Link
            href="/org-chart"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Templates
          </Link>
        </div>
        
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                This template provides a framework for organizing rapidly growing startups. Customize it to match your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Tab.Group onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Structure Overview
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Scaling Phases
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Growth Metrics
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-700'
              )
            }
          >
            Best Practices
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="mt-6">
          {/* Structure Overview Panel */}
          <Tab.Panel>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Leadership Structure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templateData.teamStructure.leadership.map((leader, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-medium text-gray-900">{leader.role}</h3>
                        <p className="mt-1 text-sm text-gray-500">{leader.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Teams</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templateData.teamStructure.coreTeams.map((team, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-medium text-gray-900">{team.name} Team</h3>
                        <p className="mt-1 text-sm text-gray-500">{team.description}</p>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700">Key Roles:</h4>
                          <ul className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1">
                            {team.roles.map((role, roleIndex) => (
                              <li key={roleIndex} className="text-sm text-gray-600">• {role}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-800">Startup Growth Structure Principles</h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li>• Flat hierarchy with minimal management layers</li>
                    <li>• Cross-functional teams organized around product features</li>
                    <li>• Flexible roles with team members wearing multiple hats</li>
                    <li>• Emphasis on autonomy and rapid decision-making</li>
                    <li>• Clear communication channels across the organization</li>
                  </ul>
                </div>
              </div>
            </div>
          </Tab.Panel>
          
          {/* Scaling Phases Panel */}
          <Tab.Panel>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Organizational Evolution</h2>
                  <p className="text-sm text-gray-600">
                    Startups evolve through distinct phases as they grow. Each phase requires different organizational structures and focus areas.
                    Use this guide to understand how your team structure should evolve as you scale.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {templateData.teamStructure.scalingPhases.map((phase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">{phase.phase}</h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Primary Focus:</h4>
                            <p className="mt-1 text-sm text-gray-600">{phase.focus}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Team Structure:</h4>
                            <p className="mt-1 text-sm text-gray-600">{phase.structure}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-700">Key Organizational Challenges:</h4>
                          <ul className="mt-1 text-sm text-gray-600 space-y-1">
                            {index === 0 && (
                              <>
                                <li>• Finding product-market fit with limited resources</li>
                                <li>• Balancing multiple responsibilities per team member</li>
                                <li>• Establishing initial processes and communication</li>
                              </>
                            )}
                            {index === 1 && (
                              <>
                                <li>• Transitioning from founder-led to team-based execution</li>
                                <li>• Defining initial team structures and responsibilities</li>
                                <li>• Creating scalable processes while maintaining agility</li>
                              </>
                            )}
                            {index === 2 && (
                              <>
                                <li>• Hiring team leads and establishing middle management</li>
                                <li>• Scaling culture beyond the founding team</li>
                                <li>• Implementing more formal processes and documentation</li>
                              </>
                            )}
                            {index === 3 && (
                              <>
                                <li>• Managing departmental coordination and alignment</li>
                                <li>• Preventing silos and maintaining cross-functional collaboration</li>
                                <li>• Balancing process maturity with continued innovation</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Transition Planning</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Plan for organizational transitions before you reach critical inflection points. 
                          The most challenging periods for startups are often during these phase transitions 
                          when existing structures and processes no longer support the team's size and complexity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          
          {/* Growth Metrics Panel */}
          <Tab.Panel>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Headcount Projections</h2>
                  
                  <div className="mb-4">
                    <div className="flex space-x-2 mb-4">
                      {templateData.growthMetrics.headcountProjections.map((phase) => (
                        <button 
                          key={phase.stage}
                          onClick={() => setScalingPhase(phase.stage)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                            scalingPhase === phase.stage 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {phase.stage}
                        </button>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">{scalingPhase} Stage</h3>
                        <span className="text-sm font-medium text-gray-700">Total: {headcountData.total} employees</span>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Engineering</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 mr-2">{headcountData.engineering}</span>
                              <span className="text-xs text-gray-500">
                                ({Math.round((headcountData.engineering / headcountData.total) * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-600" 
                              style={{ width: `${(headcountData.engineering / headcountData.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Product</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 mr-2">{headcountData.product}</span>
                              <span className="text-xs text-gray-500">
                                ({Math.round((headcountData.product / headcountData.total) * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-purple-600" 
                              style={{ width: `${(headcountData.product / headcountData.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Growth</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 mr-2">{headcountData.growth}</span>
                              <span className="text-xs text-gray-500">
                                ({Math.round((headcountData.growth / headcountData.total) * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-600" 
                              style={{ width: `${(headcountData.growth / headcountData.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Operations</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900 mr-2">{headcountData.operations}</span>
                              <span className="text-xs text-gray-500">
                                ({Math.round((headcountData.operations / headcountData.total) * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-orange-600" 
                              style={{ width: `${(headcountData.operations / headcountData.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Ratios & Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templateData.growthMetrics.keyRatios.map((ratio, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-medium text-gray-900">{ratio.name}</h3>
                        <p className="mt-1 text-xl font-bold text-blue-600">{ratio.value}</p>
                        <p className="mt-1 text-sm text-gray-500">{ratio.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium text-green-800">Scaling Efficiency Tips</h3>
                  <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>• Maintain an engineering-heavy team in early growth stages</li>
                    <li>• Hire operations roles only when administrative burden impacts productivity</li>
                    <li>• Scale sales and marketing after product-market fit is established</li>
                    <li>• Monitor revenue per employee as a key efficiency metric</li>
                    <li>• Consider outsourcing non-core functions until scale justifies full-time hires</li>
                  </ul>
                </div>
              </div>
            </div>
          </Tab.Panel>
          
          {/* Best Practices Panel */}
          <Tab.Panel>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Organizational Best Practices</h2>
                  <p className="text-sm text-gray-600">
                    These best practices will help you build and scale an effective startup organization.
                    Adapt them to your specific context and growth stage.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templateData.bestPractices.map((practice, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                        <div className="mr-3 text-blue-600">
                          {iconMapping[practice.icon as keyof typeof iconMapping]}
                        </div>
                        <h3 className="font-medium text-gray-900">{practice.title}</h3>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">{practice.description}</p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-700">Implementation Tips:</h4>
                          <ul className="mt-1 text-sm text-gray-600 space-y-1">
                            {practice.title === 'Flat Hierarchy' && (
                              <>
                                <li>• Limit to 2-3 management layers until you reach 100+ employees</li>
                                <li>• Implement team leads rather than traditional managers</li>
                                <li>• Encourage direct communication across the organization</li>
                              </>
                            )}
                            {practice.title === 'Cross-Functional Squads' && (
                              <>
                                <li>• Form teams with complementary skills focused on specific goals</li>
                                <li>• Include engineering, product, design, and growth in each squad</li>
                                <li>• Rotate team members occasionally to share knowledge</li>
                              </>
                            )}
                            {practice.title === 'Flexible Roles' && (
                              <>
                                <li>• Create T-shaped roles with depth in one area and breadth in others</li>
                                <li>• Document primary and secondary responsibilities</li>
                                <li>• Encourage skill development beyond core competencies</li>
                              </>
                            )}
                            {practice.title === 'Transparent Communication' && (
                              <>
                                <li>• Hold regular all-hands meetings to share company updates</li>
                                <li>• Use shared documentation and open communication channels</li>
                                <li>• Make metrics and goals visible to the entire organization</li>
                              </>
                            )}
                            {practice.title === 'Milestone-Based Planning' && (
                              <>
                                <li>• Define clear organizational milestones tied to funding rounds</li>
                                <li>• Create hiring plans aligned with business objectives</li>
                                <li>• Revisit and adjust structure at key growth inflection points</li>
                              </>
                            )}
                            {practice.title === 'Growth Mindset' && (
                              <>
                                <li>• Encourage experimentation and learning from failures</li>
                                <li>• Implement regular retrospectives to improve processes</li>
                                <li>• Support continuous learning through training and development</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InformationCircleIcon className="h-5 w-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-purple-800">Customization Note</h3>
                      <div className="mt-2 text-sm text-purple-700">
                        <p>
                          Every startup is unique. These best practices provide a foundation, but should be 
                          adapted to your specific industry, product, and team culture. Regularly revisit 
                          your organizational structure as you scale to ensure it continues to support your 
                          business objectives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            Last updated: {templateData.lastUpdated}
          </div>
          <div>
            Template ID: {templateData.id}
          </div>
        </div>
      </div>
    </div>
  );
}
