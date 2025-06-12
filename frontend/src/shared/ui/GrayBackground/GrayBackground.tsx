import React, { ReactNode } from 'react';
import './GrayBackground.scss';
import { GrayBackgroundProps } from './types';

export const GrayBackground: React.FC<GrayBackgroundProps> = ({ 
  children,
  className = ''
}) => {
  return (
    <div className={`gray-background ${className}`}>
      {children}
    </div>
  );
};