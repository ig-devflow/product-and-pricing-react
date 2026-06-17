import { useParams } from 'react-router';

export const useRoomRouteParams = (): { accommodationId: number | null; roomId: number | null } => {
  const { accommodationId, roomId } = useParams<{ accommodationId: string; roomId: string }>();

  function parseId(val: string | undefined): number | null {
    if (!val) return null;
    const n = Number(val);
    return Number.isNaN(n) ? null : n;
  }

  return { accommodationId: parseId(accommodationId), roomId: parseId(roomId) };
};
