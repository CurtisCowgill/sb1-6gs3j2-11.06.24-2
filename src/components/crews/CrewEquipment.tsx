import React from 'react';
import { 
  Truck, 
  Package,
  AlertCircle,
  Calendar,
  CheckCircle2 
} from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

interface CrewEquipmentProps {
  crew: {
    id: string;
    name: string;
    equipment?: Equipment[];
  };
}

const mockEquipment: Equipment[] = [
  {
    id: 'EQ001',
    name: 'Concrete Mixer',
    type: 'Heavy Equipment',
    status: 'Available',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15'
  },
  {
    id: 'EQ002',
    name: 'Foundation Forms',
    type: 'Construction Equipment',
    status: 'In Use',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-03-01'
  }
];

const CrewEquipment: React.FC<CrewEquipmentProps> = ({ crew }) => {
  const equipment = crew.equipment || mockEquipment;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Equipment</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Equipment
        </button>
      </div>
      <div className="space-y-4">
        {equipment.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.status === 'Available' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  Last Maintenance: {item.lastMaintenance}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">
                  Next Due: {item.nextMaintenance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewEquipment;