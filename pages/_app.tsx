import type { AppProps } from 'next/app';
// Context
import { AuthProvider } from 'context/authContext';
// Styles
import 'antd/dist/reset.css';
import 'styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
