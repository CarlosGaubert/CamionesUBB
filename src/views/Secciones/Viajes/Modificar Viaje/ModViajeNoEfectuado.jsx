import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: "100%",
  },
}));
export default function ModViajeNoEfectuado() {
    const classes = useStyles();

    const [selectedDatePrograma, setSelectedDatePrograma] = React.useState(
      new Date()
    );
    const [patenteCamion, setPatenteCamion] = React.useState("");
    const [unidadCamion, setUnidadCamion] = React.useState("");
    const [unidadCarro, setUnidadCarro] = React.useState("");
  
    const handleChangeUnidadCarro = (event) => {
      setUnidadCarro(event.target.value);
    };
    const handleChangeUnidadCamion = (event) => {
      setUnidadCamion(event.target.value);
    };
  
    const handleChangePatenteCamion = (event) => {
      setPatenteCamion(event.target.value);
    };
    const handleDateChangeProgramaViaje = (date) => {
      setSelectedDatePrograma(date);
    };
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={3}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  id="mes"
                  label="Mes"
                  format="dd/MM/yyyy"
                  fullWidth
                  value={selectedDatePrograma}
                  onChange={handleDateChangeProgramaViaje}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
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
            sm={3}
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
            
              <Select
                id="patente"
                value={patenteCamion}
                onChange={handleChangePatenteCamion}
              
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
            sm={3}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Button disabled fullWidth variant="contained" color="primary">
              Aceptar
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              Programa de Viajes
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="fecha"
                    fullWidth
                    label="Fecha"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="origen"
                    fullWidth
                    label="Origen"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="seccion"
                    fullWidth
                    label="Sección"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="destino"
                    fullWidth
                    label="Destino"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="chofer"
                    fullWidth
                    label="Chofer"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="hrSalida"
                    fullWidth
                    label="Hora Salida"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="hrLlegada"
                    fullWidth
                    label="Hora LLegada"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="kmRipio"
                    fullWidth
                    label="Km. Ripio"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="kmPavimento"
                    fullWidth
                    label="Km. Pavimento"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    id="kmTotal"
                    fullWidth
                    label="Km. Total"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="numGuia"
                    fullWidth
                    label="N° Guía"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="odometroSalida"
                    fullWidth
                    label="Odómetro Salida"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="odometroLlegada"
                    fullWidth
                    label="Odómetro Llegada"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="cantCamion"
                    fullWidth
                    label="Cantidad Camión"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="Estado"
                      id="ruta"
                      value={unidadCamion}
                      onChange={handleChangeUnidadCamion}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {["Unidad 1", "Unidad 2", "Unidad 3", "Unidad 4"].map(
                        (item, index) => (
                          <MenuItem value={index + 1}>{item}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    id="cantCarro"
                    fullWidth
                    label="Cantidad Carros"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="Estado"
                      id="ruta"
                      value={unidadCarro}
                      onChange={handleChangeUnidadCarro}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {["Unidad 1", "Unidad 2", "Unidad 3", "Unidad 4"].map(
                        (item, index) => (
                          <MenuItem value={index + 1}>{item}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="start"
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Otros Costos</FormLabel>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="no"
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio color="secondary" />}
                        label="No"
                      />
                      <FormControlLabel
                        value="si"
                        control={<Radio color="secondary" />}
                        label="Si"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    id="observacion"
                    label="Observación"
                    multiline
                    rows={3}
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    type="number"
                    id="precioUniCamion"
                    fullWidth
                    label="Precio Unitario Camión"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    type="number"
                    id="precioUniCarro"
                    fullWidth
                    label="Precio Unitario Carro"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    required
                    disabled
                    type="number"
                    id="totalViaje"
                    fullWidth
                    label="Total Viaje"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button disabled fullWidth variant="contained" color="primary">
                Viaje Efectuado
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button disabled fullWidth variant="contained" color="primary">
                Viaje No Efectuado
              </Button>
            </Grid>
            <Grid
            item
            xs={12}
            sm={4}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Button disabled fullWidth variant="contained" color="primary">
              Eliminar Viaje Efectuado
            </Button>
          </Grid>
          </Grid>
        </Grid>
      </div>
    );
}
