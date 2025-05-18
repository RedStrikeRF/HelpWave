import React from 'react';
import { categoryIcons } from '@shared/assets/category';
import { CategoryCardProps } from './types';

import './CategoryCard.scss';

export const CategoryCard: React.FC<CategoryCardProps> = ({ iconName, text, className }) => {
  const icon = categoryIcons.find(item => item.name === iconName);

  return (
    <div className={`category-card ${className}`}>
      {icon && ( <img className="category-card__img" src={icon.component} alt={iconName} /> )}
      <p className="category-card__text">{text}</p>
    </div>
  );
};