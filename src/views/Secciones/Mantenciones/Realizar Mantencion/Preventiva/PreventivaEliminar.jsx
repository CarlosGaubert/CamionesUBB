import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    marginTop: theme.spacing(1),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(3),
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

}));


export default function PreventivaEliminar() {
    const classes = useStyles();
    const [camion, setCamion] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleChangeCamion = (event) => {
        setCamion(event.target.value);
    };
    return (
        <div className={classes.root}>
             <Grid item xs={12} container full direction="row" justify="center">
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Camión</InputLabel>
                <Select
                  labelId="camion"
                  id="camion"
                  value={camion}
                  onChange={handleChangeCamion}
                  label="Camión"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                id="programa"
                className={classes.espaciadoInput}
                fullWidth
                label="Programa"
                variant="outlined"
              />
            </Grid>
            <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" noWrap>
            Tabla de mantención normal
          </Typography>
          <Grid item xs={12} container full direction="row" justify="center">
            tabla
          </Grid>
          
          </Paper>
          <Grid item xs={12} container full direction="row" justify="center">
            <Grid
              item
              xs={6}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <TextField
                required
                id="elemento"
                disabled
                fullWidth
                label="Elemento"
                variant="outlined"
              />

              <TextField
                required
                id="odometroUltimaM"
                className={classes.espaciadoInput}
                fullWidth
                label="Odómetro Ultima Mant."
                variant="outlined"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechacompra"
                    className={classes.espaciadoInput}
                    label="Fecha Mantención"
                    format="MM/dd/yyyy"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <TextField
                required
                id="costoMaterial"
                className={classes.espaciadoInput}
                fullWidth
                label="Costo Material"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
          
              <TextField
                required
                id="costoManoDeObra"
                fullWidth
                label="Costo Mano de Obra"
                variant="outlined"
              />

              <TextField
                required
                id="documentoPago"
                disabled
                className={classes.espaciadoInput}
                fullWidth
                label="Documento Pago"
                variant="outlined"
              />
                <TextField
                required
                id="numeroDocumento"
                className={classes.espaciadoInput}
                fullWidth
                label="Número Documento"
                variant="outlined"
              />
              <TextField
                required
                id="diferenciaKmOdometro"
                className={classes.espaciadoInput}
                fullWidth
                label="Diferencia Km Odómetro"
                variant="outlined"
              />
            </Grid>
          
          </Grid>
          <Grid  item xs={12} className={classes.paper} container direction="row" justify="center">
            <Grid item xs={4} container direction="row" justify="center">
                <Button disabled variant="contained" color="primary">
                    Cancelar Seleccion
                </Button>
            </Grid>
            <Grid item xs={4} container direction="row" justify="center">
                <Button disabled variant="contained" color="primary">
                    Elimina Ultima Mantención
                </Button>
            </Grid>
            <Grid item xs={4} container direction="row" justify="center">
                <Button  variant="contained" color="primary">
                    Otro Camión
                </Button>
            </Grid>
            
          </Grid>
          </Grid>
        </div>
    )
}
