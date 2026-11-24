'use client';

import { Box, Button, Chip, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScienceIcon from '@mui/icons-material/Science';
import { LENGTH_LABELS } from '../lib/activity-filter';
import { Activity, ActivityDifficulty, LearningObject } from '../lib/types';

interface ActivityListProps {
  activities: Activity[];
}

const DIFFICULTY_COLORS: Record<ActivityDifficulty, { bg: string; fg: string }> = {
  Fácil: { bg: '#dcfce7', fg: '#166534' },
  Médio: { bg: '#fef3c7', fg: '#92400e' },
  Difícil: { bg: '#fee2e2', fg: '#991b1b' },
};

const TEXT_SX = { color: '#475569', lineHeight: 1.6, whiteSpace: 'pre-line' } as const;

export default function ActivityList({ activities }: Readonly<ActivityListProps>) {
  if (activities.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: '#64748b', py: 1 }}>
        Nenhuma atividade com esses filtros.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {activities.map((activity) => (
        <Box key={activity.id} sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', mr: 'auto' }}>
              {activity.title}
            </Typography>
            {activity.difficulty ? (
              <Chip
                size="small"
                label={activity.difficulty}
                sx={{
                  bgcolor: DIFFICULTY_COLORS[activity.difficulty].bg,
                  color: DIFFICULTY_COLORS[activity.difficulty].fg,
                  fontWeight: 700,
                }}
              />
            ) : (
              <Chip size="small" variant="outlined" label="Dificuldade: a definir" />
            )}
            <Chip
              size="small"
              variant="outlined"
              label={
                activity.length
                  ? [LENGTH_LABELS[activity.length], activity.estimatedTime].filter(Boolean).join(' · ')
                  : 'Duração: a definir'
              }
            />
          </Box>

          {activity.learningObjects.map((lo) => (
            <LearningObjectBadge key={lo.id} learningObject={lo} />
          ))}

          <Typography variant="body2" sx={TEXT_SX}>
            {activity.description}
          </Typography>

          {activity.supportTools && (
            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed #e2e8f0' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', mb: 0.5 }}>
                Ferramentas e materiais de apoio
              </Typography>
              <Typography variant="body2" sx={TEXT_SX}>
                {activity.supportTools}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

function LearningObjectBadge({ learningObject }: Readonly<{ learningObject: LearningObject }>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
        p: 1.5,
        mb: 1.5,
        borderRadius: 2,
        bgcolor: '#fef9c3',
        border: '2px solid #eab308',
      }}
    >
      <ScienceIcon sx={{ color: '#a16207' }} />
      <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 800, color: '#713f12' }}>
          Objeto de Aprendizagem
        </Typography>
        <Typography variant="body2" sx={{ color: '#713f12' }}>
          {learningObject.name}
        </Typography>
      </Box>
      <Button
        size="small"
        variant="contained"
        href={learningObject.url}
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<OpenInNewIcon />}
        sx={{ bgcolor: '#a16207', '&:hover': { bgcolor: '#854d0e' } }}
      >
        Abrir
      </Button>
    </Box>
  );
}
