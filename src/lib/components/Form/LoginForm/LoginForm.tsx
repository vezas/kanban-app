import { FC } from 'react';
import { Stack, TextField, Button } from '@mui/material';

export const LoginForm: FC = () => {
  return (
    <form>
      <Stack spacing={2}>
        <TextField label='Username' size='small' />
        <TextField label='Password' size='small' />
        <Button type='submit' variant='contained'>
          Log in
        </Button>
      </Stack>
    </form>
  );
};
