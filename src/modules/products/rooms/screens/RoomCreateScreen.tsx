import { AppPageHeader } from '@/shared/ui/patterns';
import { AppButton } from '@/shared/ui/primitives';
import { useRoomCreateScreen } from '@/modules/products/rooms/hooks/useRoomCreateScreen';
import { RoomForm } from '../ui/form';

export const RoomCreateScreen = () => {
  const page = useRoomCreateScreen();

  return (
    <section className="app-page product-form-page">
      <AppPageHeader
        eyebrow={page.pageHeader.eyebrow}
        title={page.pageHeader.title}
        subtitle={page.pageHeader.subtitle}
        actions={
          <>
            <AppButton
              type="button"
              variant="secondary"
              disabled={page.isSaving}
              onClick={page.handleCancel}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              form="room-form"
              variant="primary"
              loading={page.isSaving}
              disabled={page.isSaving}
            >
              {page.isSaving ? 'Creating…' : page.submitLabel}
            </AppButton>
          </>
        }
      />
      <RoomForm
        id="room-form"
        mode="create"
        defaultValues={page.initialValues}
        errorMessage={page.saveErrorMessage}
        divisionId={page.divisionId}
        onSubmit={page.handleSubmit}
      />
    </section>
  );
};
