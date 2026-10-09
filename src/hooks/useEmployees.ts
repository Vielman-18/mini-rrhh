// src/hooks/useEmployees.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { handleError } from '../utils/errorHandler';
import { employeeService, type EmployeeFilters } from '../services/employeeService';
import type { CreateEmployeeDto, UpdateEmployeeDto } from '../types';

// Claves de consulta para el manejo de caché
export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (filters: EmployeeFilters) => [...employeeKeys.lists(), filters] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

// Hook para obtener la lista de empleados
export function useEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: employeeKeys.list(filters),
    queryFn: () => employeeService.getAll(filters),
  });
}

// Hook para obtener UN solo empleado por su ID
export function useEmployee(id: number) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  });
}

// Hook para crear empleado
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDto) => employeeService.create(data),
    onSuccess: (newEmployee) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success(`${newEmployee.name} fue agregado exitosamente.`);
    },
    onError: (error) => {
      handleError(error, 'Error al crear empleado');
    },
  });
}

// Hook para actualizar empleado
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeDto }) =>
      employeeService.update(id, data),
    onSuccess: (updatedEmployee) => {
      queryClient.setQueryData(
        employeeKeys.detail(updatedEmployee.id),
        updatedEmployee
      );
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success(`${updatedEmployee.name} fue actualizado exitosamente.`);
    },
    onError: (error) => {
      handleError(error, 'Error al actualizar empleado');
    },
  });
}

// Hook para eliminar empleado
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => employeeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success('Empleado eliminado correctamente.');
    },
    onError: (error) => {
      handleError(error, 'Error al eliminar empleado');
    },
  });
}