import { useParams } from 'react-router';

export const useCentreRouteId = (): number | null => {
  const { centreId } = useParams<{ centreId: string }>();

  if (!centreId) {
    return null;
  }

  const parsedId = Number(centreId);
  return Number.isNaN(parsedId) ? null : parsedId;
};
