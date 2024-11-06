import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <Draggable draggableId={project.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`px-3 py-2 rounded-lg text-sm ${
            snapshot.isDragging 
              ? 'bg-blue-100 shadow-lg' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <div className="font-medium truncate">{project.name}</div>
          <div className="text-gray-500 truncate text-xs">{project.customer}</div>
        </div>
      )}
    </Draggable>
  );
};

export default ProjectCard;