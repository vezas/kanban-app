import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authInstance } from 'lib/services';
import { paths } from 'constants';

interface Inputs {
  email: string;
  password: string;
}

const loginDataSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const loginInstance = (data: { email: string; password: string }) =>
  authInstance.post(`:signInWithPassword?key=${import.meta.env.VITE_REGISTER_API_KEY}`, {
    method: 'POST',
    email: data.email,
    password: data.password,
    headers: { 'Content-Type': 'application/json' },
    returnSecureToken: true
  });

export const useLoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || paths.DASHBOARD;

  const { mutate, isLoading, isError, error } = useMutation(loginInstance, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.data.idToken);
      navigate(redirectPath, { replace: true });
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(loginDataSchema) });

  const submitForm: SubmitHandler<Inputs> = (data: Inputs) => mutate(data);

  return { register, handleSubmit, control, submitForm, errors, isError, error, isLoading };
};
