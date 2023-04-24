import { useMutation, useQueryClient } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'lib/services';
import { Dispatch, SetStateAction } from 'react';

interface Inputs {
  name: string;
}

const newColumnDataSchema = yup.object().shape({
  name: yup.string().min(2).max(13).required()
});

export const usePostColumn = (
  boardId: string,
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const addColumnFn = (data: Inputs) => {
    const userId = localStorage.getItem('accessToken');
    const boardsRef = collection(db, `users/${userId}/boards/${boardId}/columns`);
    return addDoc(boardsRef, data);
  };

  const {
    mutate: addColumnMutate,
    isError,
    error,
    isLoading
  } = useMutation(addColumnFn, {
    onSuccess: () => {
      setIsFormOpen(false);
      queryClient.invalidateQueries('columns');
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(newColumnDataSchema)
  });

  const submitForm: SubmitHandler<Inputs> = (data: Inputs) => addColumnMutate(data);

  return { register, handleSubmit, control, submitForm, errors, isError, error, isLoading };
};
