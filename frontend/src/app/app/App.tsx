import { Providers } from '@app/providers';
import { AppRoutes } from '@app/router/AppRoutes';
import './App.scss';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
