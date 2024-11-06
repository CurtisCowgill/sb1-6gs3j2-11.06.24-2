import React, { useState, useEffect } from 'react';
import LeftNav from './LeftNav';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !isNavOpen) {
        setIsNavOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-page))]">
      <LeftNav 
        isOpen={isNavOpen} 
        onToggle={() => setIsNavOpen(!isNavOpen)}
        isMobile={isMobile}
      />
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isNavOpen ? 'md:pl-64' : 'md:pl-16'
        }`}
      >
        <Navbar onMenuClick={() => setIsNavOpen(!isNavOpen)} />
        <main className="p-8">
          <div className="max-w-[1920px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;