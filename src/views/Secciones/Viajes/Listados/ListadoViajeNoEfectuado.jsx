import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
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
export default function ListadoViajeNoEfectuado() {
    const classes = useStyles();
    const [selectedDateDesde, setSelectedDateDesde] = React.useState(new Date());
    const [selectedDateHasta, setSelectedDateHasta] = React.useState(new Date());
  
    const handleDateChangeHasta = (date) => {
      setSelectedDateHasta(date);
    };
    const handleDateChangeDesde = (date) => {
      setSelectedDateDesde(date);
    };
  
 
    return (
      <div>
      <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Consulta por
          </Typography>
  
          <Grid item md={12} sm={12} justify="center">
            <FormControl className={classes.formControl} component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="camion"
              >
                <FormControlLabel
                  value="camion"
                  control={<Radio color="secondary" />}
                  label="Camión"
                />
                <FormControlLabel
                  value="conductor"
                  control={<Radio color="secondary" />}
                  label="Conductor"
                />
                <FormControlLabel
                  value="fecha"
                  control={<Radio color="secondary" />}
                  label="Fecha"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
  
        
        </Paper>
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
                defaultValue="uno"
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
                defaultValue="todasLasFechas"
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
          <Grid className={classes.espaciado} item xs={12}>
            <Button variant="contained" fullWidth color="primary">
              Aceptar
            </Button>
          </Grid>
        </Grid>
      </div>
      );
}
