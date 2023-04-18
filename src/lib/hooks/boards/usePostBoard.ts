import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'lib/services';

interface Inputs {
  name: string;
}

const newBoardDataSchema = yup.object().shape({
  name: yup.string().min(2).max(20).required()
});

const addBoardFn = (data: Inputs) => {
  const userId = localStorage.getItem('accessToken');
  const boardsRef = collection(db, 'users', `${userId}`, 'boards');
  return addDoc(boardsRef, data);
};

export const usePostBoard = (setIsFormOpen: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();

  const {
    mutate: addBoardMutate,
    isError,
    error,
    isLoading
  } = useMutation(addBoardFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      setIsFormOpen(false);
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(newBoardDataSchema) });

  const submitForm: SubmitHandler<Inputs> = (data: Inputs) => addBoardMutate(data);

  return { register, handleSubmit, control, submitForm, errors, isError, error, isLoading };
};
