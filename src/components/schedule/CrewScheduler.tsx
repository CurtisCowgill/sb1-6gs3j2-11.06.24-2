import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Project } from '../../types';
import { format, addDays, startOfWeek } from 'date-fns';

interface CrewSchedulerProps {
  projects: Project[];
}

const crews = [
  { id: 'crew1', name: 'Foundation Team A' },
  { id: 'crew2', name: 'Foundation Team B' },
  { id: 'crew3', name: 'Wall Team' },
  { id: 'crew4', name: 'Waterproofing Team' },
  { id: 'crew5', name: 'Flatwork Team' }
];

const CrewScheduler: React.FC<CrewSchedulerProps> = ({ projects }) => {
  const startDate = startOfWeek(new Date());
  const days = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="p-4">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[200px_repeat(5,1fr)] gap-4">
            {/* Header */}
            <div className="font-medium text-gray-900">Crews</div>
            {days.map(day => (
              <div key={day.toString()} className="text-center">
                <div className="font-medium text-gray-900">
                  {format(day, 'EEE')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(day, 'MMM d')}
                </div>
              </div>
            ))}

            {/* Crew rows */}
            {crews.map(crew => (
              <React.Fragment key={crew.id}>
                <div className="py-2">
                  <span className="font-medium text-gray-900">{crew.name}</span>
                </div>
                {days.map(day => (
                  <Droppable
                    key={`${day.toString()}-${crew.id}`}
                    droppableId={`calendar-${format(day, 'yyyy-MM-dd')}-${crew.id}`}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`h-20 rounded-lg border-2 border-dashed ${
                          snapshot.isDraggingOver
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewScheduler;