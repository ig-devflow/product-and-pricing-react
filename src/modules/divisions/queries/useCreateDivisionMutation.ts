import { useMutation, useQueryClient } from '@tanstack/react-query';
import { divisionsApi } from '@/modules/divisions/api/divisions.api';
import type { DivisionUpsertPayload } from '@/modules/divisions/model/division';
import { divisionQueryKeys } from './division-query-keys';

export const useCreateDivisionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: DivisionUpsertPayload) => {
      await divisionsApi.create(payload);
      return payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: divisionQueryKeys.list() });
    },
  });
};
