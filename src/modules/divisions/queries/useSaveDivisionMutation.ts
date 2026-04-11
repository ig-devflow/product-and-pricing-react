import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDivision, updateDivision } from '../api/divisions.api';
import { divisionQueryKeys } from '../model/query-keys';
import { mapFormValuesToCreateDto, mapFormValuesToUpdateDto } from '../model/mappers';
import type { DivisionFormValues, DivisionReportText } from '../model/types';

interface CreateDivisionInput {
  mode: 'create';
  values: DivisionFormValues;
}

interface UpdateDivisionInput {
  mode: 'edit';
  divisionId: number;
  values: DivisionFormValues;
  existingReportTexts?: DivisionReportText[];
}

interface DivisionSaveResult {
  divisionId?: number;
}

type SaveDivisionInput = CreateDivisionInput | UpdateDivisionInput;

export function useSaveDivisionMutation() {
  const queryClient = useQueryClient();

  return useMutation<DivisionSaveResult, Error, SaveDivisionInput>({
    mutationFn: async (input) => {
      if (input.mode === 'create') {
        const payload = mapFormValuesToCreateDto(input.values);
        await createDivision(payload);

        return {};
      }

      const payload = mapFormValuesToUpdateDto(
        input.values,
        input.existingReportTexts ?? [],
      );
      await updateDivision(input.divisionId, payload);

      return {
        divisionId: input.divisionId,
      };
    },
    onSuccess: async (_result, input) => {
      await queryClient.invalidateQueries({
        queryKey: divisionQueryKeys.lists(),
      });

      if (input.mode === 'edit') {
        await queryClient.invalidateQueries({
          queryKey: divisionQueryKeys.detail(input.divisionId),
        });
      }
    },
  });
}
