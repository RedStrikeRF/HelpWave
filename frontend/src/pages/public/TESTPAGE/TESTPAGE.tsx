import { useEffect, useState } from 'react';
import {
  VolunteersAPI,
  AuthAPI,
  MeetingsAPI,
  ApplicationsAPI,
  Volunteer, Meeting, VolunteerApplication, TokenResponse
} from '@api/index';

export const TESTPAGE = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[] | null>(null);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [applications, setApplications] = useState<VolunteerApplication[] | null>(null);
  const [authData, setAuthData] = useState<TokenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAll = async () => {
      try {
        // VolunteersAPI.list
        const volRes = await VolunteersAPI.list();
        setVolunteers(volRes.data);

        // MeetingsAPI.list
        const meetRes = await MeetingsAPI.list();
        setMeetings(meetRes.data);

        // ApplicationsAPI.list
        const appRes = await ApplicationsAPI.list();
        setApplications(appRes.data);

        // AuthAPI.login (тестовый пользователь)
        const authRes = await AuthAPI.login({
          username: 'testuser',
          password: 'testpassword',
        });
        setAuthData(authRes.data);
      } catch (e: any) {
        console.error(e);
        setError(e.response?.data?.detail || 'Произошла ошибка при вызове API');
      }
    };

    testAll();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🔧 API TEST PAGE</h1>

      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}

      <section>
        <h2>👥 Volunteers</h2>
        <pre>{JSON.stringify(volunteers, null, 2)}</pre>
      </section>

      <section>
        <h2>📅 Meetings</h2>
        <pre>{JSON.stringify(meetings, null, 2)}</pre>
      </section>

      <section>
        <h2>📨 Applications</h2>
        <pre>{JSON.stringify(applications, null, 2)}</pre>
      </section>

      <section>
        <h2>🔐 Auth (Login)</h2>
        <pre>{JSON.stringify(authData, null, 2)}</pre>
      </section>
    </div>
  );
};
