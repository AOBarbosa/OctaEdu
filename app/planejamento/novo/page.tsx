"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import {
  CORE_DRIVERS,
  GAME_TECHNIQUES,
  EDUCATIONAL_OBJECTIVES,
  getRecommendationsForObjectives,
} from "../../../lib/octalysis-data";
import {
  GamificationPlan,
  GameTechnique,
  CoreDriver,
} from "../../../lib/types";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  Chip,
  TextField,
  Alert,
  Divider,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import ExtensionIcon from "@mui/icons-material/Extension";
import SaveIcon from "@mui/icons-material/Save";

const STEPS = [
  "Definir Objetivos Educacionais",
  "Core Drivers Recomendados",
  "Selecionar Técnicas & Missões",
  "Estruturar e Salvar Plano",
];

function NovoPlanejamentoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const driverParam = searchParams.get("driver");
  const techniqueParam = searchParams.get("technique");

  const { currentUser, createOrUpdatePlan } = useAuth();

  const [activeStep, setActiveStep] = useState(0);

  // Form State
  const [selectedObjectiveIds, setSelectedObjectiveIds] = useState<string[]>([
    "obj-colaboracao",
    "obj-engajamento",
  ]);
  const [selectedDriverIds, setSelectedDriverIds] = useState<number[]>([]);
  const [selectedTechniqueIds, setSelectedTechniqueIds] = useState<string[]>(
    [],
  );
  const [techniqueNotes, setTechniqueNotes] = useState<Record<string, string>>(
    {},
  );

  // Plan Meta
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Recommendations calculated dynamically
  const recommendations = getRecommendationsForObjectives(selectedObjectiveIds);

  // Initial pre-selection from URL queries if passed
  useEffect(() => {
    if (driverParam) {
      const dId = parseInt(driverParam, 10);
      if (!isNaN(dId) && !selectedDriverIds.includes(dId)) {
        setSelectedDriverIds((prev) => [...prev, dId]);
      }
    }
    if (techniqueParam) {
      if (!selectedTechniqueIds.includes(techniqueParam)) {
        setSelectedTechniqueIds((prev) => [...prev, techniqueParam]);
      }
    }
  }, [driverParam, techniqueParam]);

  // When step 1 completes, automatically suggest the top drivers if none selected
  const handleNextFromObjectives = () => {
    if (selectedObjectiveIds.length === 0) {
      setErrorMsg(
        "Por favor, selecione ao menos um objetivo educacional para continuarmos.",
      );
      return;
    }
    setErrorMsg(null);
    if (selectedDriverIds.length === 0) {
      // Pick top 2 or 3 recommended drivers
      const topIds = recommendations.rankedDrivers
        .slice(0, 3)
        .map((r) => r.driver.id);
      setSelectedDriverIds(topIds);
    }
    setActiveStep(1);
  };

  const handleNextFromDrivers = () => {
    if (selectedDriverIds.length === 0) {
      setErrorMsg(
        "Selecione ao menos um Core Driver para estruturar sua aula.",
      );
      return;
    }
    setErrorMsg(null);

    // If no techniques selected yet, pre-select one matching technique from each driver
    if (selectedTechniqueIds.length === 0) {
      const suggestedTechIds = GAME_TECHNIQUES.filter((t) =>
        selectedDriverIds.includes(t.driverId),
      )
        .slice(0, 3)
        .map((t) => t.id);
      setSelectedTechniqueIds(suggestedTechIds);
    }
    setActiveStep(2);
  };

  const handleNextFromTechniques = () => {
    if (selectedTechniqueIds.length === 0) {
      setErrorMsg("Selecione ao menos uma Técnica de Jogo para sua aula.");
      return;
    }
    setErrorMsg(null);
    setActiveStep(3);
  };

  const toggleObjective = (id: string) => {
    setSelectedObjectiveIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleDriver = (id: number) => {
    setSelectedDriverIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleTechnique = (id: string) => {
    setSelectedTechniqueIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSavePlan = () => {
    if (!title.trim()) {
      setErrorMsg(
        'O nome do plano é obrigatório (ex: "Gamificação de Matemática - 6º Ano").',
      );
      return;
    }
    if (!subject.trim()) {
      setErrorMsg("A disciplina / área do conhecimento é obrigatória.");
      return;
    }

    const newPlan: GamificationPlan = {
      id: "plan-" + Date.now(),
      userId: currentUser?.id || "demo-user",
      title: title.trim(),
      subject: subject.trim(),
      targetAudience: targetAudience.trim() || "Ensino Fundamental",
      description: description.trim(),
      selectedObjectiveIds,
      selectedDriverIds,
      selectedTechniques: selectedTechniqueIds.map((tId) => ({
        techniqueId: tId,
        customNotes: techniqueNotes[tId] || "",
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createOrUpdatePlan(newPlan);
    router.push("/planos");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Top Banner */}
      <Box sx={{ mb: 4, textAlign: "center", maxWidth: 840, mx: "auto" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}
        >
          Novo Planejamento
        </Typography>
        <Typography variant="body1" sx={{ color: "#475569" }}>
          Crie missões envolventes baseadas nos 8 Core Drivers do Octalysis.
        </Typography>
      </Box>

      {/* Stepper Header */}
      <Box sx={{ mb: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {errorMsg && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setErrorMsg(null)}
        >
          {errorMsg}
        </Alert>
      )}

      {/* STEP 1: OBJETIVOS EDUCACIONAIS (HU05) */}
      {activeStep === 0 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Etapa 1: Objetivos Pedagógicos
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Selecione os objetivos que deseja alcançar.
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {EDUCATIONAL_OBJECTIVES.map((obj) => {
              const isChecked = selectedObjectiveIds.includes(obj.id);
              return (
                <Grid size={{ xs: 12, md: 6 }} key={obj.id}>
                  <Card
                    onClick={() => toggleObjective(obj.id)}
                    sx={{
                      cursor: "pointer",
                      border: isChecked
                        ? "2px solid #2563eb"
                        : "1px solid #e2e8f0",
                      bgcolor: isChecked ? "#eff6ff" : "#ffffff",
                      boxShadow: isChecked
                        ? "0 8px 24px rgba(37,99,235,0.12)"
                        : "0 2px 8px rgba(0,0,0,0.03)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Checkbox
                            checked={isChecked}
                            onChange={() => toggleObjective(obj.id)}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.05rem",
                              color: "#1e293b",
                            }}
                          >
                            {obj.name}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={obj.category}
                          sx={{ fontSize: "0.72rem" }}
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#475569",
                          ml: 4,
                          mb: 1.5,
                          lineHeight: 1.5,
                        }}
                      >
                        {obj.description}
                      </Typography>

                      <Box
                        sx={{
                          ml: 4,
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "#64748b", fontWeight: 600 }}
                        >
                          Ativação Octalysis:
                        </Typography>
                        {obj.priorityDriverIds.map((dId) => {
                          const driver = CORE_DRIVERS.find((d) => d.id === dId);
                          return (
                            <Chip
                              key={dId}
                              size="small"
                              label={`CD${dId}: ${driver?.name.split(" ")[0]}`}
                              sx={{
                                bgcolor: driver?.color,
                                color: "#ffffff",
                                fontSize: "0.68rem",
                                fontWeight: 600,
                              }}
                            />
                          );
                        })}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNextFromObjectives}
              sx={{ px: 4, py: 1.2, fontWeight: 700 }}
            >
              Avançar para Recomendações ({selectedObjectiveIds.length}{" "}
              selecionado(s))
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 2: RECOMENDAÇÃO DOS CORE DRIVERS (HU06) */}
      {activeStep === 1 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Etapa 2: Core Drivers Recomendados
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Selecione os Core Drivers que deseja incorporar ao plano.
            </Typography>
          </Box>

          {/* Top Recommendation Highlight Banner */}
          {recommendations.rankedDrivers.length > 0 && (
            <Paper
              sx={{
                p: 3,
                mb: 4,
                bgcolor: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
              >
                <AutoAwesomeIcon sx={{ color: "#2563eb" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#1e40af" }}
                >
                  Sugestão Inteligente de Foco
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#1e3a8a", lineHeight: 1.6 }}
              >
                Para os objetivos de{" "}
                <strong>
                  {EDUCATIONAL_OBJECTIVES.filter((o) =>
                    selectedObjectiveIds.includes(o.id),
                  )
                    .map((o) => o.name)
                    .join(", ")}
                </strong>
                , recomendamos focar primordialmente nos Core Drivers:{" "}
                <strong>
                  {recommendations.rankedDrivers
                    .slice(0, 3)
                    .map((r) => `CD${r.driver.id} (${r.driver.name})`)
                    .join(", ")}
                </strong>
                .
              </Typography>
            </Paper>
          )}

          <Grid container spacing={3}>
            {recommendations.rankedDrivers.map(
              ({ driver, score, relatedObjectives }) => {
                const isSelected = selectedDriverIds.includes(driver.id);
                return (
                  <Grid size={{ xs: 12, md: 6 }} key={driver.id}>
                    <Card
                      onClick={() => toggleDriver(driver.id)}
                      sx={{
                        cursor: "pointer",
                        borderLeft: `6px solid ${driver.color}`,
                        borderRight: isSelected
                          ? `2px solid ${driver.color}`
                          : "1px solid #e2e8f0",
                        borderTop: isSelected
                          ? `2px solid ${driver.color}`
                          : "1px solid #e2e8f0",
                        borderBottom: isSelected
                          ? `2px solid ${driver.color}`
                          : "1px solid #e2e8f0",
                        bgcolor: isSelected ? "#faf5ff" : "#ffffff",
                        boxShadow: isSelected
                          ? `0 8px 24px ${driver.color}25`
                          : "0 2px 8px rgba(0,0,0,0.03)",
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Checkbox
                              checked={isSelected}
                              onChange={() => toggleDriver(driver.id)}
                            />
                            <div>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "1.05rem",
                                  color: "#1e293b",
                                }}
                              >
                                CD{driver.id}: {driver.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "#64748b" }}
                              >
                                {driver.englishName}
                              </Typography>
                            </div>
                          </Box>

                          <Chip
                            size="small"
                            label={`Afinidade: ${score} pts`}
                            sx={{
                              bgcolor: "#f1f5f9",
                              fontWeight: 700,
                              color: "#334155",
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#475569",
                            ml: 4,
                            mb: 1.5,
                            lineHeight: 1.5,
                          }}
                        >
                          {driver.shortDescription}
                        </Typography>

                        <Box
                          sx={{
                            ml: 4,
                            p: 1.5,
                            bgcolor: "#ffffff",
                            borderRadius: 2,
                            border: "1px dashed #cbd5e1",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: "#334155",
                              display: "block",
                              mb: 0.5,
                            }}
                          >
                            💡 Por que foi recomendado?
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#64748b", display: "block" }}
                          >
                            Atende diretamente aos objetivos:{" "}
                            {relatedObjectives.join(" • ")}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              },
            )}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveStep(0)}
            >
              Voltar aos Objetivos
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNextFromDrivers}
              sx={{ px: 4, fontWeight: 700 }}
            >
              Ver Técnicas Recomendadas ({selectedDriverIds.length}{" "}
              selecionado(s))
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 3: SELEÇÃO DE TÉCNICAS E MODELOS DE MISSÃO (HU06) */}
      {activeStep === 2 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Etapa 3: Técnicas e Missões
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Marque as técnicas que deseja incluir na sua aula.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {GAME_TECHNIQUES.filter((tech) =>
              selectedDriverIds.includes(tech.driverId),
            ).map((tech) => {
              const driver =
                CORE_DRIVERS.find((d) => d.id === tech.driverId) ||
                CORE_DRIVERS[0];
              const isSelected = selectedTechniqueIds.includes(tech.id);

              return (
                <Grid size={{ xs: 12 }} key={tech.id}>
                  <Card
                    sx={{
                      borderLeft: `6px solid ${driver.color}`,
                      border: isSelected
                        ? `2px solid ${driver.color}`
                        : "1px solid #e2e8f0",
                      bgcolor: isSelected ? "#faf5ff" : "#ffffff",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1.5,
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleTechnique(tech.id)}
                          />
                          <div>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: "#0f172a" }}
                            >
                              {tech.title}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                                mt: 0.5,
                              }}
                            >
                              <Chip
                                size="small"
                                label={`CD${driver.id}: ${driver.name}`}
                                sx={{
                                  bgcolor: driver.color,
                                  color: "#ffffff",
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                }}
                              />
                              {tech.educationLevels.map((lvl) => (
                                <Chip
                                  key={lvl}
                                  size="small"
                                  variant="outlined"
                                  label={lvl}
                                  sx={{ fontSize: "0.68rem" }}
                                />
                              ))}
                            </Box>
                          </div>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: "#475569", ml: 5, mb: 2, lineHeight: 1.6 }}
                      >
                        {tech.description}
                      </Typography>

                      {/* Mission Template Box */}
                      <Box
                        sx={{
                          ml: 5,
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
                          🎯 Exemplo de Missão para Sala de Aula:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#78350f" }}>
                          {tech.missionTemplate}
                        </Typography>
                      </Box>

                      {/* Custom Teacher Note Field */}
                      {isSelected && (
                        <Box sx={{ ml: 5, mt: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Como você pretende aplicar esta técnica em sua aula? (Opcional)"
                            placeholder="Ex: Dividir em grupos de 4 alunos e cronometrar 15 minutos..."
                            value={techniqueNotes[tech.id] || ""}
                            onChange={(e) =>
                              setTechniqueNotes({
                                ...techniqueNotes,
                                [tech.id]: e.target.value,
                              })
                            }
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveStep(1)}
            >
              Voltar aos Core Drivers
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNextFromTechniques}
              sx={{ px: 4, fontWeight: 700 }}
            >
              Finalizar Detalhes ({selectedTechniqueIds.length} técnica(s)
              escolhida(s))
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 4: DETALHES DO PLANO & SALVAMENTO (HU07) */}
      {activeStep === 3 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Etapa 4: Finalização do Plano
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Identifique sua aula ou projeto gamificado e revise as escolhas.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Form Inputs */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#0f172a", mb: 2 }}
                >
                  Informações Gerais da Aula / Projeto
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      label="Título do Plano de Gamificação"
                      placeholder="Ex: Gamificação de Matemática - 6º Ano (Frações Épicas)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Disciplina / Componente Curricular"
                      placeholder="Ex: História, Biologia, Matemática"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Turma / Nível de Ensino"
                      placeholder="Ex: 8º Ano A - Ensino Fundamental"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Descrição Geral ou Roteiro Pedagógico (Opcional)"
                      placeholder="Descreva o contexto da atividade, duração prevista, materiais necessários..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Summary Preview */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                >
                  Resumo do Planejamento
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: "#64748b" }}
                  >
                    Objetivos Selecionados ({selectedObjectiveIds.length}):
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {EDUCATIONAL_OBJECTIVES.filter((o) =>
                      selectedObjectiveIds.includes(o.id),
                    ).map((o) => (
                      <Chip
                        key={o.id}
                        label={o.name}
                        size="small"
                        sx={{ bgcolor: "#e2e8f0", fontSize: "0.72rem" }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: "#64748b" }}
                  >
                    Core Drivers Mapeados ({selectedDriverIds.length}):
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {CORE_DRIVERS.filter((d) =>
                      selectedDriverIds.includes(d.id),
                    ).map((d) => (
                      <Chip
                        key={d.id}
                        label={`CD${d.id}: ${d.name}`}
                        size="small"
                        sx={{
                          bgcolor: d.color,
                          color: "#ffffff",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: "#64748b" }}
                  >
                    Técnicas de Jogos Incorporadas (
                    {selectedTechniqueIds.length}):
                  </Typography>
                  <List dense disablePadding sx={{ mt: 1 }}>
                    {GAME_TECHNIQUES.filter((t) =>
                      selectedTechniqueIds.includes(t.id),
                    ).map((t) => (
                      <ListItem key={t.id} disableGutters sx={{ py: 0.5 }}>
                        <ExtensionIcon
                          sx={{ fontSize: 16, mr: 1, color: "#2563eb" }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {t.title}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveStep(2)}
            >
              Voltar às Técnicas
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSavePlan}
              sx={{ px: 4, py: 1.4, fontWeight: 700 }}
            >
              Salvar Plano no Meu Painel
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default function NovoPlanejamentoPage() {
  return (
    <Suspense
      fallback={
        <Container sx={{ py: 6 }}>
          <Typography>Carregando assistente...</Typography>
        </Container>
      }
    >
      <NovoPlanejamentoContent />
    </Suspense>
  );
}
