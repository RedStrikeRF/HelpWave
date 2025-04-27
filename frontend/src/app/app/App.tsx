import { Providers } from '@app/providers';
import { AppRoutes } from '@app/router/AppRoutes';
import '@app/styles/index.css';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
