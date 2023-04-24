import { FC, ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface ColumnProps {
  children: ReactNode;
  name: string;
}

export const Column: FC<ColumnProps> = ({ children, name }) => {
  return (
    <Paper elevation={6}>
      <Box width={220} p={2}>
        <Typography textAlign='center' noWrap color='secondary' variant='h6'>
          {name}
        </Typography>
        {children}
      </Box>
    </Paper>
  );
};
