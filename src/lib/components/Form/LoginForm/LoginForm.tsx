import { FC } from 'react';
import { DevTool } from '@hookform/devtools';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLoginUser } from 'lib/hooks';

export const LoginForm: FC = () => {
  const { register, handleSubmit, control, submitForm, isLoading, errors, isError } =
    useLoginUser();

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={2}>
          <TextField
            label='Email'
            size='small'
            type='email'
            {...register('email')}
            error={!!errors.email || isError}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            size='small'
            type='password'
            {...register('password')}
            error={!!errors.password || isError}
            helperText={errors.password?.message}
            autoComplete='off'
          />
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isLoading}
            color={isError ? 'error' : 'primary'}
          >
            Log in
          </LoadingButton>
        </Stack>
      </form>
      <DevTool control={control} />
      {isError && (
        <Typography textAlign='center' color='error'>
          Invalid data
        </Typography>
      )}
    </>
  );
};
