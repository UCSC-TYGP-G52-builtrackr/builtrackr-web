import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SubmitBtn() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" sx={{ color: 'green', backgroundColor: 'white', borderColor: 'green',':hover': {
            backgroundColor: 'green',
            color: 'white',
            borderColor: 'green'
          }}} disableElevation>Cancel</Button>
    </Stack>
  );
}