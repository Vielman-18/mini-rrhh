// src/pages/EmployeeDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployees';

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  // Convertimos id a número, fallback a 0 si es inválido
  const employeeId = id ? parseInt(id, 10) : 0;

  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
        <span>Cargando detalle del empleado...</span>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="p-6 max-w-xl mx-auto my-8 bg-red-50 border border-red-200 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el empleado</h3>
        <p className="text-sm text-red-600 mb-4">
          {error instanceof Error ? error.message : 'No se pudo encontrar la información solicitada.'}
        </p>
        <Link
          to="/empleados"
          className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
        >
          Volver a Empleados
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        to="/empleados"
        className="inline-block mb-4 text-sm text-brand-800 hover:underline"
      >
        ← Volver a la lista
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-2xl">
            {employee.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>
            <p className="text-slate-500">{employee.position}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
          <div>
            <span className="text-slate-400 block">Correo electrónico</span>
            <span className="font-medium text-slate-700">{employee.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Departamento</span>
            <span className="font-medium text-slate-700">{employee.department}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Salario</span>
            <span className="font-medium text-slate-700">${employee.salary.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Estado</span>
            <span className="font-medium text-slate-700 capitalize">{employee.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}