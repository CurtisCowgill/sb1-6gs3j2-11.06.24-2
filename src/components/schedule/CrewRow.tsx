import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { Crew } from '../../types';

interface CrewRowProps {
  crew: Crew;
  dayCount: number;
}

const CrewRow: React.FC<CrewRowProps> = ({ crew, dayCount = 7 }) => {
  return (
    <div className="grid grid-cols-[200px_1fr]">
      <div className="p-4 border-r border-b border-gray-200">
        <div className="font-medium">{crew.name}</div>
        <div className="text-sm text-gray-500">{crew.lead}</div>
      </div>
      <Droppable droppableId={`calendar-${crew.id}`} direction="horizontal" type="PROJECT">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`grid grid-cols-7 border-b border-gray-200 ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {Array.from({ length: dayCount }).map((_, i) => (
              <div
                key={i}
                className="p-2 border-r border-gray-200 min-h-[100px]"
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CrewRow;