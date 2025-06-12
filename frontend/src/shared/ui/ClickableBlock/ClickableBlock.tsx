import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickableBlockProps } from './types';
import { GrayBackground } from '../GrayBackground';

import message_edit from '@shared/assets/message-edit.svg';


import './ClickableBlock.scss'

export const ClickableBlock: React.FC<ClickableBlockProps> = ({ 
  title, 
  to, 
  children, 
  showEdit = true,
}) => {
  const navigate = useNavigate();

  const handleBlockClick = () => {
    navigate(to);
  };

  return (
    <div className="clickable-block" onClick={handleBlockClick}>
        <h3 className="clickable-block__title">{title}</h3>
        <GrayBackground className="clickable-block__container">
          {showEdit && (
            <button 
              className="clickable-block__edit-button"
              onClick={handleBlockClick}
            >
              Редактировать <img src={message_edit} />
            </button>
          )}
          <div className="clickable-block__content">
            {children}
          </div>
        </GrayBackground>
    </div>
  );
};