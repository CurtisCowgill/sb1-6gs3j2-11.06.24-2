import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { format, addDays, startOfWeek } from 'date-fns';

interface CrewCalendarProps {
  crews: Array<{
    id: string;
    name: string;
  }>;
}

const CrewCalendar: React.FC<CrewCalendarProps> = ({ crews }) => {
  const startDate = startOfWeek(new Date());
  const days = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="p-4">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[200px_1fr] h-full">
            <div className="bg-gray-50 border-r">
              <div className="h-10 border-b" />
              {crews.map(crew => (
                <div
                  key={crew.id}
                  className="h-16 px-4 flex items-center border-b"
                >
                  <span className="text-sm font-medium truncate">
                    {crew.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-auto">
              <div className="grid grid-cols-5 border-b">
                {days.map(day => (
                  <div
                    key={day.toString()}
                    className="h-10 px-2 flex flex-col justify-center border-r text-center"
                  >
                    <div className="text-xs font-medium">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(day, 'MMM d')}
                    </div>
                  </div>
                ))}
              </div>

              {crews.map(crew => (
                <div
                  key={crew.id}
                  className="grid grid-cols-5"
                >
                  {days.map(day => (
                    <Droppable
                      key={`${day.toString()}-${crew.id}`}
                      droppableId={`calendar-${format(day, 'yyyy-MM-dd')}-${crew.id}`}
                      type="PROJECT"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`h-16 border-r border-b p-1 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-blue-50' : ''
                          }`}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewCalendar;