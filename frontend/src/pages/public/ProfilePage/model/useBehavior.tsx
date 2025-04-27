import { useState, useEffect } from 'react';

interface ProfileData {
    // Общие поля
    email: string;
    phone: string;
    notificationsEnabled: boolean;

    // Поля волонтера
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: string;
    skills?: string;
    interests?: string;
    points?: number;
    rating?: string;
    eventsCount?: number;
    hours?: number;
    certificates?: string[];

    // Поля организатора
    organizationName?: string;
    inn?: string;
    region?: string;
    organizationInfo?: string;
}

interface FormData {
    // Общие поля
    email: string;
    phone: string;
    password: string;

    // Поля волонтера
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    skills: string;
    interests: string;

    // Поля организатора
    organizationName: string;
    inn: string;
    region: string;
    organizationInfo: string;
}

export const useBehavior = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        // Общие
        email: '',
        phone: '',
        password: '',

        // Волонтер
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        skills: '',
        interests: '',

        // Организатор
        organizationName: '',
        inn: '',
        region: '',
        organizationInfo: ''
    });

    const userType = profileData?.organizationName ? 'organizer' : 'volunteer';

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Здесь должен быть запрос к API для получения данных профиля
                // const response = await api.get('/profile');
                // const data = response.data;

                // Временные моковые данные
                const mockData: ProfileData = userType === 'organizer'
                    ? {
                        organizationName: 'Благотворительный фонд "Помощь"',
                        inn: '1234567890',
                        region: 'Москва',
                        email: 'org@example.com',
                        phone: '+79998887766',
                        organizationInfo: 'Помогаем детям и пожилым людям',
                        notificationsEnabled: true
                    }
                    : {
                        lastName: 'Иванов',
                        firstName: 'Иван',
                        middleName: 'Иванович',
                        birthDate: '1990-01-01',
                        email: 'ivanov@example.com',
                        phone: '+79991234567',
                        skills: 'Первая помощь, организация мероприятий',
                        interests: 'Экология, помощь животным',
                        points: 20,
                        rating: '9,9',
                        eventsCount: 6,
                        hours: 32,
                        certificates: ['cert1.pdf', 'cert2.pdf', 'cert3.pdf'],
                        notificationsEnabled: true
                    };

                setProfileData(mockData);
                resetFormData(mockData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [userType]);

    const resetFormData = (data: ProfileData) => {
        setFormData({
            // Общие
            email: data.email || '',
            phone: data.phone || '',
            password: '',

            // Волонтер
            lastName: data.lastName || '',
            firstName: data.firstName || '',
            middleName: data.middleName || '',
            birthDate: data.birthDate || '',
            skills: data.skills || '',
            interests: data.interests || '',

            // Организатор
            organizationName: data.organizationName || '',
            inn: data.inn || '',
            region: data.region || '',
            organizationInfo: data.organizationInfo || ''
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (section: string) => {
        setIsEditing(true);
    };

    const handleToggleNotifications = () => {
        if (profileData) {
            const updatedData = {
                ...profileData,
                notificationsEnabled: !profileData.notificationsEnabled
            };
            setProfileData(updatedData);
            // Здесь должен быть запрос к API для обновления настроек уведомлений
        }
    };

    const updateProfile = async (data: Partial<FormData>) => {
        try {
            // Здесь должен быть запрос к API для обновления данных профиля
            // await api.put('/profile', data);

            const updatedData = {
                ...profileData!,
                ...data,
                // Сохраняем статистику для волонтеров
                ...(userType === 'volunteer' ? {
                    points: profileData?.points || 0,
                    rating: profileData?.rating || '0',
                    eventsCount: profileData?.eventsCount || 0,
                    hours: profileData?.hours || 0,
                    certificates: profileData?.certificates || []
                } : {})
            };

            setProfileData(updatedData);
            return Promise.resolve();
        } catch (error) {
            console.error('Error updating profile:', error);
            return Promise.reject(error);
        }
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (profileData) {
            resetFormData(profileData);
        }
    };

    return {
        profileData,
        isEditing,
        formData,
        handleChange,
        handleEditClick,
        handleSave,
        handleCancel,
        handleToggleNotifications,
        updateProfile,
        userType
    };
};