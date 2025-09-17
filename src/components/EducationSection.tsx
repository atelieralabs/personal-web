import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Education } from '../types';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Academic background and qualifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {edu.period}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {edu.school}
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {edu.major}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;