import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
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
  espaciadoPaper:{
    padding: theme.spacing(0.0001)
  },
}));
export default function ADCListado() {
  const classes = useStyles();

  return (
    <div>
      <Grid justify="center" container item>
        <Grid xs={12} md={12} className={classes.espaciadoPaper}>
          <Paper elevation={10} fullWidth className={classes.paper}>
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
                </RadioGroup>
              </FormControl>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={12} md={12} className={classes.espaciadoPaper}>
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
        </Grid>
        <Grid xs={12} md={12} className={classes.espaciadoPaper}>
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
                  defaultValue="todasFechas"
                >
                  <FormControlLabel
                    value="todasFechas"
                    control={<Radio color="secondary" />}
                    label="Todas las Fechas"
                  />
                  <FormControlLabel
                    value="rangoFecha"
                    control={<Radio color="secondary" />}
                    label="Rango de Fecha"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
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
