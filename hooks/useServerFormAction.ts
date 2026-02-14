'use client';

import { useActionState, useEffect } from 'react';
import { UseFormSetError, FieldValues } from 'react-hook-form';

/**
 * Estado genérico para Server Actions
 */
export type ServerFormState<T extends FieldValues = Record<string, any>> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: T;
};

/**
 * Hook reutilizable para Server Actions con sincronización de errores
 */
export function useServerFormAction<T extends FieldValues>(
  action: (prev: any, formData: FormData) => Promise<ServerFormState<T>>,
  initialState: ServerFormState<T>,
  onSuccess?: () => void
) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  /**
   * Hook para sincronizar errores del servidor con React Hook Form
   */
  const syncServerErrors = (setError: UseFormSetError<T>) => {
    useEffect(() => {
      if (state?.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          setError(field as any, {
            type: 'server',
            message: messages?.[0] || 'Error desconocido',
          });
        });
      }

      if (state?.success && onSuccess) {
        onSuccess();
      }
    }, [state, setError]);
  };

  return {
    state,
    formAction,
    isPending,
    syncServerErrors,
  };
}