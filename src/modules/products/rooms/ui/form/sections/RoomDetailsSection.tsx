import { Controller, useFormContext } from 'react-hook-form';
import type { RoomFormValues } from '@/modules/products/rooms/model/form.types';
import { AppField } from '@/shared/ui/controls';
import { AppSelect, type AppSelectOption } from '@/shared/ui/controls/AppSelect';
import { AppFormGrid, AppSectionCard } from '@/shared/ui/patterns';
import { useAccommodationRoomTypesQuery } from '@/shared/queries/useAccommodationRoomTypesQuery';
import { useAccommodationBathroomTypesQuery } from '@/shared/queries/useAccommodationBathroomTypesQuery';
import { useAccommodationBoardTypesQuery } from '@/shared/queries/useAccommodationBoardTypesQuery';
import { useAccommodationRoomGradesQuery } from '@/shared/queries/useAccommodationRoomGradesQuery';

function toOptions(items: { id: number; name: string }[] | undefined): AppSelectOption[] {
  return (items ?? []).map((item) => ({ value: String(item.id), label: item.name }));
}

export const RoomDetailsSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  const roomTypesQuery = useAccommodationRoomTypesQuery();
  const bathroomTypesQuery = useAccommodationBathroomTypesQuery();
  const boardTypesQuery = useAccommodationBoardTypesQuery();
  const roomGradesQuery = useAccommodationRoomGradesQuery();

  const roomTypeOptions = toOptions(roomTypesQuery.data);
  const bathroomTypeOptions = toOptions(bathroomTypesQuery.data);
  const boardTypeOptions = toOptions(boardTypesQuery.data);
  const roomGradeOptions = toOptions(roomGradesQuery.data);

  return (
    <AppSectionCard
      id="section-room-details"
      title="Room details"
      description="Physical configuration of the room."
    >
      <AppFormGrid>
        <AppField label="Room type" forId="room-type" error={errors.roomTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="roomTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-type"
                  placeholder="Select room type…"
                  options={roomTypeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.roomTypeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Board type" forId="room-board-type" error={errors.boardTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="boardTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-board-type"
                  placeholder="Select board type…"
                  options={boardTypeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.boardTypeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Bathroom type" forId="room-bathroom-type" error={errors.bathroomTypeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="bathroomTypeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-bathroom-type"
                  placeholder="Select bathroom type…"
                  options={bathroomTypeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.bathroomTypeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>

        <AppField label="Room grade" forId="room-grade" error={errors.roomGradeId?.message} required>
          {({ labelId, describedBy }) => (
            <Controller
              name="roomGradeId"
              control={control}
              render={({ field }) => (
                <AppSelect
                  id="room-grade"
                  placeholder="Select room grade…"
                  options={roomGradeOptions}
                  value={field.value !== null ? String(field.value) : ''}
                  invalid={Boolean(errors.roomGradeId?.message)}
                  describedBy={describedBy}
                  labelledBy={labelId}
                  onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                />
              )}
            />
          )}
        </AppField>
      </AppFormGrid>
    </AppSectionCard>
  );
};
