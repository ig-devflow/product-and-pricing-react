import { useParams } from 'react-router';

export const useTransferRouteId = (): number | null => {
  const { transferId } = useParams<{ transferId: string }>();
  if (!transferId) return null;
  const parsed = Number(transferId);
  return Number.isNaN(parsed) ? null : parsed;
};
