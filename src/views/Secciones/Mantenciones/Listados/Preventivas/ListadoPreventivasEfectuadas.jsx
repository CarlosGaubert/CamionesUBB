import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(1),
  },

  espaciadoInput: {
    marginTop: theme.spacing(3),
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
}));

export default function ListadoPreventivasEfectuadas() {
  const classes = useStyles();

  const [patenteCamion, setPatenteCamion] = React.useState("");
  const [selectedDateDesde, setSelectedDateDesde] = React.useState(new Date());
  const [selectedDateHasta, setSelectedDateHasta] = React.useState(new Date());

  const handleDateChangeHasta = (date) => {
    setSelectedDateHasta(date);
  };
  const handleDateChangeDesde = (date) => {
    setSelectedDateDesde(date);
  };

  const handleChangePatenteCamion = (event) => {
    setPatenteCamion(event.target.value);
  };
  return (
    <div>
      <Paper elevation={10} className={classes.paper}>
        <Typography className={classes.titulo} variant="h6" noWrap>
          Alcance
        </Typography>

        <Grid item md={12} sm={12} justify="center">
          <FormControl className={classes.formControl} component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="end"
            >
              <FormControlLabel
                value="uno"
                control={<Radio color="secondary" />}
                label="Uno"
              />
              <FormControlLabel
                value="todos"
                control={<Radio color="secondary" />}
                label="Todos"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid className={classes.espaciado} item md={12} sm={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Tipo Documento</InputLabel>
            <Select
              labelId="camion"
              id="patenteCamion"
              value={patenteCamion}
              onChange={handleChangePatenteCamion}
              label="Patente Camión"
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
      </Paper>
      <Paper elevation={10} className={classes.paper}>
        <Typography className={classes.titulo} variant="h6" noWrap>
          En
        </Typography>

        <Grid item md={12} sm={12} justify="center">
          <FormControl className={classes.formControl} component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="end"
            >
              <FormControlLabel
                value="todasLasFechas"
                control={<Radio color="secondary" />}
                label="Todas las Fechas"
              />
              <FormControlLabel
                value="rangoFechas"
                control={<Radio color="secondary" />}
                label="Rango de Fechas"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container item md={12}>

        
        <Grid item md={6} className={classes.espaciado} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container >
              <KeyboardDatePicker
                margin="normal"
                id="fechaDesde"
                label="Desde"
                format="dd/MM/yyyy"
                fullWidth
                value={selectedDateDesde}
                onChange={handleDateChangeDesde}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={6} className={classes.espaciado} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container >
              <KeyboardDatePicker
                margin="normal"
                id="fechaHasta"
                label="Hasta"
                format="dd/MM/yyyy"
                fullWidth
                value={selectedDateHasta}
                onChange={handleDateChangeHasta}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        direction="row"
        className={classes.espaciado}
        item
        xs={12}
        justify="center"
      >
        <Grid className={classes.espaciado} item xs={7}>
          <Button variant="contained" fullWidth color="primary">
            Aceptar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
