import { useEffect } from 'react';

export default function SelectRemountMultiselectNavigate() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.history.pushState({}, '', '/select-remount-multiselect');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return <p>Navigating to select remount multiselect page...</p>;
}
