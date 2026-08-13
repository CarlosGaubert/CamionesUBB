import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

export default function ListadoUnCamion() {
  const classes = useStyles();
  const [patenteCamion, setPatenteCamion] = React.useState("");
  const handleChangePatenteCamion = (event) => {
    setPatenteCamion(event.target.value);
  };
  const [selectedDateHasta, setSelectedDateHasta] = React.useState(new Date());
  const [selectedDateDesde, setSelectedDateDesde] = React.useState(new Date());
  const handleDateChangeDesde = (date) => {
    setSelectedDateDesde(date);
  };
  const handleDateChangeHasta = (date) => {
    setSelectedDateHasta(date);
  };
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Paper elevation={3} fullWidth className={classes.paper}>
          <Grid
            item
            xs={12}
            md={12}
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
            md={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="start"
          >
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="todasFechas"
              >
                <FormControlLabel
                  value="todasFechas"
                  control={<Radio color="secondary" />}
                  label="Todas las Fechas"
                />
                <FormControlLabel
                  value="rangoFechas"
                  control={<Radio color="secondary" />}
                  label="Rango Fechas"
                />
              </RadioGroup>
            </FormControl>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    id="mesDesde"
                    label="Desde"
                    format="dd/MM/yyyy"
                    fullWidth
                    value={selectedDateDesde}
                    onChange={handleDateChangeDesde}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    id="mesHasta"
                    label="Hasta"
                    format="dd/MM/yyyy"
                    fullWidth
                    value={selectedDateHasta}
                    onChange={handleDateChangeHasta}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          item
          xs={12}
          md={12}
          className={classes.espaciado}
          container
          direction="row"
          justify="start"
        >
          <Button variant="contained" fullWidth color="primary">
            Aceptar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
