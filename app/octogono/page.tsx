"use client";

import React, { useState } from "react";
import { CORE_DRIVERS } from "../../lib/octalysis-data";
import OctagonVisualizer from "../../components/OctagonVisualizer";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExtensionIcon from "@mui/icons-material/Extension";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default function OctogonoPage() {
  const [selectedDriverId, setSelectedDriverId] = useState<number>(1);
  const [tabFilter, setTabFilter] = useState<string>("all");

  const selectedDriver =
    CORE_DRIVERS.find((d) => d.id === selectedDriverId) || CORE_DRIVERS[0];

  const filteredDrivers = CORE_DRIVERS.filter((d) => {
    if (tabFilter === "white") return d.hat === "white";
    if (tabFilter === "black") return d.hat === "black";
    if (tabFilter === "left") return d.hemisphere === "left";
    if (tabFilter === "right") return d.hemisphere === "right";
    return true;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center", maxWidth: 840, mx: "auto" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}
        >
          8 Core Drivers
        </Typography>
        <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.6 }}>
          Explore as 8 forças motivacionais do framework Octalysis.
        </Typography>
      </Box>

      {/* Interactive Octagon Component (HU03) */}
      <Box sx={{ mb: 6 }}>
        <OctagonVisualizer
          selectedDriverId={selectedDriverId}
          onSelectDriver={(driver) => setSelectedDriverId(driver.id)}
        />
      </Box>

      {/* Grid of All 8 Core Drivers with quick filters */}
      <Box sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <div>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Catálogo Completo dos Core Drivers
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Filtrar por dimensões motivacionais do framework
            </Typography>
          </div>

          <Tabs
            value={tabFilter}
            onChange={(_, val) => setTabFilter(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ bgcolor: "#f1f5f9", borderRadius: 2, p: 0.5 }}
          >
            <Tab
              value="all"
              label="Todos (8)"
              sx={{ fontWeight: 600, minHeight: 40 }}
            />
            <Tab
              value="white"
              label="White Hat (Positivo)"
              sx={{ fontWeight: 600, minHeight: 40 }}
            />
            <Tab
              value="black"
              label="Black Hat (Urgência)"
              sx={{ fontWeight: 600, minHeight: 40 }}
            />
            <Tab
              value="left"
              label="Cérebro Esquerdo (Lógica)"
              sx={{ fontWeight: 600, minHeight: 40 }}
            />
            <Tab
              value="right"
              label="Cérebro Direito (Criatividade)"
              sx={{ fontWeight: 600, minHeight: 40 }}
            />
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {filteredDrivers.map((driver) => {
            const isSelected = selectedDriverId === driver.id;
            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={driver.id}>
                <Card
                  onClick={() => setSelectedDriverId(driver.id)}
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderTop: `5px solid ${driver.color}`,
                    borderColor: isSelected ? driver.color : "#e2e8f0",
                    transform: isSelected ? "translateY(-4px)" : "none",
                    boxShadow: isSelected
                      ? `0 12px 25px ${driver.color}25`
                      : undefined,
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Chip
                        size="small"
                        label={`CD${driver.id}`}
                        sx={{
                          bgcolor: driver.color,
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        size="small"
                        variant="outlined"
                        label={
                          driver.hat === "white" ? "White Hat" : "Black Hat"
                        }
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1e293b",
                        mb: 0.5,
                        fontSize: "1.05rem",
                      }}
                    >
                      {driver.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#64748b", display: "block", mb: 1.5 }}
                    >
                      {driver.englishName}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "#475569", lineHeight: 1.5, mb: 2 }}
                    >
                      {driver.shortDescription}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mt: "auto",
                      }}
                    >
                      {driver.keywords.map((kw) => (
                        <Chip
                          key={kw}
                          label={kw}
                          size="small"
                          sx={{ fontSize: "0.68rem", bgcolor: "#f8fafc" }}
                        />
                      ))}
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
                    <Button
                      component={Link}
                      href={`/tecnicas?driver=${driver.id}`}
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<ExtensionIcon />}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Técnicas
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}
