import { useEffect } from 'react';

export default function SelectDynamicNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/select-dynamic');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to select dynamic page...</p>;
}
