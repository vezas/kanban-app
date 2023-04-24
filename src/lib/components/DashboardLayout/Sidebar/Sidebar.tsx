import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddIcon from '@mui/icons-material/Add';
import { DrawerHeader, Drawer } from './Sidebar.styled';
import { NewBoardForm } from 'lib/components/Form';
import { useFetchBoards } from 'lib/hooks';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const { data: boards, isLoading } = useFetchBoards();

  return (
    <>
      <Drawer
        as='aside'
        variant='permanent'
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <DrawerHeader>
          <IconButton size='small' onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isLoading ? (
            <>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{ justifyContent: 'center' }}>
                  <Skeleton
                    animation='wave'
                    variant='circular'
                    width={25}
                    height={25}
                    sx={{ mr: isSidebarOpen ? 1 : 0 }}
                  />
                  <Skeleton
                    animation='wave'
                    variant='text'
                    width='100%'
                    sx={{ display: isSidebarOpen ? 'block' : 'none' }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              {boards?.map(({ name, id }, i) => (
                <ListItem key={i} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    to={`/dashboard/${id}`}
                    sx={{ justifyContent: 'center' }}
                  >
                    <SpaceDashboardIcon color='secondary' sx={{ mr: isSidebarOpen ? 1 : 0 }} />
                    <ListItemText sx={{ opacity: isSidebarOpen ? 1 : 0 }}>{name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              {boards && boards.length > 0 && <Divider />}
            </>
          )}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ justifyContent: 'center' }} onClick={openForm}>
              <AddIcon color='primary' sx={{ mr: isSidebarOpen ? 1 : 0 }} />
              <ListItemText sx={{ opacity: isSidebarOpen ? 1 : 0 }}>Add new board</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogContent>
          <DialogTitle>Create new board</DialogTitle>
          <NewBoardForm setIsFormOpen={setIsFormOpen} />
          <DialogActions>
            <Button onClick={() => setIsFormOpen(false)} size='small'>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
