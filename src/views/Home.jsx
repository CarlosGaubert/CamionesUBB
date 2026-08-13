import React, { useEffect, useState } from "react";
import MaterialDatatable from "material-datatable";
import Axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckMoving,
  faUsers,
  faExclamationTriangle,
  faWrench,
  faPlus,
  faGasPump,
  faRoute,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerBanner: {
    background:
      theme.palette.type === "dark"
        ? "linear-gradient(135deg, #242424 0%, #181818 100%)"
        : "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
    color: "#ffffff",
    padding: theme.spacing(3.5, 4),
    borderRadius: 16,
    marginBottom: theme.spacing(3.5),
    boxShadow:
      theme.palette.type === "dark"
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.4)"
        : "0 10px 15px -3px rgba(37, 99, 235, 0.25)",
    border: theme.palette.type === "dark" ? "1px solid #2e2e2e" : "none",
  },
  bannerTitle: {
    fontWeight: 800,
    fontSize: "1.75rem",
    letterSpacing: "-0.02em",
    color: "#ffffff",
    marginBottom: theme.spacing(0.5),
  },
  bannerSubtitle: {
    color:
      theme.palette.type === "dark"
        ? "#94a3b8"
        : "rgba(255, 255, 255, 0.85)",
    fontSize: "0.95rem",
  },
  kpiCard: {
    padding: theme.spacing(2.5),
    borderRadius: 14,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.type === "dark" 
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.4)" 
      : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: theme.palette.type === "dark"
        ? "0 10px 20px -5px rgba(0, 0, 0, 0.6)"
        : "0 10px 20px -5px rgba(0, 0, 0, 0.08)",
      borderColor: theme.palette.primary.main,
    },
  },
  kpiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
  },
  kpiValue: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: theme.palette.text.primary,
    lineHeight: 1.2,
  },
  kpiLabel: {
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  quickActionsPaper: {
    padding: theme.spacing(2.5, 3),
    borderRadius: 14,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3.5),
  },
  quickActionBtn: {
    borderRadius: 10,
    padding: "8px 16px",
    fontWeight: 600,
    fontSize: "0.85rem",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.type === "dark" ? "#0f172a" : "#f8fafc",
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.type === "dark" ? "#1e293b" : "#e2e8f0",
      color: theme.palette.text.primary,
    },
  },
  tableCard: {
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.type === "dark"
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.4)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DashboardHome() {
  const classes = useStyles();
  const theme = useTheme();
  const isDark = theme.palette.type === "dark";
  const [choferesItem, setChoferesItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarChoferes();
  }, []);

  const cargarChoferes = async () => {
    try {
      const { data } = await Axios.get("/api/chofer/avisoLicencia/");
      if (data && Array.isArray(data.data)) {
        setChoferesItem(data.data);
      } else if (Array.isArray(data)) {
        setChoferesItem(data);
      }
    } catch (error) {
      console.warn("API de choferes no disponible en este momento:", error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    filter: true,
    selectableRows: false,
    responsive: "scroll",
    rowsPerPage: 10,
    textLabels: {
      body: {
        noMatch: loading ? "Cargando registros..." : "No se encontraron conductores con alertas de licencia",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar conductor",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Columnas visibles",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "Filtros aplicados",
        reset: "Restablecer",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
    },
  };

  const columns = [
    {
      name: "RUT",
      field: "RUT_EMPLEADO",
    },
    {
      name: "Nombre",
      field: "NOMBRE_EMPLEADO",
    },
    {
      name: "Apellido Paterno",
      field: "APELLIDO_EMPLEADO",
    },
    {
      name: "Apellido Materno",
      field: "APELLIDO_EMPLEADO2",
    },
    {
      name: "Control Licencia",
      field: "FECHA_CONTROL_LICENCIA",
    },
  ];

  return (
    <div className={classes.root}>
      {/* Header Banner */}
      <div className={classes.headerBanner}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className={classes.bannerTitle}>
              Panel de Control y Flota
            </Typography>
            <Typography variant="body1" className={classes.bannerSubtitle}>
              Monitoreo operativo, control de conductores y seguimiento de flota en tiempo real.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "right", marginTop: "8px" }}>
            <Button
              variant="contained"
              component={Link}
              to="/viajes/efectuarviaje"
              startIcon={<FontAwesomeIcon icon={faRoute} />}
              style={{
                fontWeight: 600,
                padding: "10px 20px",
                backgroundColor: isDark ? "#3b82f6" : "#ffffff",
                color: isDark ? "#ffffff" : "#1d4ed8",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              Nuevo Viaje
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* KPI Cards */}
      <Grid container spacing={3} style={{ marginBottom: 28 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.kpiCard}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography className={classes.kpiLabel}>Flota Registrada</Typography>
                <Typography className={classes.kpiValue}>Activa</Typography>
              </Box>
              <div
                className={classes.kpiIconBox}
                style={{
                  backgroundColor: isDark ? "rgba(59, 130, 246, 0.15)" : "#eff6ff",
                  color: isDark ? "#60a5fa" : "#2563eb",
                }}
              >
                <FontAwesomeIcon icon={faTruckMoving} />
              </div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.kpiCard}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography className={classes.kpiLabel}>Conductores</Typography>
                <Typography className={classes.kpiValue}>Nómina</Typography>
              </Box>
              <div
                className={classes.kpiIconBox}
                style={{
                  backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5",
                  color: isDark ? "#34d399" : "#059669",
                }}
              >
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.kpiCard}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography className={classes.kpiLabel}>Alertas de Licencia</Typography>
                <Typography
                  className={classes.kpiValue}
                  style={{
                    color: choferesItem.length > 0 ? (isDark ? "#f87171" : "#dc2626") : (isDark ? "#34d399" : "#059669"),
                  }}
                >
                  {choferesItem.length}
                </Typography>
              </Box>
              <div
                className={classes.kpiIconBox}
                style={{
                  backgroundColor:
                    choferesItem.length > 0
                      ? isDark
                        ? "rgba(239, 68, 68, 0.15)"
                        : "#fef2f2"
                      : isDark
                      ? "rgba(16, 185, 129, 0.15)"
                      : "#f0fdf4",
                  color:
                    choferesItem.length > 0
                      ? isDark
                        ? "#f87171"
                        : "#dc2626"
                      : isDark
                      ? "#34d399"
                      : "#16a34a",
                }}
              >
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.kpiCard}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography className={classes.kpiLabel}>Mantenciones</Typography>
                <Typography className={classes.kpiValue}>Programa</Typography>
              </Box>
              <div
                className={classes.kpiIconBox}
                style={{
                  backgroundColor: isDark ? "rgba(139, 92, 246, 0.15)" : "#faf5ff",
                  color: isDark ? "#a78bfa" : "#7c3aed",
                }}
              >
                <FontAwesomeIcon icon={faWrench} />
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Navigation Shortcuts */}
      <Paper className={classes.quickActionsPaper}>
        <Typography variant="subtitle2" style={{ fontWeight: 700, color: "#475569", marginBottom: 12, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
          Accesos Rápidos
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item>
            <Button
              className={classes.quickActionBtn}
              component={Link}
              to="/camion/actualizacion"
              startIcon={<FontAwesomeIcon icon={faPlus} size="xs" />}
            >
              Registrar Camión
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.quickActionBtn}
              component={Link}
              to="/personal/conductores/actualizacion"
              startIcon={<FontAwesomeIcon icon={faIdCard} size="xs" />}
            >
              Nuevo Conductor
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.quickActionBtn}
              component={Link}
              to="/combustible/combustibleactualizacion"
              startIcon={<FontAwesomeIcon icon={faGasPump} size="xs" />}
            >
              Carga Combustible
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.quickActionBtn}
              component={Link}
              to="/mantenciones/apmp/ingreso"
              startIcon={<FontAwesomeIcon icon={faWrench} size="xs" />}
            >
              Mantención Preventiva
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* License Alerts Table Section */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              ⚠️ Revisión y Control de Licencias de Conducir
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Listado de conductores registrados y fechas límite de control de licencia municipal.
            </Typography>
          </Box>
          <div className={classes.tableCard}>
            <MaterialDatatable
              title="Conductores y Fechas de Vencimiento"
              data={choferesItem}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}