'use client';

import React from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import {
  ActivityFilter,
  DIFFICULTIES,
  EMPTY_ACTIVITY_FILTER,
  LENGTH_LABELS,
  isActivityFilterActive,
} from '../lib/activity-filter';
import { ActivityLength } from '../lib/types';

interface ActivityFilterBarProps {
  filter: ActivityFilter;
  onChange: (filter: ActivityFilter) => void;
}

const LENGTHS = Object.keys(LENGTH_LABELS) as ActivityLength[];

export default function ActivityFilterBar({ filter, onChange }: Readonly<ActivityFilterBarProps>) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
      <ChipGroup label="Duração">
        {LENGTHS.map((length) => (
          <Chip
            key={length}
            label={LENGTH_LABELS[length]}
            clickable
            color={filter.length === length ? 'primary' : 'default'}
            variant={filter.length === length ? 'filled' : 'outlined'}
            aria-pressed={filter.length === length}
            onClick={() => onChange({ ...filter, length: filter.length === length ? null : length })}
          />
        ))}
      </ChipGroup>

      <ChipGroup label="Dificuldade">
        {DIFFICULTIES.map((difficulty) => (
          <Chip
            key={difficulty}
            label={difficulty}
            clickable
            color={filter.difficulty === difficulty ? 'primary' : 'default'}
            variant={filter.difficulty === difficulty ? 'filled' : 'outlined'}
            aria-pressed={filter.difficulty === difficulty}
            onClick={() =>
              onChange({ ...filter, difficulty: filter.difficulty === difficulty ? null : difficulty })
            }
          />
        ))}
      </ChipGroup>

      {isActivityFilterActive(filter) && (
        <Button size="small" onClick={() => onChange(EMPTY_ACTIVITY_FILTER)}>
          Limpar filtros
        </Button>
      )}
    </Box>
  );
}

function ChipGroup({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }} role="group" aria-label={label}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mr: 0.5 }}>
        {label}:
      </Typography>
      {children}
    </Box>
  );
}
