import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';

interface Tag {
  id: string;
  text: string;
}

interface ProjectTagsProps {
  tags: Tag[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (id: string) => void;
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
    setIsAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {tag.text}
          <button
            onClick={() => onRemoveTag(tag.id)}
            className="ml-1 text-blue-600 hover:text-blue-800"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="inline-block">
          <input
            ref={inputRef}
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onBlur={handleSubmit}
            className="w-24 px-2 py-1 text-xs rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add tag..."
          />
        </form>
      ) : (
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-300 hover:bg-gray-50"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Tag
        </button>
      )}
    </div>
  );
};

export default ProjectTags;