import { FC, useState } from 'react';
import { Typography, Paper, Stack, Box, Button, Dialog } from '@mui/material';
import { LoginForm, RegisterForm } from 'lib/components/Form';

export const Home: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack
        minHeight='100vh'
        height='100%'
        p={2}
        justifyContent='space-evenly'
        alignItems='center'
        component='main'
        gap={2}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Stack height={{ xs: 'auto', sm: '100%' }} justifyContent='center' spacing={1}>
          <Typography
            variant='h1'
            color='primary'
            fontSize='3.5rem'
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            KanbanApp
          </Typography>
          <Typography textAlign={{ xs: 'center', sm: 'left' }}>
            Welcome to KanbanApp, create an account and check our funcionalites
          </Typography>
        </Stack>
        <Paper elevation={2}>
          <Box p={3}>
            <Stack spacing={2}>
              <LoginForm />
              <Typography variant='body2'>
                Don't have account yet?
                <Button size='small' onClick={() => setOpen(true)}>
                  Create account
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={3}>
          <RegisterForm />
        </Box>
      </Dialog>
    </>
  );
};
