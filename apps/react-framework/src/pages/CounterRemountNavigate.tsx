import { useEffect } from 'react';

export default function CounterRemountNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/counter-remount');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to counter remount page...</p>;
}
