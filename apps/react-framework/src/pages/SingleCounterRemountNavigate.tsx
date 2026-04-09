import { useEffect } from 'react';

export default function SingleCounterRemountNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/single-counter-remount');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to single counter remount page...</p>;
}
