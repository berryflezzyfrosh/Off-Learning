import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  className?: string;
  showText?: boolean;
  color?: 'primary' | 'green' | 'yellow' | 'red';
}

export default function ProgressBar({ 
  progress, 
  total, 
  className = '', 
  showText = true,
  color = 'primary'
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
  
  const colorClasses = {
    primary: 'bg-primary-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{progress} of {total} completed</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
}
