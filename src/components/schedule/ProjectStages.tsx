import React from 'react';
import StageColumn from './StageColumn';
import type { DraggableLocation } from 'react-beautiful-dnd';
import type { Project } from '../../types';

interface ProjectStagesProps {
  projects: Project[];
  onDragEnd: (result: {
    draggableId: string;
    source: DraggableLocation;
    destination: DraggableLocation | null;
  }) => void;
}

const stages = [
  { id: 'stakeout', title: 'Stake Out' },
  { id: 'footings', title: 'Footings' },
  { id: 'walls', title: 'Walls' },
  { id: 'strip', title: 'Strip' },
  { id: 'waterproofing', title: 'Waterproofing' },
  { id: 'flatwork', title: 'Flatwork' }
];

const ProjectStages: React.FC<ProjectStagesProps> = ({ projects, onDragEnd }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-6 gap-4">
        {stages.map(stage => (
          <StageColumn
            key={stage.id}
            stageId={stage.id}
            title={stage.title}
            projects={projects.filter(p => p.stage === stage.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectStages;