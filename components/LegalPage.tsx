import { Box, Container, Paper, Typography } from '@mui/material';
import { TERMS_UPDATED_AT, TERMS_VERSION } from '../lib/legal';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, sections }: Readonly<LegalPageProps>) {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, mb: 4 }}>
          Versão {TERMS_VERSION}, atualizada em {TERMS_UPDATED_AT}.
        </Typography>
        {sections.map((section) => (
          <Box key={section.title} component="section" sx={{ mb: 3.5 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
              {section.title}
            </Typography>
            {section.paragraphs.map((paragraph) => (
              <Typography key={paragraph} sx={{ color: '#334155', lineHeight: 1.7, mb: 1 }}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}
      </Paper>
    </Container>
  );
}
