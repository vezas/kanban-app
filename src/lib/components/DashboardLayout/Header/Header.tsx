import { FC, useState, MouseEvent } from 'react';
import {
  AppBar,
  Stack,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

export const Header: FC = () => {
  const [anchorSettingsMenu, setAnchorSettingsMenu] = useState<HTMLButtonElement | null>(null);
  const settingsMenuOpen = Boolean(anchorSettingsMenu);
  const handleOpenSettingsMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorSettingsMenu(event.currentTarget);
  const handleCloseSettingsMenu = () => setAnchorSettingsMenu(null);

  const [anchorAvatarMenu, setAnchorAvatarMenu] = useState<HTMLButtonElement | null>(null);
  const avatarMenuOpen = Boolean(anchorAvatarMenu);
  const handleOpenAvatarMenu = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorAvatarMenu(event.currentTarget);
  const handleCloseAvatarMenu = () => setAnchorAvatarMenu(null);

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='h1' fontSize='2rem' display={{ xs: 'none', sm: 'block' }}>
              KanbanApp
            </Typography>
            <ViewKanbanIcon sx={{ fontSize: '2rem' }} />
          </Stack>
          <Stack direction='row' alignItems='center' spacing={{ xs: 1, sm: 2 }} ml='auto'>
            <Button
              startIcon={<AddIcon />}
              variant='contained'
              color='secondary'
              size='medium'
              sx={{ textTransform: 'none', display: { xs: 'none', sm: 'flex' } }}
            >
              Add new Task
            </Button>
            <IconButton
              size='small'
              sx={{ display: { xs: 'grid', sm: 'none' }, placeItems: 'center' }}
              color='inherit'
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size='small'
              id='avatar-button'
              aria-controls={settingsMenuOpen ? 'avatar-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={settingsMenuOpen ? 'true' : undefined}
              onClick={handleOpenAvatarMenu}
            >
              <Avatar sx={{ width: '1.5rem', height: '1.5rem' }} />
            </IconButton>
            <Menu
              id='avatar-menu'
              anchorEl={anchorAvatarMenu}
              open={avatarMenuOpen}
              onClose={handleCloseAvatarMenu}
              MenuListProps={{ 'aria-labelledby': 'avatar-button' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem>Log out</MenuItem>
            </Menu>
            <IconButton
              size='small'
              id='settings-button'
              color='inherit'
              aria-controls={settingsMenuOpen ? 'settings-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={settingsMenuOpen ? 'true' : undefined}
              onClick={handleOpenSettingsMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='settings-menu'
              anchorEl={anchorSettingsMenu}
              open={settingsMenuOpen}
              onClose={handleCloseSettingsMenu}
              MenuListProps={{ 'aria-labelledby': 'settings-button' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleCloseSettingsMenu}>Edit board</MenuItem>
              <MenuItem onClick={handleCloseSettingsMenu}>Delete board</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
