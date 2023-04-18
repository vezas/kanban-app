import { useQuery } from 'react-query';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from 'lib/services';

const fetchBoards = async () => {
  const userId = localStorage.getItem('accessToken');

  const q = collection(db, `users/${userId}/boards/`);
  const docsSnap = await getDocs(q);

  const boards: DocumentData[] = [];
  docsSnap.forEach((doc) => boards.push({ ...doc.data(), id: doc.id }));

  return boards;
};

export const useFetchBoards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards
  });
  return { data, isLoading };
};
