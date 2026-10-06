"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import {
  CORE_DRIVERS,
  GAME_TECHNIQUES,
  EDUCATIONAL_OBJECTIVES,
} from "../../lib/octalysis-data";
import { GamificationPlan } from "../../lib/types";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import ExtensionIcon from "@mui/icons-material/Extension";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function PlanosPage() {
  const {
    userPlans,
    plans,
    deletePlan,
    duplicatePlan,
    createOrUpdatePlan,
    currentUser,
  } = useAuth();

  // If user is logged in, show their plans; otherwise show all demo plans
  const activePlans = currentUser ? userPlans : plans;

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedPlanForMenu, setSelectedPlanForMenu] =
    useState<GamificationPlan | null>(null);

  // View Modal
  const [viewModalPlan, setViewModalPlan] = useState<GamificationPlan | null>(
    null,
  );

  // Edit Modal
  const [editModalPlan, setEditModalPlan] = useState<GamificationPlan | null>(
    null,
  );
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editTargetAudience, setEditTargetAudience] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Delete Confirmation Modal
  const [deleteConfirmPlan, setDeleteConfirmPlan] =
    useState<GamificationPlan | null>(null);

  // Feedback toast
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    plan: GamificationPlan,
  ) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedPlanForMenu(plan);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setSelectedPlanForMenu(null);
  };

  const handleDuplicate = () => {
    if (!selectedPlanForMenu) return;
    const duplicated = duplicatePlan(selectedPlanForMenu.id);
    handleCloseMenu();
    if (duplicated) {
      setFeedbackMsg(
        `Plano "${selectedPlanForMenu.title}" duplicado com sucesso!`,
      );
    }
  };

  const handleOpenEdit = () => {
    if (!selectedPlanForMenu) return;
    setEditModalPlan(selectedPlanForMenu);
    setEditTitle(selectedPlanForMenu.title);
    setEditSubject(selectedPlanForMenu.subject);
    setEditTargetAudience(selectedPlanForMenu.targetAudience);
    setEditDescription(selectedPlanForMenu.description || "");
    handleCloseMenu();
  };

  const handleSaveEdit = () => {
    if (!editModalPlan || !editTitle.trim()) return;

    const updated: GamificationPlan = {
      ...editModalPlan,
      title: editTitle.trim(),
      subject: editSubject.trim(),
      targetAudience: editTargetAudience.trim(),
      description: editDescription.trim(),
      updatedAt: new Date().toISOString(),
    };

    createOrUpdatePlan(updated);
    setEditModalPlan(null);
    setFeedbackMsg(`Plano atualizado com sucesso!`);
  };

  const handleOpenDelete = () => {
    if (!selectedPlanForMenu) return;
    setDeleteConfirmPlan(selectedPlanForMenu);
    handleCloseMenu();
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmPlan) return;
    deletePlan(deleteConfirmPlan.id);
    setDeleteConfirmPlan(null);
    setFeedbackMsg("Plano excluído com sucesso.");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <div>
          {/* <Chip */}
          {/*   label="Gerenciamento de Planejamentos (HU07)" */}
          {/*   color="primary" */}
          {/*   size="small" */}
          {/*   sx={{ mb: 1, fontWeight: 700 }} */}
          {/* /> */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, color: "#0f172a" }}
          >
            Meus Planos de Gamificação
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mt: 0.5 }}>
            Consulte, edite, duplique para novas turmas ou exporte seus planos
            de aula baseados no Octalysis.
          </Typography>
        </div>

        <Button
          component={Link}
          href="/planejamento/novo"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{ fontWeight: 700, px: 3 }}
        >
          Criar Novo Plano
        </Button>
      </Box>

      {feedbackMsg && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setFeedbackMsg(null)}
        >
          {feedbackMsg}
        </Alert>
      )}

      {/* Plans Grid */}
      {activePlans.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "#ffffff",
            border: "1px dashed #cbd5e1",
          }}
        >
          <AssignmentIcon sx={{ fontSize: 48, color: "#94a3b8", mb: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
            Nenhum plano de gamificação encontrado
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            Você ainda não criou nenhum plano. Inicie agora mesmo com o nosso
            assistente de gamificação!
          </Typography>
          <Button
            component={Link}
            href="/planejamento/novo"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Começar Meu Primeiro Plano
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {activePlans.map((plan) => {
            return (
              <Grid size={{ xs: 12, md: 6 }} key={plan.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1.5,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          size="small"
                          label={plan.subject}
                          sx={{
                            bgcolor: "#eff6ff",
                            color: "#1d4ed8",
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          size="small"
                          label={plan.targetAudience}
                          variant="outlined"
                          sx={{ fontSize: "0.75rem", borderColor: "#cbd5e1" }}
                        />
                      </Box>

                      <IconButton
                        size="small"
                        onClick={(e) => handleOpenMenu(e, plan)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}
                    >
                      {plan.title}
                    </Typography>

                    {plan.description && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#475569", mb: 2, lineHeight: 1.5 }}
                      >
                        {plan.description}
                      </Typography>
                    )}

                    {/* Core Drivers tags */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#64748b",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Core Drivers Octalysis ({plan.selectedDriverIds.length}):
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      {plan.selectedDriverIds.map((dId) => {
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

                    {/* Techniques count */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#64748b",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Técnicas de Jogos Associadas:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {plan.selectedTechniques.map((st) => {
                        const tech = GAME_TECHNIQUES.find(
                          (t) => t.id === st.techniqueId,
                        );
                        return (
                          <Chip
                            key={st.techniqueId}
                            size="small"
                            icon={<ExtensionIcon style={{ fontSize: 13 }} />}
                            label={tech?.title || st.techniqueId}
                            variant="outlined"
                            sx={{ fontSize: "0.72rem", borderColor: "#e2e8f0" }}
                          />
                        );
                      })}
                    </Box>
                  </CardContent>

                  <Divider />

                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                      Atualizado em:{" "}
                      {new Date(plan.updatedAt).toLocaleDateString("pt-BR")}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => setViewModalPlan(plan)}
                      >
                        Visualizar
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Context Menu for Actions */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            if (selectedPlanForMenu) setViewModalPlan(selectedPlanForMenu);
            handleCloseMenu();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Visualizar Completo</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar Plano</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicar para Nova Turma</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenDelete} sx={{ color: "#ef4444" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "#ef4444" }} />
          </ListItemIcon>
          <ListItemText>Excluir Plano</ListItemText>
        </MenuItem>
      </Menu>

      {/* VIEW PLAN MODAL (HU07 Full View & Print) */}
      <Dialog
        open={Boolean(viewModalPlan)}
        onClose={() => setViewModalPlan(null)}
        maxWidth="md"
        fullWidth
      >
        {viewModalPlan && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#0f172a" }}
                >
                  {viewModalPlan.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b" }}>
                  {viewModalPlan.subject} • {viewModalPlan.targetAudience}
                </Typography>
              </Box>
              <IconButton onClick={() => setViewModalPlan(null)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              {viewModalPlan.description && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, color: "#1e293b" }}
                  >
                    Visão Geral Pedagógica:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#475569", mt: 0.5, lineHeight: 1.6 }}
                  >
                    {viewModalPlan.description}
                  </Typography>
                </Box>
              )}

              {/* Objectives */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}
                >
                  Objetivos de Aprendizagem Selecionados:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {EDUCATIONAL_OBJECTIVES.filter((o) =>
                    viewModalPlan.selectedObjectiveIds.includes(o.id),
                  ).map((obj) => (
                    <Chip
                      key={obj.id}
                      label={`${obj.name} (${obj.category})`}
                      sx={{ bgcolor: "#eff6ff", color: "#1e40af" }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Core Drivers */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}
                >
                  Forças Motivacionais (Core Drivers Octalysis):
                </Typography>
                <Grid container spacing={1.5}>
                  {CORE_DRIVERS.filter((d) =>
                    viewModalPlan.selectedDriverIds.includes(d.id),
                  ).map((driver) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={driver.id}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderLeft: `4px solid ${driver.color}`,
                          bgcolor: "#f8fafc",
                          borderRadius: 1.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: "#0f172a" }}
                        >
                          CD{driver.id}: {driver.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                          {driver.shortDescription}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Techniques and Custom Notes */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 1.5 }}
                >
                  Técnicas de Jogos & Missões Práticas:
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {viewModalPlan.selectedTechniques.map((st, idx) => {
                    const tech = GAME_TECHNIQUES.find(
                      (t) => t.id === st.techniqueId,
                    );
                    const driver = tech
                      ? CORE_DRIVERS.find((d) => d.id === tech.driverId)
                      : null;

                    return (
                      <Paper
                        key={idx}
                        sx={{
                          p: 2,
                          border: "1px solid #e2e8f0",
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <ExtensionIcon
                            sx={{
                              color: driver?.color || "#2563eb",
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: "#0f172a" }}
                          >
                            {tech?.title || st.techniqueId}
                          </Typography>
                          {driver && (
                            <Chip
                              size="small"
                              label={`CD${driver.id}`}
                              sx={{
                                bgcolor: driver.color,
                                color: "#ffffff",
                                fontSize: "0.65rem",
                              }}
                            />
                          )}
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{ color: "#475569", mb: 1 }}
                        >
                          {tech?.summary}
                        </Typography>

                        <Box
                          sx={{
                            p: 1.5,
                            bgcolor: "#fffbeb",
                            borderRadius: 1.5,
                            mb: st.customNotes ? 1 : 0,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: "#92400e",
                              display: "block",
                            }}
                          >
                            Missão Modelo:
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#78350f" }}
                          >
                            {tech?.missionTemplate}
                          </Typography>
                        </Box>

                        {st.customNotes && (
                          <Box
                            sx={{
                              p: 1.5,
                              bgcolor: "#eff6ff",
                              borderRadius: 1.5,
                              mt: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 700,
                                color: "#1e40af",
                                display: "block",
                              }}
                            >
                              Anotações Customizadas do Professor:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#1e3a8a" }}
                            >
                              {st.customNotes}
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    );
                  })}
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                startIcon={<PrintIcon />}
                onClick={handlePrint}
                variant="outlined"
              >
                Imprimir / Exportar PDF
              </Button>
              <Button onClick={() => setViewModalPlan(null)}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* EDIT PLAN MODAL */}
      <Dialog
        open={Boolean(editModalPlan)}
        onClose={() => setEditModalPlan(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          Editar Informações do Plano
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              required
              label="Nome do Plano"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Componente Curricular / Disciplina"
              value={editSubject}
              onChange={(e) => setEditSubject(e.target.value)}
            />
            <TextField
              fullWidth
              label="Turma / Nível de Ensino"
              value={editTargetAudience}
              onChange={(e) => setEditTargetAudience(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descrição Geral"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditModalPlan(null)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={Boolean(deleteConfirmPlan)}
        onClose={() => setDeleteConfirmPlan(null)}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Excluir Planejamento?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#475569" }}>
            Tem certeza que deseja excluir o plano{" "}
            <strong>&quot;{deleteConfirmPlan?.title}&quot;</strong>? Esta ação
            não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmPlan(null)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Sim, Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
