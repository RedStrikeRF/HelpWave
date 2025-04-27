import { Button, Input } from '@shared/ui';
import { useBehavior } from '../model/useBehavior';
// import HeartIcon from '../assets/heart.svg';
// import OrganizationIcon from '../assets/organization-icon.svg';
import './ProfilePage.scss';

export const ProfilePage = () => {
    const {
        profileData,
        isEditing,
        formData,
        handleChange,
        handleEditClick,
        handleSave,
        handleToggleNotifications,
        userType
    } = useBehavior();

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                {/* <img
                    src={userType === 'organizer' ? OrganizationIcon : HeartIcon}
                    alt="Profile"
                    className="profile-icon"
                /> */}
                <h1>
                    {userType === 'organizer'
                        ? profileData.organizationName
                        : `${profileData.lastName} ${profileData.firstName} ${profileData.middleName}`
                    }
                </h1>
            </div>

            <div className="profile-content">
                {!isEditing ? (
                    <>
                        <div className="left-column">
                            <div className="info-block">
                                <h2>Информация</h2>
                                <div className='info-content'>
                                    <div className="block-header">
                                        <button className="edit-btn" onClick={() => handleEditClick('info')}>
                                            Редактировать ⬜️
                                        </button>
                                    </div>
                                    <div className="block-content">
                                        {userType === 'organizer' ? (
                                            <>
                                                <div className="disabled-input">
                                                    <label>Регион:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.region || 'Не указан'}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="disabled-input">
                                                    <label>Email:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.email}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="disabled-input">
                                                    <label>Телефон:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.phone || 'Не указан'}
                                                        disabled
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="disabled-input">
                                                    <label>Дата рождения:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.birthDate || 'Не указана'}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="disabled-input">
                                                    <label>Email:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.email}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="disabled-input">
                                                    <label>Телефон:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.phone || 'Не указан'}
                                                        disabled
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="info-block">
                                <h2>Доп. информация</h2>
                                <div className='info-content'>
                                    <div className="block-header">
                                        <button className="edit-btn" onClick={() => handleEditClick('additional')}>
                                            Редактировать ⬜️
                                        </button>
                                    </div>
                                    <div className="block-content">
                                        {userType === 'organizer' ? (
                                            <div className="disabled-input">
                                                <label>Информация об организации:</label>
                                                <Input
                                                    type="text"
                                                    value={profileData.organizationInfo || 'Не указана'}
                                                    disabled
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="disabled-input">
                                                    <label>Навыки:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.skills || 'Не указаны'}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="disabled-input">
                                                    <label>Интересы:</label>
                                                    <Input
                                                        type="text"
                                                        value={profileData.interests || 'Не указаны'}
                                                        disabled
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="stats-block">
                                {userType === 'volunteer' ? (
                                    <>
                                        <div className="stat-item">
                                            <span>Баллы за участие:</span>
                                            <strong>{profileData.points || 0}</strong>
                                        </div>
                                        <div className="stat-item">
                                            <span>Рейтинг:</span>
                                            <strong>{profileData.rating || '0'}/10</strong>
                                        </div>
                                        <div className="stat-item">
                                            <span>Количество мероприятий:</span>
                                            <strong>{profileData.eventsCount || 0}</strong>
                                        </div>
                                        <div className="stat-item">
                                            <span>Часы:</span>
                                            <strong>{profileData.hours || 0}</strong>
                                        </div>
                                    </>
                                ) : null}
                                <Button
                                    onClick={() => window.location.href = '/applications'}
                                    className="applications-btn"
                                >
                                    Активные заявки
                                </Button>
                                {userType === 'organizer' && (
                                    <Button
                                        onClick={() => window.location.href = '/events'}
                                        className="applications-btn"
                                    >
                                        Управление мероприятиями
                                    </Button>
                                )}
                            </div>

                            {userType === 'volunteer' && (
                                <div className="certificates-block">
                                    <h2>Сертификаты</h2>
                                    <div className='certificates-content'>
                                        {profileData.certificates?.length ? (
                                            profileData.certificates.map((cert, index) => (
                                                <div key={index} className="certificate-item">
                                                    <img src="/path-to-certificate-icon.svg" alt="Сертификат" className="certificate-icon" />
                                                    <div className="certificate-info">
                                                        <p>Сертификат {index + 1}</p>
                                                        <Button className="download-btn">Скачать ↓</Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Нет сертификатов</p>
                                        )}
                                    </div>
                                    <div className="notifications-switch">
                                        <label className="switch-label">
                                            <span className="switch-text">Уведомления</span>
                                            <input
                                                type="checkbox"
                                                className="switch-input"
                                                checked={profileData.notificationsEnabled || false}
                                                onChange={handleToggleNotifications}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className='edit'>
                        <div className="edit-mode">
                            <div className="edit-info-block">
                                <h2>Информация</h2>
                                <div className='edit-info-content'>
                                    {userType === 'organizer' ? (
                                        <>
                                            <Input
                                                value={formData.organizationName}
                                                onChange={handleChange}
                                                placeholder="Название организации*"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.inn}
                                                onChange={handleChange}
                                                placeholder="ИНН организации*"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.region}
                                                onChange={handleChange}
                                                placeholder="Регион*"
                                                className="profile-input"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Input
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Фамилия*"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Имя*"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.middleName}
                                                onChange={handleChange}
                                                placeholder="Отчество*"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                placeholder="Дата рождения*"
                                                type="date"
                                                className="profile-input"
                                            />
                                        </>
                                    )}
                                    <Input
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Адрес электронной почты*"
                                        type="email"
                                        className="profile-input"
                                    />
                                    <Input
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Пароль*"
                                        type="password"
                                        className="profile-input"
                                    />
                                    <Input
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Номер телефона"
                                        className="profile-input"
                                    />
                                </div>
                            </div>

                            <div className="edit-additional-block">
                                <h2>Доп. информация</h2>
                                <div className='edit-additional-content'>
                                    {userType === 'organizer' ? (
                                        <Input
                                            value={formData.organizationInfo}
                                            onChange={handleChange}
                                            placeholder="Информация об организации"
                                            className="profile-input"
                                        />
                                    ) : (
                                        <>
                                            <Input
                                                value={formData.skills}
                                                onChange={handleChange}
                                                placeholder="Навыки"
                                                className="profile-input"
                                            />
                                            <Input
                                                value={formData.interests}
                                                onChange={handleChange}
                                                placeholder="Интересы"
                                                className="profile-input"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="edit-actions">
                            <Button onClick={handleSave} className="save-btn">
                                Сохранить
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};