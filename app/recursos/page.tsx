"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { CORE_DRIVERS, GAME_TECHNIQUES } from "../../lib/octalysis-data";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  IconButton,
  RadioGroup,
  Radio,
  FormLabel,
  Paper,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkIcon from "@mui/icons-material/Link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import ExtensionIcon from "@mui/icons-material/Extension";

function RecursosContent() {
  const searchParams = useSearchParams();
  const initialTechniqueParam = searchParams.get("technique");

  const { resources, addResource, currentUser } = useAuth();

  const [techniqueFilter, setTechniqueFilter] = useState<string>(
    initialTechniqueParam || "all",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techniqueId, setTechniqueId] = useState(
    initialTechniqueParam || GAME_TECHNIQUES[0].id,
  );
  const [resourceType, setResourceType] = useState<"link" | "file">("link");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileData, setFileData] = useState<string | undefined>(undefined);
  const [isPublic, setIsPublic] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileData(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenModal = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setFileName("");
    setFileSize("");
    setFileData(undefined);
    setIsPublic(true);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Informe um título para o material ou exemplo.");
      return;
    }

    if (resourceType === "link" && !url.trim()) {
      setFormError(
        "Por favor, informe a URL do recurso (ex: Google Drive, YouTube, Miro).",
      );
      return;
    }

    if (resourceType === "file" && !fileName) {
      setFormError(
        "Por favor, selecione um arquivo (PDF ou imagem) para upload.",
      );
      return;
    }

    addResource({
      techniqueId,
      title: title.trim(),
      description: description.trim(),
      type: resourceType,
      url: resourceType === "link" ? url.trim() : undefined,
      fileName: resourceType === "file" ? fileName : undefined,
      fileSize: resourceType === "file" ? fileSize : undefined,
      fileData: resourceType === "file" ? fileData : undefined,
      isPublic,
    });

    setModalOpen(false);
    showToast("Exemplo adicionado!");
  };

  // Filter items
  const filteredResources = resources.filter((res) => {
    if (techniqueFilter !== "all" && res.techniqueId !== techniqueFilter) {
      return false;
    }
    // Only show private items if created by the current user
    if (!res.isPublic && currentUser && res.userId !== currentUser.id) {
      return false;
    }
    return true;
  });

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
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, color: "#0f172a" }}
          >
            Recursos e Exemplos
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mt: 0.5 }}>
            Compartilhe e consulte materiais da comunidade.
          </Typography>
        </div>

        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={handleOpenModal}
          sx={{ fontWeight: 700, px: 3 }}
        >
          Fazer Upload de Exemplo
        </Button>
      </Box>

      {/* Filter by Technique */}
      <Card
        sx={{
          p: 2.5,
          mb: 4,
          borderRadius: 3,
          border: "1px solid #e2e8f0",
          bgcolor: "#ffffff",
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="filter-tech-label">
                Filtrar por Técnica de Jogo
              </InputLabel>
              <Select
                labelId="filter-tech-label"
                value={techniqueFilter}
                label="Filtrar por Técnica de Jogo"
                onChange={(e) => setTechniqueFilter(e.target.value)}
              >
                <MenuItem value="all">Todas as Técnicas</MenuItem>
                {GAME_TECHNIQUES.map((tech) => (
                  <MenuItem key={tech.id} value={tech.id}>
                    CD{tech.driverId} - {tech.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Exibindo <strong>{filteredResources.length}</strong> material(is)
              compartilhado(s).
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {filteredResources.length === 0 && (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #cbd5e1",
            boxShadow: "none",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: "#94a3b8", mb: 1.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
            Nenhum material por aqui ainda
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", mb: 3 }}>
            {techniqueFilter === "all"
              ? "Seja o primeiro a compartilhar um exemplo com a comunidade."
              : "Ainda não há materiais para esta técnica."}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {techniqueFilter !== "all" && (
              <Button variant="outlined" onClick={() => setTechniqueFilter("all")}>
                Ver todos
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleOpenModal}
            >
              Fazer upload de exemplo
            </Button>
          </Box>
        </Card>
      )}

      {/* Resources Cards Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((res) => {
          const tech = GAME_TECHNIQUES.find((t) => t.id === res.techniqueId);
          const driver = tech
            ? CORE_DRIVERS.find((d) => d.id === tech.driverId)
            : null;

          return (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={res.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  borderLeft: driver
                    ? `5px solid ${driver.color}`
                    : "5px solid #2563eb",
                }}
              >
                <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Chip
                      size="small"
                      icon={
                        res.type === "file" ? (
                          <PictureAsPdfIcon style={{ fontSize: 14 }} />
                        ) : (
                          <LinkIcon style={{ fontSize: 14 }} />
                        )
                      }
                      label={
                        res.type === "file" ? "Arquivo Anexo" : "Link Externo"
                      }
                      sx={{
                        bgcolor: "#f1f5f9",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    />

                    <Chip
                      size="small"
                      icon={
                        res.isPublic ? (
                          <PublicIcon style={{ fontSize: 12 }} />
                        ) : (
                          <LockIcon style={{ fontSize: 12 }} />
                        )
                      }
                      label={res.isPublic ? "Público" : "Privado"}
                      color={res.isPublic ? "success" : "default"}
                      variant="outlined"
                      sx={{ fontSize: "0.68rem" }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0f172a",
                      mb: 0.5,
                      fontSize: "1.05rem",
                    }}
                  >
                    {res.title}
                  </Typography>

                  {tech && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 1.5,
                      }}
                    >
                      <ExtensionIcon
                        sx={{ fontSize: 14, color: driver?.color || "#2563eb" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "#64748b", fontWeight: 600 }}
                      >
                        {tech.title} (CD{tech.driverId})
                      </Typography>
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{ color: "#475569", mb: 2, lineHeight: 1.5 }}
                  >
                    {res.description}
                  </Typography>

                  {res.fileName && (
                    <Paper
                      sx={{
                        p: 1.5,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                        border: "1px dashed #cbd5e1",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: "#1e293b",
                          display: "block",
                        }}
                      >
                        📄 {res.fileName}
                      </Typography>
                      {res.fileSize && (
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          Tamanho: {res.fileSize}
                        </Typography>
                      )}
                    </Paper>
                  )}
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
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Por: <strong>{res.authorName}</strong>
                  </Typography>

                  {res.type === "link" && res.url && (
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      component="a"
                      href={res.url}
                      target="_blank"
                    >
                      Acessar Link
                    </Button>
                  )}

                  {res.type === "file" && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() =>
                        alert(`Simulação: Baixando arquivo ${res.fileName}`)
                      }
                    >
                      Baixar Arquivo
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* UPLOAD / SHARE MODAL (HU08) */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Compartilhar Exemplo ou Material
          </Typography>
          <IconButton size="small" onClick={() => setModalOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent dividers>
            {formError && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {formError}
              </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                fullWidth
                required
                label="Título do Material / Exemplo"
                placeholder="Ex: Roteiro da Batalha contra o Boss de Frações"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="tech-select-label">
                  Técnica de Jogo Associada
                </InputLabel>
                <Select
                  labelId="tech-select-label"
                  value={techniqueId}
                  label="Técnica de Jogo Associada"
                  onChange={(e) => setTechniqueId(e.target.value)}
                >
                  {GAME_TECHNIQUES.map((tech) => (
                    <MenuItem key={tech.id} value={tech.id}>
                      CD{tech.driverId} - {tech.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descrição ou Dica de Aplicação"
                placeholder="Explique como os professores podem usar este material com seus alunos..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ fontWeight: 600, color: "#1e293b", mb: 0.5 }}
                >
                  Tipo de Compartilhamento
                </FormLabel>
                <RadioGroup
                  row
                  value={resourceType}
                  onChange={(e) =>
                    setResourceType(e.target.value as "link" | "file")
                  }
                >
                  <FormControlLabel
                    value="link"
                    control={<Radio />}
                    label="Link (Google Drive, Miro, YouTube)"
                  />
                  <FormControlLabel
                    value="file"
                    control={<Radio />}
                    label="Upload de Arquivo (PDF, Imagem)"
                  />
                </RadioGroup>
              </FormControl>

              {resourceType === "link" ? (
                <TextField
                  fullWidth
                  required
                  label="URL do Recurso"
                  placeholder="https://drive.google.com/... ou https://view.genial.ly/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              ) : (
                <Box
                  sx={{
                    p: 2.5,
                    border: "2px dashed #cbd5e1",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <input
                    type="file"
                    id="file-upload-input"
                    accept=".pdf,image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload-input">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Selecionar Arquivo PDF ou Imagem
                    </Button>
                  </label>
                  {fileName && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 1.5, fontWeight: 600, color: "#10b981" }}
                    >
                      Selecionado: {fileName} ({fileSize})
                    </Typography>
                  )}
                </Box>
              )}

              <FormControlLabel
                control={
                  <Switch
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  isPublic
                    ? "Disponível publicamente para outros professores da comunidade"
                    : "Privado (visível apenas para você)"
                }
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar e Compartilhar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}

export default function RecursosPage() {
  return (
    <Suspense
      fallback={
        <Container sx={{ py: 6 }}>
          <Typography>Carregando banco de recursos...</Typography>
        </Container>
      }
    >
      <RecursosContent />
    </Suspense>
  );
}
