'use client';

import React, { useState } from 'react';
import { CORE_DRIVERS } from '../lib/octalysis-data';
import { CoreDriver } from '../lib/types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShieldIcon from '@mui/icons-material/Shield';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface OctagonVisualizerProps {
  selectedDriverId?: number | null;
  onSelectDriver?: (driver: CoreDriver) => void;
  interactive?: boolean;
}

export default function OctagonVisualizer({
  selectedDriverId: externalSelectedId,
  onSelectDriver,
  interactive = true
}: OctagonVisualizerProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<number | null>(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeId = externalSelectedId !== undefined ? externalSelectedId : internalSelectedId;
  const activeDriver = CORE_DRIVERS.find(d => d.id === activeId) || CORE_DRIVERS[0];

  const handleDriverClick = (driver: CoreDriver) => {
    if (!interactive) return;
    if (onSelectDriver) {
      onSelectDriver(driver);
    } else {
      setInternalSelectedId(driver.id);
      setModalOpen(true);
    }
  };

  // SVG Geometry for regular 8-sided polygon
  const size = 500;
  const center = size / 2;
  const radius = 175;
  const innerRadius = 55;

  // Angles for the 8 drivers arranged symmetrically:
  // 1: Top (Epic Meaning) - 270 deg
  // 2: Upper Right (Accomplishment) - 315 deg
  // 3: Right (Creativity) - 0 deg
  // 4: Lower Right (Ownership) - 45 deg
  // 5: Bottom (Social) - 90 deg
  // 6: Lower Left (Scarcity) - 135 deg
  // 7: Left (Curiosity) - 180 deg
  // 8: Upper Left (Loss Avoidance) - 225 deg
  const driverAngleMap: Record<number, number> = {
    1: -90, // Top
    2: -45, // Top-Right
    3: 0,   // Right
    4: 45,  // Bottom-Right
    5: 90,  // Bottom
    6: 135, // Bottom-Left
    7: 180, // Left
    8: 225  // Top-Left
  };

  // Convert polar coordinates to Cartesian
  const getCoordinates = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  // Generate SVG path for slice segment
  const getSlicePath = (angleDeg: number) => {
    const halfSpan = 22.5;
    const startAngle = angleDeg - halfSpan;
    const endAngle = angleDeg + halfSpan;

    const p1 = getCoordinates(startAngle, innerRadius);
    const p2 = getCoordinates(startAngle, radius);
    const p3 = getCoordinates(endAngle, radius);
    const p4 = getCoordinates(endAngle, innerRadius);

    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Legend & Dimensions Indicators */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
          mb: 3,
          p: 1.5,
          bgcolor: '#f1f5f9',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            size="small"
            label="White Hat (Motivação Positiva/Autonomia)"
            sx={{ bgcolor: '#dbeafe', color: '#1e40af', fontWeight: 600 }}
          />
          <Chip
            size="small"
            label="Black Hat (Urgência & Foco)"
            sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 600 }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            size="small"
            variant="outlined"
            label="Lado Esquerdo: Lógica & Extrínseco"
            sx={{ borderColor: '#cbd5e1', color: '#475569' }}
          />
          <Chip
            size="small"
            variant="outlined"
            label="Lado Direito: Criatividade & Intrínseco"
            sx={{ borderColor: '#cbd5e1', color: '#475569' }}
          />
        </Box>
      </Box>

      {/* Main Grid: Octagon Visualizer + Quick Insight Panel */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 4,
          alignItems: 'center'
        }}
      >
        {/* SVG Graphic */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: '#ffffff',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'relative'
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b', mb: 1, fontWeight: 500 }}>
            Clique em qualquer um dos 8 Core Drivers para explorar em detalhes
          </Typography>

          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={{
              width: '100%',
              maxWidth: 440,
              height: 'auto',
              overflow: 'visible',
              filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))'
            }}
          >
            {/* Outer Background Guidelines */}
            <circle cx={center} cy={center} r={radius + 8} fill="none" stroke="#e2e8f0" strokeDasharray="4 4" />
            <circle cx={center} cy={center} r={innerRadius - 4} fill="#f8fafc" stroke="#cbd5e1" />

            {/* Drivers Slices */}
            {CORE_DRIVERS.map(driver => {
              const angle = driverAngleMap[driver.id];
              const isSelected = activeId === driver.id;
              const isHovered = hoveredId === driver.id;
              const labelPos = getCoordinates(angle, (radius + innerRadius) / 2);
              const numberPos = getCoordinates(angle, radius + 24);

              return (
                <g
                  key={driver.id}
                  onClick={() => handleDriverClick(driver)}
                  onMouseEnter={() => setHoveredId(driver.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.25s ease' }}
                >
                  {/* Slice Wedge */}
                  <path
                    d={getSlicePath(angle)}
                    fill={driver.color}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.75 : 0.45}
                    stroke={isSelected ? '#0f172a' : '#ffffff'}
                    strokeWidth={isSelected ? 3.5 : 2}
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      transform: isSelected ? 'scale(1.03)' : isHovered ? 'scale(1.015)' : 'scale(1)',
                      transition: 'all 0.25s ease'
                    }}
                  />

                  {/* Driver Label */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected || isHovered ? '#ffffff' : '#1e293b'}
                    fontSize={11}
                    fontWeight={isSelected ? 700 : 600}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    CD{driver.id}
                  </text>

                  {/* Outer Badge indicator */}
                  <circle
                    cx={numberPos.x}
                    cy={numberPos.y}
                    r={14}
                    fill={isSelected ? driver.color : '#ffffff'}
                    stroke={driver.color}
                    strokeWidth={2}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  <text
                    x={numberPos.x}
                    y={numberPos.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected ? '#ffffff' : driver.color}
                    fontSize={11}
                    fontWeight={700}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {driver.id}
                  </text>
                </g>
              );
            })}

            {/* Central Octalysis Core Badge */}
            <circle cx={center} cy={center} r={innerRadius - 6} fill="#0f172a" />
            <text
              x={center}
              y={center - 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize={11}
              fontWeight={700}
              letterSpacing={1}
            >
              OCTALYSIS
            </text>
            <text
              x={center}
              y={center + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94a3b8"
              fontSize={9}
              fontWeight={500}
            >
              EDU FRAMEWORK
            </text>
          </svg>

          {/* Quick Active Driver Bar */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: activeDriver.color
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
              Selecionado: Core Driver {activeDriver.id} - {activeDriver.name}
            </Typography>
          </Box>
        </Box>

        {/* Selected Driver Detailed Card */}
        <Card
          sx={{
            borderLeft: `6px solid ${activeDriver.color}`,
            borderRadius: 3,
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <div>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Chip
                    size="small"
                    label={`Core Driver ${activeDriver.id}`}
                    sx={{ bgcolor: activeDriver.color, color: '#ffffff', fontWeight: 700 }}
                  />
                  <Chip
                    size="small"
                    label={activeDriver.hat === 'white' ? 'White Hat (Positivo)' : 'Black Hat (Urgência)'}
                    sx={{
                      bgcolor: activeDriver.hat === 'white' ? '#eff6ff' : '#fef2f2',
                      color: activeDriver.hat === 'white' ? '#1d4ed8' : '#b91c1c',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    size="small"
                    label={activeDriver.hemisphere === 'left' ? 'Cérebro Esquerdo (Lógica)' : 'Cérebro Direito (Criatividade)'}
                    variant="outlined"
                    sx={{ borderColor: '#cbd5e1', fontSize: '0.75rem' }}
                  />
                </Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  {activeDriver.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#64748b', fontStyle: 'italic' }}>
                  {activeDriver.englishName}
                </Typography>
              </div>
            </Box>

            <Typography variant="body1" sx={{ color: '#334155', mb: 2.5, lineHeight: 1.6 }}>
              {activeDriver.fullDescription}
            </Typography>

            {/* Pedagogical Impact */}
            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, mb: 2.5, border: '1px solid #e2e8f0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                <SchoolIcon sx={{ color: activeDriver.color, fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                  Impacto Pedagógico & Engajamento
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.5 }}>
                {activeDriver.pedagogicalImpact}
              </Typography>
            </Box>

            {/* Real Classroom Examples */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
              Exemplos Práticos em Sala de Aula:
            </Typography>
            <List dense disablePadding sx={{ mb: 3 }}>
              {activeDriver.classroomExamples.map((example, idx) => (
                <ListItem key={idx} disableGutters sx={{ alignItems: 'flex-start', py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 26, mt: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: activeDriver.color
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ color: '#475569' }}>{example}</Typography>}
                  />
                </ListItem>
              ))}
            </List>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href={`/tecnicas?driver=${activeDriver.id}`}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: activeDriver.color,
                  '&:hover': { bgcolor: activeDriver.color, filter: 'brightness(0.9)' }
                }}
              >
                Ver Técnicas deste Core Driver
              </Button>

              <Button
                component={Link}
                href={`/planejamento/novo?driver=${activeDriver.id}`}
                variant="outlined"
                sx={{ borderColor: activeDriver.color, color: activeDriver.color }}
              >
                Aplicar em um Planejamento
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Deep-Dive Modal if opened */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: activeDriver.color }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              CD{activeDriver.id}: {activeDriver.name}
            </Typography>
          </Box>
          <IconButton onClick={() => setModalOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
            {activeDriver.fullDescription}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2, mb: 1, color: activeDriver.color }}>
            Por que usar na Educação?
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
            {activeDriver.pedagogicalImpact}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 2, mb: 1, color: '#1e293b' }}>
            Aplicações Recomendadas:
          </Typography>
          <List>
            {activeDriver.classroomExamples.map((ex, i) => (
              <ListItem key={i}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <AutoStoriesIcon sx={{ color: activeDriver.color, fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText primary={ex} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setModalOpen(false)}>Fechar</Button>
          <Button
            component={Link}
            href={`/tecnicas?driver=${activeDriver.id}`}
            variant="contained"
            sx={{ bgcolor: activeDriver.color }}
          >
            Explorar Técnicas Associadas
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
