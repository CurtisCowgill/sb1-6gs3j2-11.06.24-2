import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationGuardProps {
  when: boolean;
  message?: string;
}

const NavigationGuard: React.FC<NavigationGuardProps> = ({ 
  when, 
  message = 'You have unsaved changes. Are you sure you want to leave?' 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const unblock = navigate((nextLocation) => {
      if (when && !window.confirm(message)) {
        return false;
      }
      return true;
    });

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unblock();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message, navigate]);

  return null;
};