"use client";

import React from "react";
import Link from "next/link";
import OctagonVisualizer from "../components/OctagonVisualizer";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HexagonIcon from "@mui/icons-material/Hexagon";
import ExtensionIcon from "@mui/icons-material/Extension";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HomePage() {
  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          color: "#ffffff",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              bgcolor: "rgba(255,255,255,0.15)",
              borderRadius: 5,
              mb: 3,
            }}
          >
            <SchoolIcon sx={{ fontSize: 18, color: "#fef08a" }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Gamificação para a Educação
            </Typography>
          </Box>

          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 800, lineHeight: 1.15, mb: 3 }}
          >
            Planeje Aulas Memoráveis
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#e0e7ff",
              fontWeight: 400,
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            Crie missões engajadoras utilizando as 8 forças motivacionais do
            framework Octalysis. Vá além de pontos e rankings.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              href="/planejamento/novo"
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              sx={{
                bgcolor: "#f59e0b",
                color: "#0f172a",
                fontWeight: 800,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#d97706" },
              }}
            >
              Aplicar na Minha Aula
            </Button>

            <Button
              component={Link}
              href="/octogono"
              variant="outlined"
              size="large"
              startIcon={<HexagonIcon />}
              sx={{
                borderColor: "rgba(255,255,255,0.7)",
                color: "#ffffff",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#ffffff",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Explorar Core Drivers
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Interactive Octagon Showcase (HU03) */}
      <Container maxWidth="xl" sx={{ mt: 4, position: "relative", zIndex: 10 }}>
        <Card
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 3,
            boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
            bgcolor: "#ffffff",
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
              O Octógono das Forças Motivacionais
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#64748b", maxWidth: 600, mx: "auto", mt: 1 }}
            >
              Clique nos segmentos para inspecionar cada força motivacional e
              descobrir como aplicá-la em sala de aula.
            </Typography>
          </Box>

          <OctagonVisualizer interactive={true} />
        </Card>
      </Container>

      {/* Feature Navigation Cards */}
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                p: 1,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "#eff6ff",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <HexagonIcon fontSize="medium" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  8 Core Drivers
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", lineHeight: 1.5 }}
                >
                  Conheça os fatores de motivação que geram engajamento real.
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, textAlign: "center" }}>
                <Button
                  component={Link}
                  href="/octogono"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 600 }}
                >
                  Acessar
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                p: 1,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "#fdf2f8",
                    color: "#ec4899",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <ExtensionIcon fontSize="medium" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Técnicas de Jogos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", lineHeight: 1.5 }}
                >
                  Mecânicas pedagógicas prontas para usar.
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, textAlign: "center" }}>
                <Button
                  component={Link}
                  href="/tecnicas"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 600, color: "#ec4899" }}
                >
                  Ver Mais
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                p: 1,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "#fffbeb",
                    color: "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <AutoAwesomeIcon fontSize="medium" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Assistente Guiado
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", lineHeight: 1.5 }}
                >
                  Receba recomendações para os seus objetivos.
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, textAlign: "center" }}>
                <Button
                  component={Link}
                  href="/planejamento/novo"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 600, color: "#f59e0b" }}
                >
                  Criar Plano
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                p: 1,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "#f0fdf4",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <CloudUploadIcon fontSize="medium" />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Recursos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", lineHeight: 1.5 }}
                >
                  Acesse e compartilhe materiais com a comunidade.
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, textAlign: "center" }}>
                <Button
                  component={Link}
                  href="/recursos"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 600, color: "#10b981" }}
                >
                  Acessar
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
