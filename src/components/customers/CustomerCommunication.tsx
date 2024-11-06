import React from 'react';
import { MessageSquare, Phone, Mail, Plus } from 'lucide-react';
import { formatDate } from '../../utils/format';

interface Communication {
  id: string;
  type: 'email' | 'phone' | 'meeting';
  date: string;
  subject: string;
  notes: string;
  contactPerson: string;
}

interface CustomerCommunicationProps {
  customerId: string;
}

const mockCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    date: '2024-03-10',
    subject: 'Project Update',
    notes: 'Discussed timeline for upcoming foundation work',
    contactPerson: 'John Doe'
  },
  {
    id: '2',
    type: 'phone',
    date: '2024-03-09',
    subject: 'Schedule Confirmation',
    notes: 'Confirmed start date for next week',
    contactPerson: 'Jane Smith'
  }
];

const CustomerCommunication: React.FC<CustomerCommunicationProps> = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Communication History</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Communication
        </button>
      </div>

      <div className="space-y-4">
        {mockCommunications.map((comm) => (
          <div
            key={comm.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getTypeIcon(comm.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{comm.subject}</h3>
                  <span className="text-sm text-gray-500">{formatDate(comm.date)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{comm.notes}</p>
                <p className="mt-2 text-sm text-gray-500">Contact: {comm.contactPerson}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCommunication;