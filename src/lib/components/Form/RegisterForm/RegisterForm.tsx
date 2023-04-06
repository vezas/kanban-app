import { FC, useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';

export const RegisterForm: FC = () => {
  const [passwordTouched, setPasswordTouched] = useState(false);

  return (
    <form noValidate>
      <Stack spacing={2}>
        <TextField label='Username' size='small' required />
        <TextField
          label='Password'
          size='small'
          required
          onFocus={() => setPasswordTouched(true)}
          onBlur={() => setPasswordTouched(false)}
          helperText={passwordTouched && '*longer than 6 signs, contains 1 special sign'}
        />
        <TextField label='Confirm password' size='small' required />
        <Button type='submit' variant='contained'>
          Register
        </Button>
      </Stack>
    </form>
  );
};
