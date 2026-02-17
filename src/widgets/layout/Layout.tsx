import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const captureLayoutSnapshot = () => {
      const el = document.documentElement;
      const overflowX = el.scrollWidth - el.clientWidth;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/c190d3c4-f46f-419c-b704-aa80ab68f928', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runId: 'pre-fix',
          hypothesisId: 'A',
          location: 'src/widgets/layout/Layout.tsx:captureLayoutSnapshot',
          message: 'Route render snapshot (viewport + overflow)',
          data: {
            path: location.pathname,
            viewport: { w: window.innerWidth, h: window.innerHeight },
            doc: {
              clientWidth: el.clientWidth,
              scrollWidth: el.scrollWidth,
              overflowX,
            },
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    };

    captureLayoutSnapshot();
    window.addEventListener('resize', captureLayoutSnapshot);
    return () => window.removeEventListener('resize', captureLayoutSnapshot);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
