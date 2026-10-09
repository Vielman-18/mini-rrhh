// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { usePageNotFound } from '../hooks/usePageNotFound';

export default function NotFoundPage() {
  usePageNotFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <span className="text-6xl block mb-4">🔍</span>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Página no encontrada</h2>
        <p className="text-slate-500 mb-6 text-sm">
          La ruta a la que intentas acceder no existe o fue movida.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-brand-800 text-white rounded-lg text-sm hover:bg-brand-700 transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}