import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

interface StageColumnProps {
  stageId: string;
  title: string;
  projects?: Project[];
}

const StageColumn: React.FC<StageColumnProps> = ({ 
  stageId, 
  title, 
  projects = [] 
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 font-medium text-sm bg-gray-50 border-b rounded-t-lg">
        {title} ({projects.length})
      </div>
      <Droppable
        droppableId={stageId}
        type="PROJECT"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-24rem)] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;