import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CancelBtn() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" sx={{ color: 'red', backgroundColor: 'white', borderColor: 'red',':hover': {
            backgroundColor: 'red',
            color: 'white',
            borderColor: 'red'
          }}} disableElevation>Cancel</Button>
    </Stack>
  );
}