import { FC, useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import {
  Stack,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/menu';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { AppBar } from './Header.styled';

interface HeaderProps {
  isSidebarOpen: boolean;

  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({ setIsSidebarOpen, isSidebarOpen }) => {
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
      <AppBar position='fixed' color='primary' open={isSidebarOpen}>
        <Toolbar>
          <IconButton
            size='small'
            color='inherit'
            aria-label='open sidebar'
            sx={{
              mr: { xs: 0, sm: 3 },
              ...(isSidebarOpen && { display: 'none' })
            }}
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={{ xs: 1, sm: 2 }}
            mr={2}
          >
            <Typography noWrap variant='h1' fontSize='2rem' display={{ xs: 'none', sm: 'block' }}>
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
              sx={{
                textTransform: 'none',
                display: { xs: 'none', sm: 'flex', whiteSpace: 'nowrap' }
              }}
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
