import { FC, useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DevTool } from '@hookform/devtools';
import { useRegisterUser } from 'lib/hooks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const RegisterForm: FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { register, handleSubmit, control, submitForm, errors, isError, error, isLoading } =
    useRegisterUser(setIsRegistered);

  return (
    <>
      {isRegistered ? (
        <>
          <Stack alignItems='center' spacing={2}>
            <Typography textAlign='center' color='success.main' variant='body1'>
              Account registerd
            </Typography>
            <CheckCircleOutlineIcon fontSize='large' color='success' />
          </Stack>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <Stack spacing={2}>
              <TextField
                label='Email'
                size='small'
                type='text'
                required
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label='Password'
                size='small'
                type='password'
                required
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                label='Confirm password'
                size='small'
                type='password'
                required
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <LoadingButton loading={isLoading} type='submit' variant='contained'>
                Register
              </LoadingButton>
            </Stack>
            {isError && (
              <Typography mt={2} variant='body2' color='error'>
                {error instanceof Error && error.message}
              </Typography>
            )}
          </form>
          <DevTool control={control} />
        </>
      )}
    </>
  );
};
