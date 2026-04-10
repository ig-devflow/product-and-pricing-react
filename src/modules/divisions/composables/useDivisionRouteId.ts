import { useParams } from 'react-router';

export const useDivisionRouteId = (): number | null => {
  const { divisionId } = useParams<{ divisionId: string }>();

  if (!divisionId) {
    return null;
  }

  const parsedId = Number(divisionId);
  return Number.isNaN(parsedId) ? null : parsedId;
};
