"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { errorMessage } from "../../../lib/api-client";
import {
  countTechniqueActivities,
  filterActivities,
  findDriver,
  getRecommendationsForObjectives,
  techniqueUsesLearningObject,
} from "../../../lib/octalysis";
import { GamificationPlan, OctalysisContent } from "../../../lib/types";
import {
  EMPTY_ACTIVITY_FILTER,
  isActivityFilterActive,
} from "../../../lib/activity-filter";
import {
  EMPTY_PLAN_DRAFT,
  PlanDraft,
  clearPlanDraft,
  draftFromPlan,
  hasDraftProgress,
  useStoredPlanDraft,
  savePlanDraft,
} from "../../../lib/plan-draft";
import { useToast } from "../../../context/ToastContext";
import ActivityFilterBar from "../../../components/ActivityFilterBar";
import ActivityList from "../../../components/ActivityList";
import ContentLoading from "../../../components/ContentLoading";
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
  StepButton,
  Checkbox,
  Chip,
  TextField,
  Alert,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExtensionIcon from "@mui/icons-material/Extension";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from "@mui/icons-material/Science";

const STEPS = [
  "Definir Objetivos Educacionais",
  "Core Drivers Recomendados",
  "Selecionar Técnicas",
  "Estruturar e Salvar Plano",
];

// Remove do rascunho escolhas que não existem mais no conteúdo do banco.
function withValidSelections(draft: PlanDraft, content: OctalysisContent): PlanDraft {
  const objectiveIds = new Set(content.objectives.map((o) => o.id));
  const driverIds = new Set(content.coreDrivers.map((d) => d.id));
  const techniqueIds = new Set(content.techniques.map((t) => t.id));
  return {
    ...draft,
    selectedObjectiveIds: draft.selectedObjectiveIds.filter((id) => objectiveIds.has(id)),
    selectedDriverIds: draft.selectedDriverIds.filter((id) => driverIds.has(id)),
    selectedTechniqueIds: draft.selectedTechniqueIds.filter((id) => techniqueIds.has(id)),
  };
}

function withUrlSelections(
  draft: PlanDraft,
  driverParam: string | null,
  techniqueParam: string | null,
): PlanDraft {
  const driverId = driverParam ? parseInt(driverParam, 10) : NaN;
  return {
    ...draft,
    selectedDriverIds:
      isNaN(driverId) || draft.selectedDriverIds.includes(driverId)
        ? draft.selectedDriverIds
        : [...draft.selectedDriverIds, driverId],
    selectedTechniqueIds:
      !techniqueParam || draft.selectedTechniqueIds.includes(techniqueParam)
        ? draft.selectedTechniqueIds
        : [...draft.selectedTechniqueIds, techniqueParam],
  };
}

