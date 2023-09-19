import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined" sx={{ color: 'black', backgroundColor: 'white', borderColor: '#ffcc00',':hover': {
            backgroundColor: '#ffcc00',
            color: 'white',
            borderColor: 'white'
          }}} disableElevation>Add New Customer</Button>
    </Stack>
  );
}