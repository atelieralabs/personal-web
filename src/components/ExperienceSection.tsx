import React from 'react';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional journey and key achievements
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center mb-12">
              <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
              
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:ml-auto md:pl-8'} ml-12 md:ml-0`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {exp.period}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {exp.role}
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
                    {exp.company}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;