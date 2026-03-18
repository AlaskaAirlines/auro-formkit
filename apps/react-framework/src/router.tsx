import { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextValue {
  path: string;
}

const RouterContext = createContext<RouterContextValue>({ path: '/' });

export function Router({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <RouterContext.Provider value={{ path }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Route({ path, component: Component }: { path: string; component: React.ComponentType }) {
  const { path: currentPath } = useContext(RouterContext);
  return currentPath === path ? <Component /> : null;
}

export function Link({ to, children, ...rest }: { to: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
