import { FC, useState } from 'react';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { MarginTop } from './Dashboard.styled';
import { Column } from 'lib/components/Column';
import { NewColumnForm } from 'lib/components/Form/NewColumnForm/NewColumnForm';
import { useFetchColumns } from 'lib/hooks/columns';
import { useParams } from 'react-router-dom';

export const Dashboard: FC = () => {
  const { boardId } = useParams();
  const { data: columns } = useFetchColumns(boardId as string);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  return (
    <>
      <Stack sx={{ flex: '1', overflowX: 'scroll', paddingInline: 2 }} component='main'>
        <MarginTop />
        <Stack mt={2} mb={2} flex={1} spacing={2} direction='row'>
          {columns?.map(({ name }, i) => (
            <Column key={i} name={name}>
              {name}
            </Column>
          ))}
          <Column name='Add new column'>
            <Button onClick={openForm}>Add</Button>
          </Column>
        </Stack>
      </Stack>
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogContent>
          <DialogTitle>Add new column</DialogTitle>
          <NewColumnForm setIsFormOpen={setIsFormOpen} />
          <DialogActions>
            <Button onClick={closeForm} size='small'>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
