import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/services';
import { paths } from 'lib/constants';

interface Inputs {
  email: string;
  password: string;
}

const loginDataSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const loginInstance = (data: { email: string; password: string }) =>
  signInWithEmailAndPassword(auth, data.email, data.password);

export const useLoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || paths.DASHBOARD;

  const { mutate, isLoading, isError, error } = useMutation(loginInstance, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.user.uid);
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
