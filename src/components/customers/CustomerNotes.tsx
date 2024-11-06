import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/format';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  category: string;
}

interface CustomerNotesProps {
  customerId: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    content: 'Prefers early morning concrete pours, before 9 AM',
    createdAt: '2024-03-10',
    createdBy: 'John Doe',
    category: 'Preferences'
  },
  {
    id: '2',
    content: 'Requires detailed progress photos for all stages',
    createdAt: '2024-03-09',
    createdBy: 'Jane Smith',
    category: 'Requirements'
  }
];

const CustomerNotes: React.FC<CustomerNotesProps> = () => {
  const [notes] = useState<Note[]>(mockNotes);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Notes</h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {note.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(note.createdAt)} by {note.createdBy}
                  </span>
                </div>
                <p className="mt-2 text-gray-900">{note.content}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotes;