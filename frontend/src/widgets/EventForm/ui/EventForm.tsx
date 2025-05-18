import { useState, useRef } from 'react';

import { DefaultButton } from '@shared/ui';

export const EventForm = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    address: '',
    category: '',
    description: '',
    photo: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="event-form__wrapper">
        <div className="event-form__top">
          <div onClick={() => imgInputRef.current?.click()}>
            <div>+</div>
            <div>{formData.photo ? formData.photo.name : 'Добавить фото'}</div>
            <input 
              type="file" 
              ref={imgInputRef}
              id="photo" 
              name="photo" 
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        

        <div className="event-form__bottom">
          <textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание..."
          />
        </div>
      </div>

      <DefaultButton className="event-form__submit-button" type="submit">Создать</DefaultButton>
    </form>
  );
}