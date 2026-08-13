import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    marginBottom: theme.spacing(3),
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(1),
  },

  espaciadoLeft: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  select: {
    width: "80%",
  },
  formControl: {
    minWidth: "100%",
  },
  izqierda: {
    textAlign: "left",
  },
  titulo: {
    marginBottom: theme.spacing(3),
    textAlign: "left",
  },
  margen: {
    margin: theme.spacing(3),
  },
}));

export default function ActualizacionModificacionEliminacion() {
  const classes = useStyles();
  const [selectedDateProgramaViaje, setSelectedDateProgramaViaje] =
    React.useState(new Date());
  const [selectedDateRecorrido, setSelectedDateRecorrido] = React.useState(
    new Date()
  );
  const handleDateChangeRecorrido = (date) => {
    setSelectedDateRecorrido(date);
  };
  const handleDateChangeProgramaViaje = (date) => {
    setSelectedDateProgramaViaje(date);
  };
  const [patenteCamion, setPatenteCamion] = React.useState("");
  const [carro, setCarro] = React.useState("");
  const [chofer, setChofer] = React.useState("");
  const [cliente, setCliente] = React.useState("");
  const [obra, setObra] = React.useState("");
  const handleChangeObra = (event) => {
    setObra(event.target.value);
  };
  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };
  const handleChangeChofer = (event) => {
    setChofer(event.target.value);
  };
  const handleChangeCarro = (event) => {
    setCarro(event.target.value);
  };
  const handleChangePatenteCamion = (event) => {
    setPatenteCamion(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Paper elevation={3} fullWidth className={classes.paper}>
          <Grid container justify="start">
            <Grid
              item
              xs={12}
              md={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="start"
            >
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.espaciado2}
              >
                <InputLabel>Patente</InputLabel>
                <Select
                  labelId="Patente"
                  id="patente"
                  value={patenteCamion}
                  onChange={handleChangePatenteCamion}
                  label="Patente"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  className={classes.espaciado}
                  container
                  justify="space-around"
                >
                  <KeyboardDatePicker
                    id="mes"
                    label="Mes"
                    format="dd/MM/yyyy"
                    fullWidth
                    value={selectedDateProgramaViaje}
                    onChange={handleDateChangeProgramaViaje}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
           
          </Grid>
        </Paper>
        <Paper elevation={3} fullWidth className={classes.paper}>
          Tabla Programa de Viaje
        </Paper>
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            md={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={3} fullWidth className={classes.paper}>
              <Grid direction="row" container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="start"
                >
                  <Typography className={classes.titulo} variant="h6" noWrap>
                    Recorridos
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="end"
                >
                  <Button
                    fullWidth
                    className={classes.espaciado}
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    Nueva Ruta
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="end"
                ></Grid>
              </Grid>

              <Grid container justify="center">
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel></InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={carro}
                      onChange={handleChangeCarro}
                      label=""
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel></InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={carro}
                      onChange={handleChangeCarro}
                      label=""
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel></InputLabel>
                    <Select
                      labelId=""
                      id=""
                      value={carro}
                      onChange={handleChangeCarro}
                      label=""
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="origen"
                    fullWidth
                    disabled
                    label="Origen"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="seccion"
                    disabled
                    fullWidth
                    label="Sección"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="destino"
                    disabled
                    fullWidth
                    label="Destino"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="hrSalida"
                    fullWidth
                    label="Hora Salida"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="kmRipio"
                    fullWidth
                    label="Km Rípio"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                      className={classes.espaciado}
                      container
                      justify="space-around"
                    >
                      <KeyboardDatePicker
                        id="fechaRecorrido"
                        label="Fecha Recorrido"
                        format="dd/MM/yyyy"
                        fullWidth
                        value={selectedDateRecorrido}
                        onChange={handleDateChangeRecorrido}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="kmPavimento"
                    fullWidth
                    label="Km Pavimento"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="horaLlegada"
                    fullWidth
                    label="Hora Llegada"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="kmTotal"
                    fullWidth
                    label="Km Total"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={3} fullWidth className={classes.paper}>
              <Typography className={classes.titulo} variant="h6" noWrap>
                Datos Generales
              </Typography>
              <Grid container justify="center">
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel>Obra</InputLabel>
                    <Select
                      labelId="Obra"
                      id="obra"
                      value={obra}
                      onChange={handleChangeObra}
                      label="Obra"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="producto"
                    fullWidth
                    label="Producto"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel>Cliente</InputLabel>
                    <Select
                      labelId="Cliente"
                      id="cliente"
                      value={cliente}
                      onChange={handleChangeCliente}
                      label="Cliente"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel>Chofer</InputLabel>
                    <Select
                      labelId="Chofer"
                      id="chofer"
                      value={chofer}
                      onChange={handleChangeChofer}
                      label="Chofer"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="choferNombre"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel>Carro</InputLabel>
                    <Select
                      labelId="Carro"
                      id="carro"
                      value={carro}
                      onChange={handleChangeCarro}
                      label="Carro"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
            
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Grid
              item
              xs={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button fullWidth  variant="contained" color="primary">
                Graba Modificación
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button  fullWidth variant="contained" color="primary">
                Elimina Viaje
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button variant="contained" fullWidth color="primary">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
