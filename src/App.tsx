import { useEffect, useState } from 'react';
import ErrorPage from './pages/ErrorPage';
import EditPage from './pages/EditPage';

function getRoute() {
  const pathname = window.location.pathname;
  if (pathname.includes('/edit')) return 'edit';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onNavigation = () => setRoute(getRoute());
    window.addEventListener('popstate', onNavigation);
    return () => window.removeEventListener('popstate', onNavigation);
  }, []);

  if (route === 'edit') return <EditPage />;
  return <ErrorPage />;
}
