'use client';

import { Box, CircularProgress, Container, Typography } from '@mui/material';

// Mostrado enquanto o conteúdo do Octalysis ainda está sendo carregado da API.
export default function ContentLoading({ message = 'Carregando...' }: Readonly<{ message?: string }>) {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography sx={{ color: '#475569' }}>{message}</Typography>
      </Box>
    </Container>
  );
}
