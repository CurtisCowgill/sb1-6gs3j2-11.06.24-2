import React from 'react';
import { Plus, Mail, Phone, Star, Building2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  projects: Array<{
    id: string;
    name: string;
  }>;
}

interface VendorContactsProps {
  contacts: Contact[];
  onAddContact?: () => void;
}

const VendorContacts: React.FC<VendorContactsProps> = ({ contacts, onAddContact }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Contacts</h2>
        <button
          onClick={onAddContact}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.role}</p>
              </div>
              {contact.isPrimary && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Primary Contact
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {contact.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {contact.phone}
              </div>
            </div>

            {contact.projects.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-500 mb-2">Assigned Projects</h4>
                <div className="space-y-1">
                  {contact.projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center text-xs text-gray-600"
                    >
                      <Building2 className="h-3 w-3 mr-1" />
                      {project.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorContacts;