'use client';

import { Box, Chip, Typography } from '@mui/material';
import { ActivityFilter, LENGTH_LABELS, matchesActivityFilter } from '../lib/activity-filter';
import { getTechniqueActivities } from '../lib/technique-activities';
import { ActivityDifficulty } from '../lib/types';

interface ActivityListProps {
  techniqueId: string;
  filter: ActivityFilter;
}

const DIFFICULTY_COLORS: Record<ActivityDifficulty, { bg: string; fg: string }> = {
  Fácil: { bg: '#dcfce7', fg: '#166534' },
  Médio: { bg: '#fef3c7', fg: '#92400e' },
  Difícil: { bg: '#fee2e2', fg: '#991b1b' },
};

export default function ActivityList({ techniqueId, filter }: Readonly<ActivityListProps>) {
  const activities = getTechniqueActivities(techniqueId).filter((a) => matchesActivityFilter(a, filter));

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
        <Box
          key={activity.title}
          sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0' }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 0.75 }}>
            <Typography sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', mr: 'auto' }}>
              {activity.title}
            </Typography>
            <Chip
              size="small"
              label={activity.difficulty}
              sx={{
                bgcolor: DIFFICULTY_COLORS[activity.difficulty].bg,
                color: DIFFICULTY_COLORS[activity.difficulty].fg,
                fontWeight: 700,
              }}
            />
            <Chip size="small" variant="outlined" label={`${LENGTH_LABELS[activity.length]} · ${activity.estimatedTime}`} />
          </Box>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
            {activity.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
