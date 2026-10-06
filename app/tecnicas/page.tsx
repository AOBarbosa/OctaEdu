"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CORE_DRIVERS, GAME_TECHNIQUES } from "../../lib/octalysis-data";
import { GameTechnique } from "../../lib/types";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExtensionIcon from "@mui/icons-material/Extension";
import SchoolIcon from "@mui/icons-material/School";
import LaunchIcon from "@mui/icons-material/Launch";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

function TecnicasCatalog() {
  const searchParams = useSearchParams();
  const driverQueryParam = searchParams.get("driver");

  const [selectedDriverFilter, setSelectedDriverFilter] = useState<string>(
    driverQueryParam || "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [selectedTechniqueModal, setSelectedTechniqueModal] =
    useState<GameTechnique | null>(null);

  useEffect(() => {
    if (driverQueryParam) {
      setSelectedDriverFilter(driverQueryParam);
    }
  }, [driverQueryParam]);

  const filteredTechniques = GAME_TECHNIQUES.filter((tech) => {
    // Filter by Core Driver
    if (
      selectedDriverFilter !== "all" &&
      tech.driverId.toString() !== selectedDriverFilter
    ) {
      return false;
    }
    // Filter by Level
    if (
      levelFilter !== "all" &&
      !tech.educationLevels.includes(levelFilter as any) &&
      !tech.educationLevels.includes("Todos")
    ) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle =
        tech.title.toLowerCase().includes(q) ||
        (tech.englishTitle && tech.englishTitle.toLowerCase().includes(q));
      const matchDesc =
        tech.description.toLowerCase().includes(q) ||
        tech.summary.toLowerCase().includes(q);
      const matchApp = tech.pedagogicalApplication.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchApp) return false;
    }
    return true;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: "center", maxWidth: 840, mx: "auto" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}
        >
          Técnicas de Jogos
        </Typography>
        <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.6 }}>
          Explore mecânicas adaptáveis, exemplos para sala de aula e recursos
          virtuais para engajar seus alunos.
        </Typography>
      </Box>

      {/* Filter and Search Bar */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Grid container spacing={2.5} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar técnica por nome, missão ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="driver-filter-label">
                Filtrar por Core Driver
              </InputLabel>
              <Select
                labelId="driver-filter-label"
                value={selectedDriverFilter}
                label="Filtrar por Core Driver"
                onChange={(e) => setSelectedDriverFilter(e.target.value)}
              >
                <MenuItem value="all">Todos os 8 Core Drivers</MenuItem>
                {CORE_DRIVERS.map((driver) => (
                  <MenuItem key={driver.id} value={driver.id.toString()}>
                    CD{driver.id}: {driver.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="level-filter-label">Nível de Ensino</InputLabel>
              <Select
                labelId="level-filter-label"
                value={levelFilter}
                label="Nível de Ensino"
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <MenuItem value="all">Todos os Níveis</MenuItem>
                <MenuItem value="Fundamental">Ensino Fundamental</MenuItem>
                <MenuItem value="Médio">Ensino Médio</MenuItem>
                <MenuItem value="Superior">Ensino Superior</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Quick Driver Pills */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2.5,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#64748b", fontWeight: 600, mr: 0.5 }}
          >
            Filtro Rápido:
          </Typography>
          <Chip
            label="Todos"
            size="small"
            clickable
            color={selectedDriverFilter === "all" ? "primary" : "default"}
            variant={selectedDriverFilter === "all" ? "filled" : "outlined"}
            onClick={() => setSelectedDriverFilter("all")}
          />
          {CORE_DRIVERS.map((driver) => (
            <Chip
              key={driver.id}
              label={`CD${driver.id}`}
              size="small"
              clickable
              onClick={() => setSelectedDriverFilter(driver.id.toString())}
              sx={{
                bgcolor:
                  selectedDriverFilter === driver.id.toString()
                    ? driver.color
                    : "transparent",
                color:
                  selectedDriverFilter === driver.id.toString()
                    ? "#ffffff"
                    : "#334155",
                borderColor: driver.color,
                borderWidth: 1,
                borderStyle: "solid",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Card>

      {/* Results Count */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          Exibindo <strong>{filteredTechniques.length}</strong> técnica(s) de
          jogos encontradas
        </Typography>

        <Button
          component={Link}
          href="/planejamento/novo"
          variant="contained"
          size="small"
          startIcon={<AutoAwesomeIcon />}
        >
          Aplicar em Novo Planejamento
        </Button>
      </Box>

      {/* Techniques List / Cards */}
      <Grid container spacing={3}>
        {filteredTechniques.map((tech) => {
          const driver =
            CORE_DRIVERS.find((d) => d.id === tech.driverId) || CORE_DRIVERS[0];

          return (
            <Grid size={{ xs: 12, md: 6 }} key={tech.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: `6px solid ${driver.color}`,
                  borderRadius: 3,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  {/* Badges Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1.5,
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        size="small"
                        label={`CD${driver.id}: ${driver.name}`}
                        sx={{
                          bgcolor: driver.color,
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      />
                      {tech.educationLevels.map((lvl) => (
                        <Chip
                          key={lvl}
                          size="small"
                          label={lvl}
                          variant="outlined"
                          sx={{ fontSize: "0.72rem", borderColor: "#cbd5e1" }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Title & Description */}
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}
                  >
                    {tech.title}
                  </Typography>
                  {tech.englishTitle && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#64748b",
                        fontStyle: "italic",
                        display: "block",
                        mb: 1.5,
                      }}
                    >
                      Framework: {tech.englishTitle}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    sx={{ color: "#334155", mb: 2, lineHeight: 1.6 }}
                  >
                    {tech.summary}
                  </Typography>

                  {/* Pedagogical Application Box */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f8fafc",
                      borderRadius: 2,
                      mb: 2,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <SchoolIcon sx={{ color: driver.color, fontSize: 18 }} />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#1e293b" }}
                      >
                        Aplicação em Sala de Aula
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#475569", lineHeight: 1.5 }}
                    >
                      {tech.pedagogicalApplication}
                    </Typography>
                  </Box>

                  {/* Mission / Activity Template */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#fffbeb",
                      borderRadius: 2,
                      mb: 2,
                      border: "1px solid #fde68a",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "#92400e", mb: 0.5 }}
                    >
                      🎯 Modelo Prático de Missão:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#78350f", fontStyle: "italic" }}
                    >
                      {tech.missionTemplate}
                    </Typography>
                  </Box>

                  {/* Virtual Learning Resources */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "#475569",
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Recursos e Ferramentas Virtuais:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tech.virtualResources.map((res, i) => (
                      <Chip
                        key={i}
                        size="small"
                        label={`${res.name} (${res.description})`}
                        component={res.url ? "a" : "div"}
                        href={res.url}
                        target="_blank"
                        clickable={Boolean(res.url)}
                        icon={
                          res.url ? (
                            <LaunchIcon sx={{ fontSize: 14 }} />
                          ) : undefined
                        }
                        sx={{
                          bgcolor: "#f1f5f9",
                          color: "#334155",
                          fontSize: "0.72rem",
                          maxWidth: "100%",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <Divider />

                {/* Card Actions */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#ffffff",
                    display: "flex",
                    gap: 1.5,
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    component={Link}
                    href={`/recursos?technique=${tech.id}`}
                  >
                    Exemplos & Materiais
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<AutoAwesomeIcon />}
                    component={Link}
                    href={`/planejamento/novo?technique=${tech.id}`}
                    sx={{
                      bgcolor: driver.color,
                      "&:hover": {
                        bgcolor: driver.color,
                        filter: "brightness(0.9)",
                      },
                    }}
                  >
                    Usar no Planejamento
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default function TecnicasPage() {
  return (
    <Suspense
      fallback={
        <Container sx={{ py: 6 }}>
          <Typography>Carregando catálogo de técnicas...</Typography>
        </Container>
      }
    >
      <TecnicasCatalog />
    </Suspense>
  );
}
