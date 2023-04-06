import { FC, Dispatch, SetStateAction } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DevTool } from '@hookform/devtools';
import { useRegisterUser } from 'lib/hooks';

interface RegisterFormProps {
  closeDialog: Dispatch<SetStateAction<boolean>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({ closeDialog }) => {
  const { register, handleSubmit, control, submitForm, errors, isError, error, isLoading } =
    useRegisterUser(closeDialog);

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Stack spacing={2}>
          <TextField
            label='Email'
            size='small'
            required
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            size='small'
            required
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label='Confirm password'
            size='small'
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
            <>{error instanceof Error && error.message}</>
          </Typography>
        )}
      </form>
      <DevTool control={control} />
    </>
  );
};
