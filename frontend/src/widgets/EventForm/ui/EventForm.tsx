import { useState, useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';

import { DefaultButton, Input, CategoryCard } from '@shared/ui';
import { CATEGORIES, Category } from '@shared/const/category';


import plus from "@shared/assets/plus.svg"

import './EventForm.scss';
import { categoryIcons } from '@shared/assets/category';

export const EventForm = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
    address: '',
    category: [] as string[],
    description: '',
    photo: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const getIconByName = (name: string) => {
    return categoryIcons.find(icon => icon.name === name)?.component;
  };
  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="event-form__wrapper">
        <div className="event-form__top">
          <div className="event-form__top__img" onClick={() => imgInputRef.current?.click()}>
            {previewUrl ? (
              <img src={previewUrl} alt="Превью" className="event-form__top__img" />
            ) : (
              <img src={plus} alt="Добавить изображение" className="event-form__top__img plus"/>
            )}
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
          <div className="event-form__top__inputs">
            <Input
              className="event-form__top__input full-width"
              placeholder="Введите название"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <div className="input-row full-width">
              <Input
                type="date"
                className="event-form__top__input half-width"
                placeholder="Дата начала"
                name="dateStart"
                value={formData.dateStart}
                onChange={handleChange}
              />
              <Input
                type="date"
                className="event-form__top__input half-width"
                placeholder="Дата окончания"
                name="dateEnd"
                value={formData.dateEnd}
                onChange={handleChange}
              />
            </div>

            <div className="input-row full-width">
              <Input
                type="time"
                className="event-form__top__input half-width"
                placeholder="Время начала"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
              />
              <Input
                type="time"
                className="event-form__top__input half-width"
                placeholder="Время окончания"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
              />
            </div>

            <div className="input-row full-width">
              <Input
                className="event-form__top__input half-width"
                placeholder="Введите адрес"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              {/* <Input
                className="event-form__top__input half-width"
                placeholder="Введите категорию"
                name="category"
                value={formData.category}
                onChange={handleChange}
              /> */}
            </div>
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