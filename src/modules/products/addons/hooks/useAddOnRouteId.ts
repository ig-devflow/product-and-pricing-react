import { useParams } from 'react-router';

export const useAddOnRouteId = (): number | null => {
  const { addonId } = useParams<{ addonId: string }>();
  if (!addonId) return null;
  const parsed = Number(addonId);
  return Number.isNaN(parsed) ? null : parsed;
};
