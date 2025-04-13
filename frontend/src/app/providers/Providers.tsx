import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'; // если нужно будет
// import { store } from './store';
import { ProvidersProps } from './types';

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
    // </Provider>
  );
};
