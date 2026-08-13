import React from "react";
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
  fechas: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
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
export default function GenerarOrdenTrabajo() {
  const classes = useStyles();
  const [camion, setCamion] = React.useState("");
  const [carro, setCarro] = React.useState("");
 
  const handleChangeCamion = (event) => {
    setCamion(event.target.value);
  };
  const handleChangeCarro = (event) => {
    setCarro(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid item xs={12} container direction="row" justify="center">
        <Paper elevation={10} className={classes.paper}>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid className={classes.espaciado} item md={12} sm={12}>
              <TextField
                id="numeroOrden"
                label="N° Orden"
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={12} sm={12}>
              <TextField
                id="solicitandoA"
                label="Solicitando A"
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          
          </Grid>
        </Paper>
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Camión / Carro
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid className={classes.espaciado} item md={6} sm={12}>
            <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
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
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
            <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel>Carro</InputLabel>
                      <Select
                        labelId="carro"
                        id="carro"
                        value={carro}
                        onChange={handleChangeCarro}
                        label="carro"
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
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Reparaciones
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <TextField
                  id="descripcionOT"
                  label="Descripcion Orden de trabajo"
                  multiline
                  rows={3}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
          </Grid>
        </Paper>
        <Grid
          justify="center"
          container
          direction="row"
          className={classes.espaciado}
          item
          xs={12}
        >
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" fullWidth color="primary">
              Aceptar
            </Button>
          </Grid>
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" fullWidth color="primary">
              Imprimir Orden
            </Button>
          </Grid>
         
        </Grid>
      </Grid>
    </div>
  );
}
