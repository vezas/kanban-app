import { Dispatch, FC, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DevTool } from '@hookform/devtools';
import { usePostColumn } from 'lib/hooks';

interface NewColumnFormProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewColumnForm: FC<NewColumnFormProps> = ({ setIsFormOpen }) => {
  const { boardId } = useParams();
  const { register, handleSubmit, control, submitForm, isLoading, errors, isError } = usePostColumn(
    boardId as string,
    setIsFormOpen
  );

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={2}>
          <TextField
            label='Column name'
            size='small'
            type='text'
            {...register('name')}
            error={!!errors.name || isError}
            helperText={errors.name?.message}
          />
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isLoading}
            color={isError ? 'error' : 'primary'}
          >
            Add
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
