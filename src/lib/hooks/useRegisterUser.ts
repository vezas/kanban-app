import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authInstance, dataBaseInstance } from 'lib/services';

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
  authInstance.post(`:signUp?key=${import.meta.env.VITE_REGISTER_API_KEY}`, {
    method: 'POST',
    email: data.email,
    password: data.password,
    headers: { 'Content-Type': 'application/json' },
    returnSecureToken: true
  });

const dataBaseInstanceFn = (id: string) =>
  dataBaseInstance.post(`${id}.json`, JSON.stringify({ id }));

export const useRegisterUser = (setIsRegistered: Dispatch<SetStateAction<boolean>>) => {
  const { mutate: dataBaseMutate } = useMutation(dataBaseInstanceFn);
  const {
    mutate: registerMutate,
    isError,
    error,
    isLoading
  } = useMutation(registerInstanceFn, {
    onSuccess: (data) => {
      const id = data.data.localId;
      setIsRegistered(true);
      dataBaseMutate(id);
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

  return { register, handleSubmit, control, submitForm, errors, isError, error, isLoading };
};
