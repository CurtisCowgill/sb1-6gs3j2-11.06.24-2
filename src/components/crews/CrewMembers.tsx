import React from 'react';
import { Plus, UserCircle, Award } from 'lucide-react';
import { Crew } from '../../types';

interface CrewMembersProps {
  crew: Crew;
}

const CrewMembers: React.FC<CrewMembersProps> = ({ crew }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {crew.members.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <UserCircle className="h-12 w-12 text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Award className="h-4 w-4 mr-1" />
                  Experience: {member.experience}
                </div>
                <div className="mt-2">
                  {member.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewMembers;