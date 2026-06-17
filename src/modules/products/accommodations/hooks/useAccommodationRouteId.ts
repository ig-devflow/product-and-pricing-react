import { useParams } from 'react-router';

export const useAccommodationRouteId = (): number | null => {
  const { accommodationId } = useParams<{ accommodationId: string }>();
  if (!accommodationId) return null;
  const parsed = Number(accommodationId);
  return Number.isNaN(parsed) ? null : parsed;
};
