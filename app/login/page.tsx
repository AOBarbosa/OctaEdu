'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Por favor, informe seu e-mail e sua senha para entrar.');
      return;
    }

    setSubmitting(true);
    const result = login(email, password);

    if (!result.success) {
      setErrorMsg(result.message || 'Login não pôde ser efetuado. Verifique os dados inseridos.');
      setSubmitting(false);
      return;
    }

    router.push('/planos');
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('senha123');
    setErrorMsg(null);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card sx={{ boxShadow: '0 8px 30px rgba(0,0,0,0.08)', borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#eff6ff',
                color: '#2563eb',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5
              }}
            >
              <LoginIcon fontSize="medium" />
            </Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 800, color: '#1e293b' }}>
              Entrar na Plataforma
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
              Acesse seus planos de aula gamificados e recursos do Octalysis.
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="E-mail"
                  placeholder="seu.email@escola.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#94a3b8' }} />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={submitting}
                  sx={{ py: 1.4, fontSize: '1rem', fontWeight: 700 }}
                >
                  {submitting ? 'Verificando Credenciais...' : 'Entrar no Sistema'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Demo Credentials Quick-Fill helper */}
          <Box sx={{ mt: 3.5 }}>
            <Divider>
              <Chip icon={<VpnKeyIcon />} label="Acesso Rápido para Avaliação" size="small" />
            </Divider>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', textAlign: 'center', mt: 1, mb: 1.5 }}>
              Clique para preencher automaticamente com uma conta de demonstração:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleFillDemo('ana.silva@escola.edu.br')}
                sx={{ fontSize: '0.8rem' }}
              >
                Profa. Ana Silva (Ciências)
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleFillDemo('carlos.eduardo@escola.edu.br')}
                sx={{ fontSize: '0.8rem' }}
              >
                Prof. Carlos Eduardo (Matemática)
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Ainda não tem conta?{' '}
              <Link href="/cadastro" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                Cadastrar-se agora
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
