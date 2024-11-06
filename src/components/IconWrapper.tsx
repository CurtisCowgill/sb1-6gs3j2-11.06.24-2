import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  label?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  size = 20, 
  className = "", 
  label 
}) => {
  return (
    <span 
      role={label ? "img" : undefined}
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <Icon size={size} />
    </span>
  );
};

export default IconWrapper;