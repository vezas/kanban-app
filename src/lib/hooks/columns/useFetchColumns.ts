import { useQuery } from 'react-query';
import { collection, getDocs } from '@firebase/firestore';
import { db } from 'lib/services';

export const useFetchColumns = (boardId: string) => {
  const fetchColumnsFn = async () => {
    const userId = localStorage.getItem('accessToken');
    const query = collection(db, `users/${userId}/boards/${boardId}/columns`);
    const querySnapshot = await getDocs(query);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  const { data } = useQuery({
    queryKey: ['columns', boardId],
    queryFn: fetchColumnsFn
  });
  return { data };
};
