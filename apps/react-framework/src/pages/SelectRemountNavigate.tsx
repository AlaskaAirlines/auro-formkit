import { useEffect } from 'react';

export default function SelectRemountNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/select-remount');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to select remount page...</p>;
}
