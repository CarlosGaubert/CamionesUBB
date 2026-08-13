import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { useThemeMode } from "../../ThemeContext";

import {
  faTruckMoving,
  faUser,
  faTrailer,
  faGasPump,
  faTools,
  faUserCog,
  faLandmark,
  faTired,
  faBuilding,
  faUserTie,
  faCalendarAlt,
  faPollH,
  faCalculator,
  faCreditCard,
  faCar,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    backgroundColor: theme.palette.type === "dark" ? "#181818" : "#1d4ed8",
    color: "#ffffff",
    borderBottom: theme.palette.type === "dark" ? "1px solid #2e2e2e" : "none",
    boxShadow:
      theme.palette.type === "dark"
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.08)",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.type === "dark" ? "#181818" : "#ffffff",
    color: theme.palette.type === "dark" ? "#f3f4f6" : "#0f172a",
    borderRight:
      theme.palette.type === "dark" ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    borderBottom:
      theme.palette.type === "dark" ? "1px solid #2e2e2e" : "1px solid #e2e8f0",
  },
  drawerBrandTitle: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: theme.palette.type === "dark" ? "#f3f4f6" : "#1d4ed8",
    letterSpacing: "0.02em",
  },
  drawerBrandSubtitle: {
    fontSize: "0.75rem",
    color: theme.palette.type === "dark" ? "#9ca3af" : "#64748b",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  closeBtn: {
    color: theme.palette.type === "dark" ? "#9ca3af" : "#64748b",
    "&:hover": {
      color: theme.palette.type === "dark" ? "#ffffff" : "#0f172a",
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(0, 0, 0, 0.04)",
    },
  },
  menuItem: {
    borderRadius: 8,
    margin: "3px 10px",
    width: "auto",
    color: theme.palette.type === "dark" ? "#d1d5db" : "#334155",
    transition: "all 0.15s ease",
    "&:hover": {
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgba(255, 255, 255, 0.06)"
          : "rgba(0, 0, 0, 0.04)",
      color: theme.palette.type === "dark" ? "#ffffff" : "#1d4ed8",
      "& $menuItemIcon": {
        color: theme.palette.type === "dark" ? "#3b82f6" : "#1d4ed8",
      },
    },
  },
  menuItemIcon: {
    color: theme.palette.type === "dark" ? "#9ca3af" : "#64748b",
    minWidth: 38,
    transition: "color 0.15s ease",
  },
  subList: {
    backgroundColor:
      theme.palette.type === "dark" ? "#121212" : "#f8fafc",
    borderRadius: 8,
    margin: "4px 8px",
    padding: "4px 0",
    border:
      theme.palette.type === "dark"
        ? "1px solid #282828"
        : "1px solid #e2e8f0",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    minHeight: "100vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerChip: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    fontWeight: 600,
    fontSize: "0.85rem",
    padding: "4px 12px",
    borderRadius: "20px",
  },
  homeLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    transition: "all 0.15s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      color: "#ffffff",
    },
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useThemeMode();
  const [open, setOpen] = React.useState(false);
  console.log(props);
  const [openCamion, setOpenCamion] = React.useState(false);
  const [openCarro, setOpenCarro] = React.useState(false);
  const [openCliente, setOpenCliente] = React.useState(false);
  const [openCombustible, setOpenCombustible] = React.useState(false);
  const [openHds, setOpenHds] = React.useState(false);
  const [openIF, setOpenIF] = React.useState(false);
  const [openMantenciones, setOpenMantenciones] = React.useState(false);
  const [openNeumaticos, setOpenNeumaticos] = React.useState(false);
  const [openObras, setOpenObras] = React.useState(false);
  const [openPersonal, setOpenPersonal] = React.useState(false);
  const [openPdv, setOpenPdv] = React.useState(false);
  const [openResultados, setOpenResultados] = React.useState(false);
  const [openRutas, setOpenRutas] = React.useState(false);
  const [openTarifa, setOpenTarifa] = React.useState(false);
  const [openTCC, setOpenTCC] = React.useState(false);
  const [openViajes, setOpenViajes] = React.useState(false);
  const [openNeumaticosCambio, setOpenNeumaticosCambio] = React.useState(false);
  const [openNeumaticosListados, setOpenNeumaticosListados] =
    React.useState(false);
  const [openPersonalConductores, setOpenPersonalConductores] =
    React.useState(false);
  const [openPersonalOtrosEmpleados, setOpenPersonalOtrosEmpleados] =
    React.useState(false);
  const [openConductoresADC, setOpenConductoresADC] = React.useState(false);
  const [openConductoresEventos, setopenConductoresEventos] =
    React.useState(false);
  const [openEventosTipoEvento, setopenEventosTipoEvento] =
    React.useState(false);
  const [openEventosRegistrarEvento, setopenEventosRegistrarEvento] =
    React.useState(false);
  const [openPdvActualizacion, setopenPdvActualizacion] = React.useState(false);
  const [openPdvListados, setopenPdvListados] = React.useState(false);
  const [openViajeModificar, setopenViajeModificar] = React.useState(false);
  const [openViajeListados, setopenViajeListados] = React.useState(false);
  const [openCamionListado, setopenCamionListado] = React.useState(false);
  const [openMantencionAPMP, setopenMantencionAPMP] = React.useState(false);
  const [openMantencionRM, setopenMantencionRM] = React.useState(false);
  const [openMantencionListados, setopenMantencionListados] =
    React.useState(false);
  const [openRMPreventiva, setopenRMPreventiva] = React.useState(false);
  const [openRMCorrectiva, setopenRMCorrectiva] = React.useState(false);
  const [openListadoPreventivo, setopenListadoPreventivo] =
    React.useState(false);
  const [openListadoCorrectivo, setopenListadoCorrectivo] =
    React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClickCamion() {
    setOpenCamion(!openCamion);
  }
  function handleClickCarro() {
    setOpenCarro(!openCarro);
  }
  function handleClickCliente() {
    setOpenCliente(!openCliente);
  }
  function handleClickCombustible() {
    setOpenCombustible(!openCombustible);
  }
  function handleClickHds() {
    setOpenHds(!openHds);
  }
  function handleClickIF() {
    setOpenIF(!openIF);
  }
  function handleClickMantenciones() {
    setOpenMantenciones(!openMantenciones);
  }
  function handleClickNeumaticos() {
    setOpenNeumaticos(!openNeumaticos);
  }
  function handleClickObras() {
    setOpenObras(!openObras);
  }
  function handleClickPersonal() {
    setOpenPersonal(!openPersonal);
  }
  function handleClickPdv() {
    setOpenPdv(!openPdv);
  }
  function handleClickResultados() {
    setOpenResultados(!openResultados);
  }
  function handleClickRutas() {
    setOpenRutas(!openRutas);
  }
  function handleClickTarifa() {
    setOpenTarifa(!openTarifa);
  }
  function handleClickTCC() {
    setOpenTCC(!openTCC);
  }
  function handleClickViajes() {
    setOpenViajes(!openViajes);
  }
  function handleClickNeumaticosCambio() {
    setOpenNeumaticosCambio(!openNeumaticosCambio);
  }
  function handleClickNeumaticosListados() {
    setOpenNeumaticosListados(!openNeumaticosListados);
  }
  function handleClickPersonalConductores() {
    setOpenPersonalConductores(!openPersonalConductores);
  }
  function handleClickPersonalOtrosEmpleados() {
    setOpenPersonalOtrosEmpleados(!openPersonalOtrosEmpleados);
  }
  function handleClickConductoresADC() {
    setOpenConductoresADC(!openConductoresADC);
  }
  function handleClickConductoresEventos() {
    setopenConductoresEventos(!openConductoresEventos);
  }
  function handleClickEventosTipoEvento() {
    setopenEventosTipoEvento(!openEventosTipoEvento);
  }
  function handleClickEventosRegistrarEvento() {
    setopenEventosRegistrarEvento(!openEventosRegistrarEvento);
  }
  function handleClickPdvActualizacion() {
    setopenPdvActualizacion(!openPdvActualizacion);
  }
  function handleClickPdvListados() {
    setopenPdvListados(!openPdvListados);
  }
  function handleClickopenViajeModificar() {
    setopenViajeModificar(!openViajeModificar);
  }
  function handleClickopenViajeListados() {
    setopenViajeListados(!openViajeListados);
  }
  function handleClickopenCamionListado() {
    setopenCamionListado(!openCamionListado);
  }
  function handleClickopenMantencionAPMP() {
    setopenMantencionAPMP(!openMantencionAPMP);
  }
  function handleClickopenMantencionRM() {
    setopenMantencionRM(!openMantencionRM);
  }
  function handleClickopenMantencionListados() {
    setopenMantencionListados(!openMantencionListados);
  }
  function handleClickRMPreventiva() {
    setopenRMPreventiva(!openRMPreventiva);
  }
  function handleClickRMCorrectiva() {
    setopenRMCorrectiva(!openRMCorrectiva);
  }
  function handleClickopenListadoPreventivo() {
    setopenListadoPreventivo(!openListadoPreventivo);
  }
  function handleClickopenListadoCorrectivo() {
    setopenListadoCorrectivo(!openListadoCorrectivo);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            py={0.5}
          >
            <Box display="flex" alignItems="center" gridGap={12}>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                noWrap
              >
                🚛 Camiones UBB
              </Typography>
              {props.titulo && (
                <span className={classes.headerChip}>
                  {props.titulo}
                </span>
              )}
            </Box>
            <Box display="flex" alignItems="center" gridGap={10}>
              <Tooltip title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
                <IconButton
                  onClick={toggleDarkMode}
                  size="small"
                  style={{
                    color: darkMode ? "#fbbf24" : "#94a3b8",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: darkMode ? "rgba(251, 191, 36, 0.1)" : "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {darkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>
              </Tooltip>
              <Link to="/" className={classes.homeLink}>
                🏠 Inicio
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Box>
            <Typography className={classes.drawerBrandTitle} noWrap>
              🚛 Camiones UBB
            </Typography>
            <Typography className={classes.drawerBrandSubtitle} noWrap>
              Panel de Control
            </Typography>
          </Box>
          <IconButton className={classes.closeBtn} onClick={handleDrawerClose} size="small">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider style={{ backgroundColor: "#1e293b" }} />
        <List component="nav" className={classes.appMenu} disablePadding>
          <ListItem
            button
            onClick={handleClickCamion}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faTruckMoving} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Camion" />
            {openCamion ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openCamion} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/camion/actualizacion"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/camion/asignarcarro"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Asignar Carro" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/camion/odometromensual"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Odometro Mensual" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/camion/camionseguro"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Seguro" />
              </ListItem>
              <ListItem
                button
                onClick={handleClickopenCamionListado}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Listados" />
                {openCamionListado ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openCamionListado} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={Link}
                    to="/camion/camionlistadogeneral"
                    className={classes.menuItem}
                  >
                    <ListItemText inset primary="General" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/camion/camionlistadouncamion"
                    className={classes.menuItem}
                  >
                    <ListItemText inset primary="Un Camión" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="/camion/camionlistadocamioncarro"
                    className={classes.menuItem}
                  >
                    <ListItemText inset primary="Camión-Carro" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickCarro}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faTrailer} size="lg" />
            </ListItemIcon>

            <ListItemText primary="Carro" />
            {openCarro ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openCarro} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/carro/carroactualizacion"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/carro/carrolistado"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Listados" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickCliente}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faUser} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
            {openCliente ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openCliente} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/clientes/clientesactualizacion"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/clientes/clienteslistado"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Listado" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickCombustible}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faGasPump} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Combustible" />
            {openCombustible ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openCombustible} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/combustible/combustibleactualizacion"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/combustible/combustibleconsulta"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Consulta" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickHds}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faTools} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Herramientas del Sistema" />
            {openHds ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openHds} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Reducir Base de Datos" />
              </ListItem>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Reversar Reducción" />
              </ListItem>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Copias de Seguridad" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickIF} className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faLandmark} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Instituciones Financieras" />
            {openIF ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openIF} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/institucionfinanciera/ifactualizacion"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/institucionfinanciera/iflistado"
                className={classes.menuItem}
              >
                <ListItemText inset primary="Listado" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickMantenciones}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faUserCog} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Mantenciones" />
            {openMantenciones ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openMantenciones} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {/** Actualizacion Programa M. Preventiva */}
              <ListItem
                button
                onClick={handleClickopenMantencionAPMP}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Actualizacion Programa M. Preventiva" />
                {openMantencionAPMP ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openMantencionAPMP} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button 
                component={Link}
                to="/mantenciones/apmp/ingreso" className={classes.menuItem}>
                    <ListItemText inset primary="Ingreso" />
                  </ListItem>
                  <ListItem button component={Link}
                to="/mantenciones/apmp/modificacion" className={classes.menuItem}>
                    <ListItemText inset primary="Modificacion" />
                  </ListItem>
                  <ListItem button component={Link}
                to="/mantenciones/apmp/eliminar" className={classes.menuItem}>
                    <ListItemText inset primary="Eliminación" />
                  </ListItem>
                  <ListItem button component={Link}
                to="/mantenciones/apmp/listado" className={classes.menuItem}>
                    <ListItemText inset primary="Listado Programas" />
                  </ListItem>
                </List>
              </Collapse>
              {/** Realizar Mantención */}
              <ListItem
                button
                onClick={handleClickopenMantencionRM}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Realizar Mantención" />
                {openMantencionRM ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openMantencionRM} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  {/** Preventiva */}
                  <ListItem
                    button
                    onClick={handleClickRMPreventiva}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Preventiva" />
                    {openRMPreventiva ? <IconExpandLess /> : <IconExpandMore />}
                  </ListItem>
                  <Collapse in={openRMPreventiva} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/preventiva/ingreso" className={classes.menuItem}>
                        <ListItemText inset primary="Ingreso" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/preventiva/modifica" className={classes.menuItem}>
                        <ListItemText inset primary="Modificación" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/preventiva/eliminar" className={classes.menuItem}>
                        <ListItemText inset primary="Eliminación" />
                      </ListItem>
                    </List>
                  </Collapse>
                  {/** Correctiva */}
                  <ListItem
                    button
                    onClick={handleClickRMCorrectiva}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Correctiva" />
                    {openRMCorrectiva ? <IconExpandLess /> : <IconExpandMore />}
                  </ListItem>
                  <Collapse in={openRMCorrectiva} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/correctiva/ingreso" className={classes.menuItem}>
                        <ListItemText inset primary="Ingreso" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/correctiva/modifica" className={classes.menuItem}>
                        <ListItemText inset primary="Modificación" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/realizarm/correctiva/eliminar" className={classes.menuItem}>
                        <ListItemText inset primary="Eliminación" />
                      </ListItem>
                    </List>
                  </Collapse>
                  {/** Generar Orden de Trabajo */}
                  <ListItem button component={Link}
                to="/mantenciones/realizarm/generarordentrabajo"  className={classes.menuItem}>
                    <ListItemText inset primary="Generar Orden de Trabajo" />
                  </ListItem>
                </List>
              </Collapse>
              {/** Listados */}
              <ListItem
                button
                onClick={handleClickopenMantencionListados}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Listados" />
                {openMantencionListados ? (
                  <IconExpandLess />
                ) : (
                  <IconExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openMantencionListados}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <List component="div" disablePadding>
                  {/* Preventivas */}
                  <ListItem
                    button
                    onClick={handleClickopenListadoPreventivo}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Preventivas" />
                    {openListadoPreventivo ? (
                      <IconExpandLess />
                    ) : (
                      <IconExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={openListadoPreventivo}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider />
                    <List component="div" disablePadding>
                      <ListItem button component={Link}
                to="/mantenciones/listados/preventivas/programadas" className={classes.menuItem}>
                        <ListItemText inset primary="Programadas" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/listados/preventivas/efectuadas" className={classes.menuItem}>
                        <ListItemText inset primary="Efectuadas" />
                      </ListItem>
                    </List>
                  </Collapse>
                  {/* Correctivas */}
                  <ListItem
                    button
                    onClick={handleClickopenListadoCorrectivo}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Correctivas" />
                    {openListadoCorrectivo ? (
                      <IconExpandLess />
                    ) : (
                      <IconExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={openListadoCorrectivo}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider />
                    <List component="div" disablePadding>
                      <ListItem button component={Link}
                to="/mantenciones/listados/correctivas/general" className={classes.menuItem}>
                        <ListItemText inset primary="General" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/mantenciones/listados/correctivas/unamantencion" className={classes.menuItem}>
                        <ListItemText inset primary="Una mantención" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickNeumaticos}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faTired} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Neumaticos" />
            {openNeumaticos ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openNeumaticos} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {/** cambio neumatico */}
              <ListItem
                button
                onClick={handleClickNeumaticosCambio}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Cambio" />
                {openNeumaticosCambio ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openNeumaticosCambio} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Camion" />
                  </ListItem>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Carro" />
                  </ListItem>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Eliminar Cambio" />
                  </ListItem>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Carro - Camión" />
                  </ListItem>
                </List>
              </Collapse>
              {/** Listado neumatico */}
              <ListItem
                button
                onClick={handleClickNeumaticosListados}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Listados" />
                {openNeumaticosListados ? (
                  <IconExpandLess />
                ) : (
                  <IconExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openNeumaticosListados}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Neumáticos" />
                  </ListItem>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Eventos Neumatico" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickObras}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faBuilding} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Obras" />
            {openObras ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openObras} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
                to="/obras/actualizacion" className={classes.menuItem}>
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem button component={Link}
                to="/obras/listado" className={classes.menuItem}>
                <ListItemText inset primary="Listado" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickPersonal}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faUserTie} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Personal" />
            {openPersonal ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openPersonal} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={handleClickPersonalConductores}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Conductores" />
                {openPersonalConductores ? (
                  <IconExpandLess />
                ) : (
                  <IconExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openPersonalConductores}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <List component="div" disablePadding>
                  {/** actualizacion*/}
                  <ListItem button component={Link}
                to="/personal/conductores/actualizacion"  className={classes.menuItem}>
                    <ListItemText inset primary="Actualización" />
                  </ListItem>
                  {/** Asignar / desasignar camion */}
                  <ListItem
                    button
                    onClick={handleClickConductoresADC}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Asignar / desasignar camión" />
                    {openConductoresADC ? (
                      <IconExpandLess />
                    ) : (
                      <IconExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={openConductoresADC}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider />
                    <List component="div" disablePadding>
                      <ListItem button component={Link}
                to="/personal/conductores/adc/actualizacion"  className={classes.menuItem}>
                        <ListItemText inset primary="Actualización" />
                      </ListItem>
                      <ListItem button component={Link}
                to="/personal/conductores/adc/listado" className={classes.menuItem}>
                        <ListItemText inset primary="Listado" />
                      </ListItem>
                    </List>
                  </Collapse>

                  {/** sueldos */}
                  <ListItem button component={Link}
                to="/personal/conductores/sueldos" className={classes.menuItem}>
                    <ListItemText inset primary="Sueldos" />
                  </ListItem>
                  {/** Eventos */}

                  <ListItem
                    button
                    onClick={handleClickConductoresEventos}
                    className={classes.menuItem}
                  >
                    <ListItemIcon
                      className={classes.menuItemIcon}
                    ></ListItemIcon>
                    <ListItemText primary="Eventos" />
                    {openConductoresEventos ? (
                      <IconExpandLess />
                    ) : (
                      <IconExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={openConductoresEventos}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Divider />
                    <List component="div" disablePadding>
                      {/* tipo evento */}
                      <ListItem
                        button
                        onClick={handleClickEventosTipoEvento}
                        className={classes.menuItem}
                      >
                        <ListItemIcon
                          className={classes.menuItemIcon}
                        ></ListItemIcon>
                        <ListItemText primary="Tipo Evento" />
                        {openEventosTipoEvento ? (
                          <IconExpandLess />
                        ) : (
                          <IconExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={openEventosTipoEvento}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Divider />
                        <List component="div" disablePadding>
                          <ListItem button component={Link}
                to="/personal/conductores/evento/tipoevento/actualizacion" className={classes.menuItem}>
                            <ListItemText inset primary="Actualización" />
                          </ListItem>
                          <ListItem button component={Link}
                to="/personal/conductores/evento/tipoevento/listado" className={classes.menuItem}>
                            <ListItemText inset primary="Listado" />
                          </ListItem>
                        </List>
                      </Collapse>
                      {/* Registrar evento */}
                      <ListItem
                        button
                        onClick={handleClickEventosRegistrarEvento}
                        className={classes.menuItem}
                      >
                        <ListItemIcon
                          className={classes.menuItemIcon}
                        ></ListItemIcon>
                        <ListItemText primary="Registrar Evento" />
                        {openEventosRegistrarEvento ? (
                          <IconExpandLess />
                        ) : (
                          <IconExpandMore />
                        )}
                      </ListItem>
                      <Collapse
                        in={openEventosRegistrarEvento}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Divider />
                        <List component="div" disablePadding>
                          <ListItem button component={Link}
                to="/personal/conductores/evento/registrarevento/actualizacion" className={classes.menuItem}>
                            <ListItemText inset primary="Actualización" />
                          </ListItem>
                          <ListItem button  component={Link}
                to="/personal/conductores/evento/registrarevento/listado"  className={classes.menuItem}>
                            <ListItemText inset primary="Listado" />
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </Collapse>

                  {/** Listado */}
                  <ListItem button component={Link}
                to="/personal/conductores/listado" className={classes.menuItem}>
                    <ListItemText inset primary="Listado" />
                  </ListItem>
                </List>
              </Collapse>
              {/** Listado neumatico */}
              <ListItem
                button
                onClick={handleClickPersonalOtrosEmpleados}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Otros empleados" />
                {openPersonalOtrosEmpleados ? (
                  <IconExpandLess />
                ) : (
                  <IconExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openPersonalOtrosEmpleados}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button component={Link}
                to="/personal/otrosempleados/actualizacion" className={classes.menuItem}>
                    <ListItemText inset primary="Actualizacion" />
                  </ListItem>
                  <ListItem button component={Link}
                to="/personal/otrosempleados/costosindirectos" className={classes.menuItem}>
                    <ListItemText inset primary="Costos Indirectos" />
                  </ListItem>
                  <ListItem button component={Link}
                to="/personal/otrosempleados/listado" className={classes.menuItem}>
                    <ListItemText inset primary="Listado" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickPdv}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Programa de Viaje" />
            {openPdv ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openPdv} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {/* actualiacion */}
              <ListItem
                button
                onClick={handleClickPdvActualizacion}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Actualizacion" />
                {openPdvActualizacion ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openPdvActualizacion} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button component={Link}
                to="/programadeviaje/actualizacion/ingreso" className={classes.menuItem}>
                    <ListItemText inset primary="Ingreso" />
                  </ListItem>
                  <ListItem button component={Link}
                  to="/programadeviaje/actualizacion/modificareliminar" className={classes.menuItem}>
                    <ListItemText inset primary="Modificación y Eliminación" />
                  </ListItem>
                </List>
              </Collapse>

              {/* listados */}
              <ListItem
                button
                onClick={handleClickPdvListados}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Listados" />
                {openPdvListados ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openPdvListados} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button component={Link}
                  to="/programadeviaje/listado/general" className={classes.menuItem}>
                    <ListItemText inset primary="General" />
                  </ListItem>
                  <ListItem button component={Link}
                  to="/programadeviaje/listado/uncamion" className={classes.menuItem}>
                    <ListItemText inset primary="Un Camión" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickResultados}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faPollH} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Resultados" />
            {openResultados ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openResultados} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
              to="/resultado/productividadcostoutilidad" className={classes.menuItem}>
                <ListItemText
                  inset
                  primary="Productiv. Comust. Camión/Costo y Utilidad Empresa"
                />
              </ListItem>
              <ListItem button component={Link}
              to="/resultado/resultadocamionxmes" className={classes.menuItem}>
                <ListItemText inset primary="Resultado Camión x Mes" />
              </ListItem>
              <ListItem button component={Link}
              to="/resultado/resultadocosto" className={classes.menuItem}>
                <ListItemText inset primary="Costos (Empresa - Camión x Mes" />
              </ListItem>
              <ListItem button component={Link}
              to="/resultado/productividadtotal" className={classes.menuItem}>
                <ListItemText inset primary="Productividad Total" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickRutas}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faRoad} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Rutas" />
            {openRutas ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openRutas} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
              to="/rutas/actualizacion" className={classes.menuItem}>
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem button component={Link}
              to="/rutas/listado" className={classes.menuItem}>
                <ListItemText inset primary="Listado" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickTarifa}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faCalculator} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Tarifa" />
            {openTarifa ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openTarifa} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
              to="/tarifa/otrosclientes" className={classes.menuItem}>
                <ListItemText inset primary="Otros Clientes" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickTCC}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faCreditCard} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Tarjeta carga Combustible" />
            {openTCC ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openTCC} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
              to="/tarjetacombustiblecarga/actualizacion" className={classes.menuItem}>
                <ListItemText inset primary="Actualización" />
              </ListItem>
              <ListItem button component={Link}
              to="/tarjetacombustiblecarga/listado" className={classes.menuItem}>
                <ListItemText inset primary="Listado" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleClickViajes}
            className={classes.menuItem}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <FontAwesomeIcon icon={faCar} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Viajes" />
            {openViajes ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openViajes} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button component={Link}
              to="/viajes/efectuarviaje" className={classes.menuItem}>
                <ListItemText inset primary="Efectuar Viaje" />
              </ListItem>
              {/* Modificar Viaje */}
              <ListItem
                button
                onClick={handleClickopenViajeModificar}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Modificar Viaje" />
                {openViajeModificar ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openViajeModificar} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button component={Link}
                  to="/viajes/modificarviaje/viajeefectuado" className={classes.menuItem}>
                    <ListItemText inset primary="Viaje Efectuado" />
                  </ListItem>
                  <ListItem button component={Link}
                  to="/viajes/modificarviaje/viajenoefectuado" className={classes.menuItem}>
                    <ListItemText inset primary="Viaje No Efectuado" />
                  </ListItem>
                </List>
              </Collapse>
              {/* Listados */}
              <ListItem
                button
                onClick={handleClickopenViajeListados}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.menuItemIcon}></ListItemIcon>
                <ListItemText primary="Listados" />
                {openViajeListados ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={openViajeListados} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button component={Link}
                  to="/viajes/listados/viajeefectuado" className={classes.menuItem}>
                    <ListItemText inset primary="Viaje Efectuado" />
                  </ListItem>
                  <ListItem button component={Link}
                  to="/viajes/listados/viajenoefectuado" className={classes.menuItem}>
                    <ListItemText inset primary="Viaje No Efectuado" />
                  </ListItem>
                  <ListItem button component={Link}
                  to="/viajes/listados/gastos" className={classes.menuItem}>
                    <ListItemText inset primary="Gastos" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.seccion}
      </main>
    </div>
  );
}
