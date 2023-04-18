import { Dispatch, FC, SetStateAction } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DevTool } from '@hookform/devtools';
import { usePostBoard } from 'lib/hooks';

interface NewBoardFormProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewBoardForm: FC<NewBoardFormProps> = ({ setIsFormOpen }) => {
  const { handleSubmit, submitForm, register, isError, errors, isLoading, control } =
    usePostBoard(setIsFormOpen);

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Stack spacing={2}>
          <TextField
            autoComplete='off'
            label='Name'
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
