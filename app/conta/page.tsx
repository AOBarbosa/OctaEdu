'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User } from '../../lib/types';

const cardSx = { p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', mb: 3 };

export default function ContaPage() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }
  return <ContaContent key={currentUser.id} user={currentUser} />;
}

function ContaContent({ user }: Readonly<{ user: User }>) {
  const router = useRouter();
  const { updateAccount, deleteAccount } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [school, setSchool] = useState(user.school ?? '');
  const [subject, setSubject] = useState(user.subject ?? '');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    const result = await updateAccount({ name, email, school, subject });
    setSaving(false);
    if (!result.success) {
      setFormError(result.message);
      return;
    }
    showToast('Dados atualizados!');
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);
    setDeleting(true);
    const result = await deleteAccount(password);
    if (!result.success) {
      setDeleteError(result.message);
      setDeleting(false);
      return;
    }
    showToast('Conta excluída.');
    router.replace('/login');
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    setPassword('');
    setDeleteError(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a' }}>
        Meus dados
      </Typography>
      <Typography sx={{ color: '#64748b', mt: 0.5, mb: 4 }}>
        Veja, corrija, baixe ou exclua seus dados a qualquer momento.
      </Typography>

      <Paper sx={cardSx}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Dados da conta
        </Typography>
        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSave} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth required label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                type="email"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Escola (opcional)" value={school} onChange={(e) => setSchool(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Disciplina (opcional)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar dados'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={cardSx}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Baixar meus dados
        </Typography>
        <Typography sx={{ color: '#475569', mb: 2 }}>
          Arquivo com sua conta, seus planos e seus materiais.
        </Typography>
        <Button variant="outlined" startIcon={<DownloadIcon />} component="a" href="/api/account/export">
          Baixar arquivo
        </Button>
      </Paper>

      <Paper sx={{ ...cardSx, borderColor: '#fecaca' }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1, color: '#b91c1c' }}>
          Excluir conta
        </Typography>
        <Typography sx={{ color: '#475569', mb: 2 }}>
          Apaga para sempre sua conta, seus planos, seus materiais e os arquivos enviados.
        </Typography>
        <Button variant="outlined" color="error" startIcon={<DeleteForeverIcon />} onClick={() => setDeleteOpen(true)}>
          Excluir minha conta
        </Button>
      </Paper>

      <Dialog open={deleteOpen} onClose={closeDeleteDialog} maxWidth="xs" fullWidth>
        <Box component="form" onSubmit={handleDelete}>
          <DialogTitle sx={{ fontWeight: 700 }}>Excluir conta?</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#475569', mb: 2 }}>
              Essa ação não pode ser desfeita. Digite sua senha para confirmar.
            </Typography>
            {deleteError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {deleteError}
              </Alert>
            )}
            <TextField
              fullWidth
              autoFocus
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeDeleteDialog}>Cancelar</Button>
            <Button type="submit" variant="contained" color="error" disabled={!password || deleting}>
              {deleting ? 'Excluindo...' : 'Excluir conta'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}
