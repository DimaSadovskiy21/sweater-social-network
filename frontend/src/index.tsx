import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <App />
      <ToastContainer
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
        position="top-center"
        theme="colored"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
      />
    </QueryClientProvider>
  </BrowserRouter>,
);

