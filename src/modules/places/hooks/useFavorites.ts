import { type MouseEvent, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { type UserModel } from '@/shared/models';
import { removeFavorite, addToFAvorite } from '@modules/places/services';
import { useLoginModal } from '@/modules/auth/hooks';
import { toast } from 'react-hot-toast';

interface Props {
  listingId: string;
  user?: UserModel | null;
}

interface ReturnValues {
  hasFavorites: boolean;
  toggleFavorite: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

function useFavorites({ listingId, user }: Props): ReturnValues {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const hasFavorites = useMemo(() => {
    const list = user?.favoritesIds ?? [];
    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!user) {
        onOpen();
        return;
      }
      try {
        if (hasFavorites) {
          await removeFavorite(listingId);
        } else {
          await addToFAvorite(listingId);
        }
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [user, hasFavorites, listingId]
  );

  return {
    hasFavorites,
    toggleFavorite
  };
}

export default useFavorites;
