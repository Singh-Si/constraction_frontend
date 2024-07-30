import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "@/styles/style.scss";
import "@/styles/style.css";
import RootLayout from '@/layouts/RootLayout';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import Loader from '@/layouts/loader/Loader';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import { ToastContainer, Slide } from 'react-toastify';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { token } = parseCookies();

    if (!token && router.asPath !== '/user/login' && router.asPath !== '/user/verify-otp') {
      router.push('/user/login');
    }
  }, [router.asPath]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <BreadcrumbProvider>
      <RootLayout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Solis Reality</title>
        </Head>
        <ToastContainer 
        theme="colored"
         transition={Slide} autoClose={1500} hideProgressBar/>
        {loading ? <Loader /> : <Component {...pageProps} />} {/* Display the loader when loading is true */}
      </RootLayout>
    </BreadcrumbProvider>
  );
}

export default App;