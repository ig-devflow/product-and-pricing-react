import { useParams } from 'react-router';

export const usePackageRouteId = (): number | null => {
  const { packageId } = useParams<{ packageId: string }>();
  if (!packageId) return null;
  const parsed = Number(packageId);
  return Number.isNaN(parsed) ? null : parsed;
};
