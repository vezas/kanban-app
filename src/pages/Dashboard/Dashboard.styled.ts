import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MarginTop = styled(Box)(({ theme }) => ({
  ...theme.mixins.toolbar
}));
