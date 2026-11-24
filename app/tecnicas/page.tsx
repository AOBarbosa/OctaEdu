"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  TESTING_FOCUSES,
  countTechniqueActivities,
  filterActivities,
  findDriver,
  techniqueUsesLearningObject,
} from "../../lib/octalysis";
import { OctalysisContent, TestingFocus } from "../../lib/types";
import {
  EMPTY_ACTIVITY_FILTER,
  isActivityFilterActive,
} from "../../lib/activity-filter";
import ContentLoading from "../../components/ContentLoading";
import ActivityFilterBar from "../../components/ActivityFilterBar";
import ActivityList from "../../components/ActivityList";
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
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScienceIcon from "@mui/icons-material/Science";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Link from "next/link";

function TecnicasCatalog({
  content,
  initialDriver,
}: {
  content: OctalysisContent;
  initialDriver: string;
}) {
  const [selectedDriverFilter, setSelectedDriverFilter] =
    useState<string>(initialDriver);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusFilter, setFocusFilter] = useState<TestingFocus | "all">("all");
  const [activityFilter, setActivityFilter] = useState(EMPTY_ACTIVITY_FILTER);
  const filtering = isActivityFilterActive(activityFilter);

  const clearAllFilters = () => {
    setSelectedDriverFilter("all");
    setSearchQuery("");
    setFocusFilter("all");
    setActivityFilter(EMPTY_ACTIVITY_FILTER);
  };

  const filteredTechniques = content.techniques.filter((tech) => {
    // Filter by Core Driver
    if (
      selectedDriverFilter !== "all" &&
      tech.driverId.toString() !== selectedDriverFilter
    ) {
      return false;
    }
    // Filter by Testing Focus
    if (
      focusFilter !== "all" &&
      !tech.testingFocus.includes(focusFilter) &&
      !tech.testingFocus.includes("Todos")
    ) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const texts = [
        tech.title,
        tech.description,
        tech.generalExample ?? "",
        ...tech.activities.flatMap((a) => [
          a.description,
          a.supportTools ?? "",
          ...a.learningObjects.map((lo) => lo.name),
        ]),
      ];
      if (!texts.some((text) => text.toLowerCase().includes(q))) return false;
    }
    if (
      filtering &&
      countTechniqueActivities(tech, activityFilter).matching === 0
    ) {
      return false;
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
          Técnicas de Jogos para Testes de Software
        </Typography>
        <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.6 }}>
          Técnicas de jogos do Octalysis com atividades para aulas de teste de
          software, baseadas nos estudos selecionados pela equipe.
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
              placeholder="Buscar técnica por nome ou palavra-chave..."
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
                {content.coreDrivers.map((driver) => (
                  <MenuItem key={driver.id} value={driver.id.toString()}>
                    CD{driver.id}: {driver.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="focus-filter-label">Foco de Teste</InputLabel>
              <Select
                labelId="focus-filter-label"
                value={focusFilter}
                label="Foco de Teste"
                onChange={(e) =>
                  setFocusFilter(e.target.value as TestingFocus | "all")
                }
              >
                <MenuItem value="all">Todos os Níveis de Teste</MenuItem>
                {TESTING_FOCUSES.map((focus) => (
                  <MenuItem key={focus} value={focus}>
                    {focus}
                  </MenuItem>
                ))}
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
          {content.coreDrivers.map((driver) => (
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

        <Divider sx={{ my: 2.5 }} />
        <ActivityFilterBar filter={activityFilter} onChange={setActivityFilter} />
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

      {filteredTechniques.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #cbd5e1",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
            Nenhuma técnica encontrada
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mb: 3 }}>
            Tente outra busca ou remova alguns filtros.
          </Typography>
          <Button variant="contained" onClick={clearAllFilters}>
            Limpar filtros
          </Button>
        </Paper>
      )}

      {/* Techniques List / Cards */}
      <Grid container spacing={3}>
        {filteredTechniques.map((tech) => {
          const driver =
            findDriver(content, tech.driverId) ?? content.coreDrivers[0];
          const { total, matching } = countTechniqueActivities(
            tech,
            activityFilter,
          );

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
                      {techniqueUsesLearningObject(tech) && (
                        <Chip
                          size="small"
                          icon={<ScienceIcon sx={{ fontSize: 16 }} />}
                          label="Objeto de Aprendizagem"
                          sx={{
                            bgcolor: "#fef9c3",
                            color: "#713f12",
                            border: "1px solid #eab308",
                            fontWeight: 700,
                          }}
                        />
                      )}
                      {tech.testingFocus.map((focus) => (
                        <Chip
                          key={focus}
                          size="small"
                          label={focus}
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

                  <Typography
                    variant="body2"
                    sx={{ color: "#334155", mb: 2, lineHeight: 1.6 }}
                  >
                    {tech.description}
                  </Typography>

                  {tech.generalExample && (
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        mb: 2,
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}
                      >
                        Exemplo geral
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#475569", lineHeight: 1.5 }}
                      >
                        {tech.generalExample}
                      </Typography>
                    </Box>
                  )}

                  <Accordion
                    key={String(filtering)}
                    disableGutters
                    elevation={0}
                    defaultExpanded={filtering}
                    sx={{
                      mb: 2,
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      "&::before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                        Atividades ({filtering ? `${matching} de ${total}` : total})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ActivityList activities={filterActivities(tech, activityFilter)} />
                    </AccordionDetails>
                  </Accordion>

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

function TecnicasLoader() {
  const searchParams = useSearchParams();
  const { content } = useAuth();
  const driverQueryParam = searchParams.get("driver") || "all";
  if (!content) return <ContentLoading message="Carregando catálogo de técnicas..." />;
  return (
    <TecnicasCatalog
      key={driverQueryParam}
      content={content}
      initialDriver={driverQueryParam}
    />
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
      <TecnicasLoader />
    </Suspense>
  );
}
