import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const useBehavior = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState('');

    const isOnHomePage = location.pathname === '/';

    const handleProfileClick = () => {
      if (isAuthenticated) {
        navigate('/profile');
      } else {
        navigate('/login');
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      // if (value.trim()) {
      //   navigate(`/events?query=${encodeURIComponent(value)}`);
      // }
    };

    return {
      isAuthenticated,
      handleProfileClick,
      search,
      handleSearchChange,
      isOnHomePage
    };
};