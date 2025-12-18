import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';
import type {Route} from './+types/root';
import './app.css';

import {Provider} from 'react-redux';
import {store} from '@app/store';

export const links: Route.LinksFunction = () => [
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
  },
  {
    rel: 'icon',
    href: '/Logo.png',
    type: 'image/x-icon',
  },
];
export const meta: Route.MetaFunction = () => {
  return [
    {title: 'SIMS PPOB - Deklan Malik Akbar'}, 
  ];
};

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  return (
    <main className="p-4">
      <h1>Error</h1>
      <pre>{String(error)}</pre>
    </main>
  );
}
