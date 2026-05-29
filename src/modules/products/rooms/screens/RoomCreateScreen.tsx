import { AppPageHeader } from '@/shared/ui/patterns';
import { useRoomCreateScreen } from '@/modules/products/rooms/hooks/useRoomCreateScreen';
import { RoomForm } from '../ui/form';

export const RoomCreateScreen = () => {
  const page = useRoomCreateScreen();

  return (
    <section className="app-page product-form-page">
      <AppPageHeader eyebrow={page.pageHeader.eyebrow} title={page.pageHeader.title} subtitle={page.pageHeader.subtitle} />
      <RoomForm
        mode="create"
        defaultValues={page.initialValues}
        submitLabel={page.submitLabel}
        isSubmitting={page.isSaving}
        errorMessage={page.saveErrorMessage}
        onSubmit={page.handleSubmit}
        onCancel={page.handleCancel}
      />
    </section>
  );
};
