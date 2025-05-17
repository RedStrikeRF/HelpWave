import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { EventInfo } from './types';
import { MOCKEVENT } from '../lib';

export const useBehavior = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventInfo>(MOCKEVENT);


  useEffect(() => {
    if (!id) return;

    // const fetchEvent = async () => {
    //   try {
    //     // const cached = sessionStorage.getItem(`event_${id}`);
    //     // if (cached) {
    //     //   setEvent(JSON.parse(cached));
    //     //   return;
    //     // }

    //     // const response = await axios.get(`/event/${id}`);
    //     // setEvent(response.data);
    //     // sessionStorage.setItem(`event_${id}`, JSON.stringify(response.data));
    //   } catch (err) {
    //     console.error('Ошибка загрузки события:', err);
    //   }
    // };

    // fetchEvent();
  }, [id]);

  const redirect = () => {
    navigate('/event/success', {
    state: { from: location.pathname },
  });
  }

  return {
    event,
    redirect
  };
};