function NovoPlanejamentoContent({
  content,
  initialDraft,
  editingPlan,
}: {
  content: OctalysisContent;
  initialDraft: PlanDraft;
  editingPlan?: GamificationPlan;
}) {
  const router = useRouter();

  const { savePlan } = useAuth();
  const { showToast } = useToast();

  const [activeStep, setActiveStep] = useState(initialDraft.activeStep);
  const [activityFilter, setActivityFilter] = useState(EMPTY_ACTIVITY_FILTER);

  // Form State
  const [selectedObjectiveIds, setSelectedObjectiveIds] = useState<string[]>(
    initialDraft.selectedObjectiveIds,
  );
  const [selectedDriverIds, setSelectedDriverIds] = useState<number[]>(
    initialDraft.selectedDriverIds,
  );
  const [selectedTechniqueIds, setSelectedTechniqueIds] = useState<string[]>(
    initialDraft.selectedTechniqueIds,
  );
  const [techniqueNotes, setTechniqueNotes] = useState<Record<string, string>>(
    initialDraft.techniqueNotes,
  );

  // Plan Meta
  const [title, setTitle] = useState(initialDraft.title);
  const [subject, setSubject] = useState(initialDraft.subject);
  const [targetAudience, setTargetAudience] = useState(
    initialDraft.targetAudience,
  );
  const [description, setDescription] = useState(initialDraft.description);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Recommendations calculated dynamically
  const recommendations = getRecommendationsForObjectives(
    content,
    selectedObjectiveIds,
  );

  const applyDraft = (draft: PlanDraft) => {
    setActiveStep(draft.activeStep);
    setSelectedObjectiveIds(draft.selectedObjectiveIds);
    setSelectedDriverIds(draft.selectedDriverIds);
    setSelectedTechniqueIds(draft.selectedTechniqueIds);
    setTechniqueNotes(draft.techniqueNotes);
    setTitle(draft.title);
    setSubject(draft.subject);
    setTargetAudience(draft.targetAudience);
    setDescription(draft.description);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  useEffect(() => {
    if (editingPlan) return;
    savePlanDraft({
      activeStep,
      selectedObjectiveIds,
      selectedDriverIds,
      selectedTechniqueIds,
      techniqueNotes,
      title,
      subject,
      targetAudience,
      description,
    });
  }, [
    editingPlan,
    activeStep,
    selectedObjectiveIds,
    selectedDriverIds,
    selectedTechniqueIds,
    techniqueNotes,
    title,
    subject,
    targetAudience,
    description,
  ]);

  const hasProgress = hasDraftProgress({
    ...EMPTY_PLAN_DRAFT,
    selectedObjectiveIds,
    selectedDriverIds,
    selectedTechniqueIds,
    title,
    subject,
  });

  const handleDiscardDraft = () => {
    if (!confirm("Descartar as escolhas deste plano e recomeçar?")) return;
    clearPlanDraft();
    applyDraft(EMPTY_PLAN_DRAFT);
    setActivityFilter(EMPTY_ACTIVITY_FILTER);
    setErrorMsg(null);
  };

  const selectedBlackHatDrivers = content.coreDrivers.filter(
    (d) => d.hat === "black" && selectedDriverIds.includes(d.id),
  );

  const canReachStep = (step: number) =>
    [
      true,
      selectedObjectiveIds.length > 0,
      selectedObjectiveIds.length > 0 && selectedDriverIds.length > 0,
      selectedObjectiveIds.length > 0 &&
        selectedDriverIds.length > 0 &&
        selectedTechniqueIds.length > 0,
    ][step];

  const goToStep = (step: number) => {
    if (step === activeStep) return;
    if (step < activeStep) {
      setErrorMsg(null);
      setActiveStep(step);
      return;
    }
    if (step === 1) handleNextFromObjectives();
    if (step === 2) handleNextFromDrivers();
    if (step === 3) handleNextFromTechniques();
  };

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

    // Sem técnicas escolhidas, sugere a primeira técnica de cada Core Drive (até 3).
    if (selectedTechniqueIds.length === 0) {
      const suggestedTechIds = selectedDriverIds
        .map((driverId) => content.techniques.find((t) => t.driverId === driverId))
        .filter((t) => t !== undefined)
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

  const handleSavePlan = async () => {
    if (!title.trim()) {
      setErrorMsg(
        'O nome do plano é obrigatório (ex: "Dojo de TDD e Mutação - Turma A").',
      );
      return;
    }
    if (!subject.trim()) {
      setErrorMsg("A disciplina / módulo é obrigatória.");
      return;
    }

    setSaving(true);
    try {
      await savePlan(
        {
          title: title.trim(),
          subject: subject.trim(),
          targetAudience: targetAudience.trim() || "Graduação em Computação",
          description: description.trim(),
          selectedObjectiveIds,
          selectedDriverIds,
          selectedTechniques: selectedTechniqueIds.map((tId) => ({
            techniqueId: tId,
            customNotes: techniqueNotes[tId] || "",
          })),
        },
        editingPlan?.id,
      );
    } catch (error) {
      showToast(
        errorMessage(error, "Não foi possível salvar o plano. Tente novamente."),
        "error",
      );
      setSaving(false);
      return;
    }

    if (editingPlan) {
      showToast("Alterações salvas!");
    } else {
      clearPlanDraft();
      showToast("Plano salvo!");
    }
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
          {editingPlan ? "Editar Planejamento" : "Novo Planejamento"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#475569" }}>
          {editingPlan
            ? editingPlan.title
            : "Crie atividades envolventes baseadas nos 8 Core Drivers do Octalysis."}
        </Typography>
        {editingPlan ? (
          <Button
            size="small"
            color="inherit"
            onClick={() => router.push("/planos")}
            sx={{ mt: 1.5, color: "#64748b" }}
          >
            Cancelar edição
          </Button>
        ) : hasProgress && (
          <Button
            size="small"
            color="inherit"
            onClick={handleDiscardDraft}
            sx={{ mt: 1.5, color: "#64748b" }}
          >
            Descartar e recomeçar
          </Button>
        )}
      </Box>

      {/* Stepper Header */}
      <Box sx={{ mb: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel nonLinear>
          {STEPS.map((label, index) => (
            <Step key={label} completed={index < activeStep}>
              <StepButton
                onClick={() => goToStep(index)}
                disabled={!canReachStep(index)}
              >
                {label}
              </StepButton>
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
            {content.objectives.map((obj) => {
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
                            onClick={(e) => e.stopPropagation()}
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
                          flexWrap: "wrap",
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
                          const driver = findDriver(content, dId);
                          return (
                            <Chip
                              key={dId}
                              size="small"
                              label={`CD${dId}: ${driver?.name}`}
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

                      <Accordion
                        disableGutters
                        elevation={0}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          ml: 4,
                          mt: 1.5,
                          bgcolor: "transparent",
                          "&::before": { display: "none" },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ px: 0, minHeight: 0 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#2563eb" }}
                          >
                            Por que esses Core Drives?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0, pt: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#475569", lineHeight: 1.6 }}
                          >
                            {obj.rationale}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
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
                  {content.objectives.filter((o) =>
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
                              onClick={(e) => e.stopPropagation()}
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
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {driver.description}
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

          {selectedBlackHatDrivers.length > 0 && (
            <Alert severity="warning" role="note" sx={{ mt: 3, borderRadius: 2 }}>
              <strong>
                Black Hat:{" "}
                {selectedBlackHatDrivers.map((d) => `CD${d.id}`).join(", ")}
              </strong>
              . Esses Core Drivers motivam pela urgência, pela surpresa ou pelo
              medo de perder. Use com moderação e equilibre com Core Drivers
              White Hat.
            </Alert>
          )}

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
              Etapa 3: Técnicas
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Marque as técnicas que deseja incluir na sua aula.
            </Typography>
          </Box>

          <Paper
            sx={{ p: 2, mb: 3, borderRadius: 3, border: "1px solid #e2e8f0" }}
            elevation={0}
          >
            <ActivityFilterBar
              filter={activityFilter}
              onChange={setActivityFilter}
            />
          </Paper>

          <Grid container spacing={3}>
            {content.techniques.filter((tech) =>
              selectedDriverIds.includes(tech.driverId),
            ).map((tech) => {
              const driver =
                findDriver(content, tech.driverId) ?? content.coreDrivers[0];
              const isSelected = selectedTechniqueIds.includes(tech.id);
              const { total, matching } = countTechniqueActivities(
                tech,
                activityFilter,
              );

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
                              {techniqueUsesLearningObject(tech) && (
                                <Chip
                                  size="small"
                                  icon={<ScienceIcon sx={{ fontSize: 15 }} />}
                                  label="Objeto de Aprendizagem"
                                  sx={{
                                    bgcolor: "#fef9c3",
                                    color: "#713f12",
                                    border: "1px solid #eab308",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                  }}
                                />
                              )}
                              {tech.testingFocus.map((focus) => (
                                <Chip
                                  key={focus}
                                  size="small"
                                  variant="outlined"
                                  label={focus}
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

                      {total > 0 && (
                        <Accordion
                          disableGutters
                          elevation={0}
                          sx={{
                            ml: 5,
                            mb: 2,
                            bgcolor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            borderRadius: 2,
                            "&::before": { display: "none" },
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                              Atividades (
                              {isActivityFilterActive(activityFilter)
                                ? `${matching} de ${total}`
                                : total}
                              )
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <ActivityList
                              activities={filterActivities(tech, activityFilter)}
                            />
                          </AccordionDetails>
                        </Accordion>
                      )}

                      {/* Custom Teacher Note Field */}
                      {isSelected && (
                        <Box sx={{ ml: 5, mt: 2 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Como você pretende aplicar esta técnica na aula de Testes? (Opcional)"
                            placeholder="Ex: Dividir em duplas para Pair Testing de 20 minutos usando Vitest/JUnit..."
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
                      placeholder="Ex: Dojo de TDD e Mutação - Engenharia de Software"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Disciplina / Módulo"
                      placeholder="Ex: Teste e Qualidade de Software, Engenharia de Software II"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Turma / Perfil dos Alunos"
                      placeholder="Ex: 5º Período - Ciência da Computação"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Descrição Geral ou Roteiro do Laboratório (Opcional)"
                      placeholder="Descreva o contexto da aula prática, ferramentas de teste utilizadas, repositório base..."
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
                    {content.objectives.filter((o) =>
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
                    {content.coreDrivers.filter((d) =>
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
                    {content.techniques.filter((t) =>
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
              disabled={saving}
              sx={{ px: 4, py: 1.4, fontWeight: 700 }}
            >
              {saving
                ? "Salvando..."
                : editingPlan
                  ? "Salvar Alterações"
                  : "Salvar Plano no Meu Painel"}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

function LoadingPlanner() {
  return <ContentLoading message="Carregando assistente..." />;
}

function NovoPlanejamentoLoader() {
  const searchParams = useSearchParams();
  const storedDraft = useStoredPlanDraft();
  const { plans, loading, content } = useAuth();
  const editId = searchParams.get("editar");

  if (loading || !content) return <LoadingPlanner />;

  if (editId) {
    const plan = plans.find((p) => p.id === editId);
    if (!plan) {
      return (
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Plano não encontrado.
          </Typography>
          <Button component={Link} href="/planos" variant="contained">
            Ver meus planos
          </Button>
        </Container>
      );
    }
    return (
      <NovoPlanejamentoContent
        key={plan.id}
        content={content}
        initialDraft={withValidSelections(draftFromPlan(plan), content)}
        editingPlan={plan}
      />
    );
  }

  if (storedDraft === undefined) return <LoadingPlanner />;

  return (
    <NovoPlanejamentoContent
      key="novo"
      content={content}
      initialDraft={withValidSelections(
        withUrlSelections(
          storedDraft ?? EMPTY_PLAN_DRAFT,
          searchParams.get("driver"),
          searchParams.get("technique"),
        ),
        content,
      )}
    />
  );
}

export default function NovoPlanejamentoPage() {
  return (
    <Suspense fallback={<LoadingPlanner />}>
      <NovoPlanejamentoLoader />
    </Suspense>
  );
}
