import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'doctors'; query?: string; specialty?: string }
  | { name: 'doctor'; id: number }
  | { name: 'booking'; doctorId: number; date?: string; time?: string }
  | { name: 'data-protection' };

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseHash(): Route {
  const hash = window.location.hash.slice(1) || '/';
  const [path, queryString] = hash.split('?');
  const segments = path.split('/').filter(Boolean);
  const params = new URLSearchParams(queryString || '');

  if (segments.length === 0) return { name: 'home' };
  if (segments[0] === 'doctors') {
    return {
      name: 'doctors',
      query: params.get('q') || undefined,
      specialty: params.get('spec') || undefined,
    };
  }
  if (segments[0] === 'doctor' && segments[1]) {
    const id = parseInt(segments[1], 10);
    if (!isNaN(id)) return { name: 'doctor', id };
  }
  if (segments[0] === 'booking' && segments[1]) {
    const doctorId = parseInt(segments[1], 10);
    if (!isNaN(doctorId)) {
      return {
        name: 'booking',
        doctorId,
        date: params.get('date') || undefined,
        time: params.get('time') || undefined,
      };
    }
  }
  if (segments[0] === 'data-protection') return { name: 'data-protection' };
  return { name: 'home' };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'doctors': {
      const params = new URLSearchParams();
      if (route.query) params.set('q', route.query);
      if (route.specialty) params.set('spec', route.specialty);
      const qs = params.toString();
      return qs ? `#/doctors?${qs}` : '#/doctors';
    }
    case 'doctor':
      return `#/doctor/${route.id}`;
    case 'booking': {
      const params = new URLSearchParams();
      if (route.date) params.set('date', route.date);
      if (route.time) params.set('time', route.time);
      const qs = params.toString();
      return qs ? `#/booking/${route.doctorId}?${qs}` : `#/booking/${route.doctorId}`;
    }
    case 'data-protection':
      return '#/data-protection';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const handler = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = useCallback((r: Route) => {
    const hash = routeToHash(r);
    if (window.location.hash === hash) {
      setRoute(r);
      window.scrollTo(0, 0);
    } else {
      window.location.hash = hash;
    }
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
