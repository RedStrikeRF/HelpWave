// Общие типы
export type User = {
  id: number;
  username: string;
  email: string;
  password?: string; // используется только при создании / обновлении
};

export type Organizer = {
  id: number;
  user: User;
  description: string;
  contact_information: string;
};

export type Volunteer = {
  id: number;
  user: User;
  bio: string;
  skills: string;
  availability: string;
};

// Встречи
export type Meeting = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string; // ISO-строка
  organizer: Organizer;
  // Добавь другие поля модели Meeting, если они есть
};

// Заявки волонтёров
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type VolunteerApplication = {
  id: number;
  volunteer: number;
  volunteer_username: string;
  meeting: number;
  meeting_title: string;
  organizer_name: string;
  status: ApplicationStatus;
  applied_at: string;     // ISO-строка
  processed_at: string | null;
  organizer_comment?: string;
};

// Для создания заявки
export type VolunteerApplicationCreate = {
  meeting: number;
  organizer_comment?: string;
};

// Для обновления заявки
export type VolunteerApplicationUpdate = {
  status: ApplicationStatus;
  organizer_comment?: string;
};

// Отзывы
export type Review = {
  id: number;
  volunteer: number;
  meeting: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

// PDF-документы
export type PDFDocument = {
  id: number;
  title: string;
  pdf_file: string; // URL или путь до файла
  created_at: string;
  updated_at: string;
  // organizer: number; // если нужно, добавь
};

// Типы токенов и профилей
export type VolunteerProfile = Volunteer;
export type OrganizerProfile = Organizer;

export type TokenResponse = {
  access: string;
  refresh: string;
  volunteer_profile?: VolunteerProfile;
  organizer_profile?: OrganizerProfile;
};
