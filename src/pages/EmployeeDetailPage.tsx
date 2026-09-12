// src/pages/EmployeeDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployees';

const departmentLabels: Record<string, string> = {
  'Tecnología': 'Tecnología',
  'Recursos Humanos': 'Recursos Humanos',
  'Finanzas': 'Finanzas',
  'Operaciones': 'Operaciones',
  'Ventas': 'Ventas',
};

const statusLabels: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  on_leave: 'En permiso',
};

const roleLabels: Record<string, string> = {
  employee: 'Empleado',
  hr: 'Recursos Humanos',
  admin: 'Administrador',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  on_leave: 'bg-yellow-100 text-yellow-800',
};

function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? Number(id) : null;

  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  const formattedSalary = employee
    ? new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(employee.salary)
    : '';

  const formattedHireDate = employee
    ? new Date(employee.hireDate + 'T00:00:00').toLocaleDateString('es-GT', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/empleados')}
        className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
      >
        ← Volver
      </button>

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
          <span>Cargando empleado...</span>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">Error al cargar el empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'Error desconocido'}
          </p>
        </div>
      )}

      {employee && (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            {employee.avatarUrl ? (
              <img
                src={employee.avatarUrl}
                alt={employee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xl font-semibold">
                {employee.name.charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
              <p className="text-slate-500">{employee.position}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${statusColors[employee.status]}`}>
              {statusLabels[employee.status]}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Email</p>
              <p className="text-slate-800">{employee.email}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Cargo</p>
              <p className="text-slate-800">{employee.position}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Departamento</p>
              <p className="text-slate-800">{departmentLabels[employee.department]}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Salario mensual</p>
              <p className="text-slate-800">{formattedSalary}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Fecha de ingreso</p>
              <p className="text-slate-800">{formattedHireDate}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 mb-1">Rol</p>
              <p className="text-slate-800">{roleLabels[employee.role]}</p>
            </div>

            {employee.phone && (
              <div>
                <p className="text-xs uppercase text-slate-400 mb-1">Teléfono</p>
                <p className="text-slate-800">{employee.phone}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetailPage;