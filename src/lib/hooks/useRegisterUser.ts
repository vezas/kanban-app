import { Dispatch, SetStateAction } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth, db } from 'lib/services';

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerDataSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(12).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords must much')
});

const registerInstanceFn = (data: { email: string; password: string }) =>
  createUserWithEmailAndPassword(auth, data.email, data.password);

const createUserDatabase = (id: string) => {
  const usersRef = collection(db, 'users');
  setDoc(doc(usersRef, id), { userId: id });
};

export const useRegisterUser = (setIsRegistered: Dispatch<SetStateAction<boolean>>) => {
  const {
    mutate: registerMutate,
    isError,
    error,
    isLoading
  } = useMutation(registerInstanceFn, {
    onSuccess: (data) => {
      setIsRegistered(true);
      createUserDatabase(data.user.uid);
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(registerDataSchema)
  });

  const submitForm: SubmitHandler<Inputs> = (data: Inputs) => registerMutate(data);
  const submitFormFn = handleSubmit(submitForm);

  return { register, submitFormFn, control, errors, isError, error, isLoading };
};
