import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
export default function ResultadoCostos() {
  const classes = useStyles();
  const [inicioMes, setInicioMes] = React.useState("");
  const [finalMes, setFinalMes] = React.useState("");

  const [inicioAnio, setInicioAnio] = React.useState("");
  const [InicioAnios, setInicioAnios] = React.useState([]);
  const [finalAnio, setFinalAnio] = React.useState("");
  const [camion, setCamion] = React.useState("");
  const [conductor, setConductor] = React.useState("");

  const handleChangeConductor = (event) => {
    setConductor(event.target.value);
  };
  const handleChangeCamion = (event) => {
    setCamion(event.target.value);
  };
  const handleChangeFinalAnio = (event) => {
    setFinalAnio(event.target.value);
  };
  const handleChangeInicioAnio = (event) => {
    setInicioAnio(event.target.value);
  };
  const handleChangeFinalMes = (event) => {
    setFinalMes(event.target.value);
  };
  const handleChangeInicioMes = (event) => {
    setInicioMes(event.target.value);
  };

  useEffect(() => {
    llamar();
    function llamar() {
      const year = new Date().getFullYear();
      const arreglo = [];
      for (let index = year; index >= 1997; index--) {
        arreglo.push(index);
      }
      setInicioAnios(arreglo);
    }
  }, []);
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Paper elevation={3} fullWidth className={classes.paper}>
          <Grid className={classes.espaciado} container justify="center">
            <Grid
              item
              xs={12}
              md={12}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Seleccione Fecha</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="unMes"
                >
                  <FormControlLabel
                    value="unMes"
                    control={<Radio color="secondary" />}
                    label="Un Mes"
                  />

                  <FormControlLabel
                    value="rangoMes"
                    control={<Radio color="secondary" />}
                    label="Rango Mes"
                  />
                </RadioGroup>
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.titulo}
                    variant="h6"
                    component="h2"
                  >
                    Inicio Rango
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
                        <InputLabel>Mes</InputLabel>
                        <Select
                          labelId="Inicio Mes"
                          id="inicioMes"
                          value={inicioMes}
                          onChange={handleChangeInicioMes}
                          label="Mes"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          <MenuItem value={1}>Enero</MenuItem>
                          <MenuItem value={2}>Febrero</MenuItem>
                          <MenuItem value={3}>Marzo</MenuItem>
                          <MenuItem value={4}>Abril</MenuItem>
                          <MenuItem value={5}>Mayo</MenuItem>
                          <MenuItem value={6}>Junio</MenuItem>
                          <MenuItem value={7}>Julio</MenuItem>
                          <MenuItem value={8}>Agosto</MenuItem>
                          <MenuItem value={9}>Septiembre</MenuItem>
                          <MenuItem value={10}>Octubre</MenuItem>
                          <MenuItem value={11}>Noviembre</MenuItem>
                          <MenuItem value={12}>Diciembre</MenuItem>
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
                        <InputLabel>Año</InputLabel>
                        <Select
                          labelId="Inicio Año"
                          id="inicioAnio"
                          value={inicioAnio}
                          onChange={handleChangeInicioAnio}
                          label="Año"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {InicioAnios ? (
                            InicioAnios.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No existen elementos</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
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
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.titulo}
                    variant="h6"
                    component="h2"
                  >
                    Final Rango
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
                        <InputLabel>Mes</InputLabel>
                        <Select
                          labelId="Inicio Mes"
                          id="inicioMes"
                          value={finalMes}
                          onChange={handleChangeFinalMes}
                          label="Mes"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          <MenuItem value={1}>Enero</MenuItem>
                          <MenuItem value={2}>Febrero</MenuItem>
                          <MenuItem value={3}>Marzo</MenuItem>
                          <MenuItem value={4}>Abril</MenuItem>
                          <MenuItem value={5}>Mayo</MenuItem>
                          <MenuItem value={6}>Junio</MenuItem>
                          <MenuItem value={7}>Julio</MenuItem>
                          <MenuItem value={8}>Agosto</MenuItem>
                          <MenuItem value={9}>Septiembre</MenuItem>
                          <MenuItem value={10}>Octubre</MenuItem>
                          <MenuItem value={11}>Noviembre</MenuItem>
                          <MenuItem value={12}>Diciembre</MenuItem>
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
                        <InputLabel>Año</InputLabel>
                        <Select
                          labelId="Inicio Año"
                          id="inicioAnio"
                          value={finalAnio}
                          onChange={handleChangeFinalAnio}
                          label="Año"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {InicioAnios ? (
                            InicioAnios.map((item) => (
                              <MenuItem value={item}>{item}</MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No existen elementos</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} fullWidth className={classes.paper}>
          <Grid className={classes.espaciado} container justify="center">
            <Grid
              item
              xs={12}
              md={6}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Card className={classes.card}>
                <CardContent>
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
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="position"
                          name="position"
                          defaultValue="costoEmpresa"
                        >
                          <FormControlLabel
                            value="costoEmpresa"
                            control={<Radio color="secondary" />}
                            label="Costo Empresa"
                          />
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
                  </Grid>
                </CardContent>
              </Card>
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
              <Card className={classes.card}>
                <CardContent>
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
                        <InputLabel>Camión</InputLabel>
                        <Select
                          labelId="Inicio Año"
                          id="camion"
                          value={camion}
                          onChange={handleChangeCamion}
                          label="Camión"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {['camion 1', 'camion 2', 'camion 3', 'camion 4'].map((item,index) => (
                            <MenuItem value={index+1}>
                            {item}
                          </MenuItem>
                          ))}
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
                        <InputLabel>Conductor</InputLabel>
                        <Select
                          labelId="Inicio Año"
                          id="conductor"
                          value={conductor}
                          onChange={handleChangeConductor}
                          label="Conductor"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {['Conductor 1', 'Conductor 2', 'Conductor 3', 'Conductor 4'].map((item,index) => (
                            <MenuItem value={index+1}>
                            {item}
                          </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
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
            xs={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Button fullWidth variant="contained" color="primary">
              Ver Grafico
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
