'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HexagonIcon from '@mui/icons-material/Hexagon';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0f172a', color: '#cbd5e1', mt: 'auto', pt: 6, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  bgcolor: '#2563eb',
                  color: '#ffffff',
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SchoolIcon fontSize="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
                OctaEdu
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.7, maxWidth: 440 }}>
              Plataforma de apoio a professores na aplicação de estratégias pedagógicas gamificadas, fundamentada no framework Octalysis de Yu-kai Chou. Desenvolvida para transformar o engajamento e a aprendizagem significativa em sala de aula.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}>
              Exploração Octalysis
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/octogono" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Os 8 Core Drivers
              </Link>
              <Link href="/tecnicas" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Catálogo de Técnicas de Jogos
              </Link>
              <Link href="/recursos" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Exemplos e Recursos Compartilhados
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff', mb: 2 }}>
              Ferramentas do Professor
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/planejamento/novo" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Wizard: Aplicar Gamificação por Objetivos
              </Link>
              <Link href="/planos" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Gerenciar Meus Planos de Aula
              </Link>
              <Link href="/recursos" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>
                Fazer Upload de Materiais e Práticas
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#334155', mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} OctaEdu - Plataforma Pedagógica Octalysis. Todos os direitos reservados.
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <HexagonIcon sx={{ fontSize: 14, color: '#38bdf8' }} /> Baseado no Framework de Gamificação Octalysis de Yu-kai Chou
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
