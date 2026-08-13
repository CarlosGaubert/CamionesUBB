import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Swal from "sweetalert2";
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

export default function RutasActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [origen, setOrigen] = React.useState("");
  const [origenItem, setOrigenItem] = React.useState([]);
  const [seccion, setSeccion] = React.useState("");
  const [seccionItem, setSeccionItem] = React.useState([]);
  const [destino, setDestino] = React.useState("");
  const [destinoItem, setDestinoItem] = React.useState([]);
  const [formula, setFormula] = React.useState("1");
  const handleChangeFormula = (event) => {
    setFormula(event.target.value);
  };

  useEffect(() => {
    cargarOrigen();
  }, []);
  const cargarOrigen = async () => {
    const { data } = await Axios.get("/api/recorrido/");
    setOrigenItem(data.data);
    return null;
  };
  const cargarOrigenByOrigen = async (origen) => {
    const { data } = await Axios.get(
      "/api/recorrido/" + origen
    );
    setSeccionItem(data.data);
    return null;
  };

  const cargarOrigenByOrigenSeccion = async (origen, seccion) => {
    const { data } = await Axios.get(
      "/api/recorrido/destino/" + origen + "&" + seccion
    );
    setDestinoItem(data.data);
    return null;
  };

  const handleChangeOrigen = (event) => {
    setOrigen(event.target.value);

    try {
      cargarOrigenByOrigen(event.target.value);
    } catch (error) {}
  };

  const handleChangeSeccion = (event) => {
    setSeccion(event.target.value);
    try {
      cargarOrigenByOrigenSeccion(origen, event.target.value);
    } catch (error) {}
  };

  const handleChangeDestino = (event) => {
    setDestino(event.target.value);

    try {
      const datosRuta = destinoItem.find(
        (ruta) =>
          ruta.Origen === origen &&
          ruta.Seccion === seccion &&
          ruta.Destino === event.target.value
      );

      document.getElementById("origen").value = datosRuta.Origen;
      document.getElementById("origen").focus();
      document.getElementById("seccion").value = datosRuta.Seccion;
      document.getElementById("seccion").focus();
      document.getElementById("destino").value = datosRuta.Destino;
      document.getElementById("destino").focus();
      document.getElementById("kmRipio").value = datosRuta.Km_Ripio;
      document.getElementById("kmRipio").focus();
      document.getElementById("kmTotal").value = datosRuta.Total_Km;
      document.getElementById("kmTotal").focus();
      document.getElementById("observacion").value = datosRuta.Observacion;
      document.getElementById("observacion").focus();
      setFormula(String(datosRuta.Formula));
    } catch (error) {
      console.log(error);
    }
  };

  const switchColor = async (evt) => {
    switch (evt.target.innerText) {
      case "INGRESO":
        setColorIngreso("secondary");
        setColorModificacion("primary");
        setColorEliminar("primary");
        setSwitchCombo(false);
        document.getElementById("aBoton").innerHTML = "GRABAR INGRESO";
        setActionButton("Guardar");
        break;
      case "MODIFICACIÓN":
        setColorIngreso("primary");
        setColorModificacion("secondary");
        setColorEliminar("primary");
        setSwitchCombo(true);
        document.getElementById("aBoton").innerHTML = "MODIFICAR INGRESO";
        setActionButton("Modificar");
        break;
      case "ELIMINACIÓN":
        setColorIngreso("primary");
        setColorModificacion("primary");
        setColorEliminar("secondary");
        setSwitchCombo(true);
        document.getElementById("aBoton").innerHTML = "ELIMINAR INGRESO";
        setActionButton("Eliminar");
        break;
      default:
        break;
    }
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (data.kmRipio === "" || data.kmRipio === undefined)
      mensajeDatosFaltantes += " - Falta ingresar kilometro ripio.<br>";
    if (data.kmTotal === "" || data.kmTotal === undefined)
      mensajeDatosFaltantes += " - Falta ingresar kilometro total.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar observación.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.origen === "" || data.origen === undefined)
          mensajeDatosFaltantes += " - Falta ingresar origen.<br>";
        if (data.seccion === "" || data.seccion === undefined)
          mensajeDatosFaltantes += " - Falta ingresar sección.<br>";
        if (data.destino === "" || data.destino === undefined)
          mensajeDatosFaltantes += " - Falta ingresar destino.<br>";

        if (mensajeDatosFaltantes.length > 0) {
          Swal.fire({
            icon: "warning",
            title: "Datos vacios.",
            html:
              "<div style='text-align: left;'>" +
              mensajeDatosFaltantes +
              "</div>",
            customClass: {
              popup: "format-pre",
            },
          });
        } else {
          let pavimento = parseInt(data.kmTotal) - parseInt(data.kmRipio);
          Axios.post("/api/recorrido/", {
            Origen: data.origen,
            Destino: data.destino,
            Seccion: data.seccion,
            Km_Ripio: data.kmRipio,
            Km_Pavimento: pavimento,
            Total_Km: data.kmTotal,
            Formula: formula,
            Observacion: data.observacion,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Ruta registrado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarOrigen();
              setSeccion("");
              setDestino("");
              setSeccionItem([]);
              setDestinoItem([]);

              reset();
            })
            .catch((error) => {
              Swal.fire({
                title: "Error !",
                text: error.response.data.message,
                icon: "error",
              });
            });
        }

        break;
      case "Modificar":
        if (mensajeDatosFaltantes.length > 0) {
          Swal.fire({
            icon: "warning",
            title: "Datos vacios.",
            html:
              "<div style='text-align: left;'>" +
              mensajeDatosFaltantes +
              "</div>",
            customClass: {
              popup: "format-pre",
            },
          });
        } else {
          if (origen !== "" || seccion !== "" || destino !== "") {
            console.log(origen, seccion, destino)
            let pavimento = parseInt(data.kmTotal) - parseInt(data.kmRipio);
            Axios.put(`/api/recorrido/${origen}&${destino}&${seccion}`, {
              Km_Ripio: data.kmRipio,
              Km_Pavimento: pavimento,
              Total_Km: data.kmTotal,
              Formula: formula,
              Observacion: data.observacion,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Ruta modificado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarOrigen();
                cargarOrigenByOrigen(origen)
                cargarOrigenByOrigenSeccion(origen,seccion)
              })
              .catch((error) => {
                Swal.fire({
                  title: "Cuidado !",
                  text: error,
                  icon: "warning",
                });
              });
          } else {
            Swal.fire({
              title: "Error !",
              text: "Debe seleccionar alguna ruta",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (mensajeDatosFaltantes.length > 0) {
          Swal.fire({
            icon: "warning",
            title: "Datos vacios.",
            html:
              "<div style='text-align: left;'>" +
              mensajeDatosFaltantes +
              "</div>",
            customClass: {
              popup: "format-pre",
            },
          });
        } else {
          if (origen !== "" || seccion !== "" || destino !== "") {
            Axios.delete("/api/recorrido/" + origen + "&" + destino + "&" + seccion)
              .then((response) => {
                Swal.fire({
                  title: "Empleado eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarOrigen();
                setSeccion("");
                setDestino("");
                setSeccionItem([]);
                setDestinoItem([]);
                setOrigen("")
                reset();
              })
              .catch((error) => {
                Swal.fire({
                  title: "Cuidado !",
                  text: "Ocurrio un error inesperado",
                  icon: "warning",
                });
              });
          } else {
            Swal.fire({
              title: "Error !",
              text: "Debe seleccionar alguna ruta",
              icon: "error",
            });
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={4}
            container
            className={classes.espaciado}
            direction="row"
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorIngreso}
            >
              Ingreso
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            container
            className={classes.espaciado}
            direction="row"
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorModificacion}
            >
              Modificación
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            container
            className={classes.espaciado}
            direction="row"
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorEliminar}
            >
              Eliminación
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                {!switchCombo ? null : (
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
                      <FormControl
                        className={classes.espaciado2}
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel id="primerCamion">Origen</InputLabel>
                        <Select
                          labelId="numeroBoletaform"
                          id="numeroBoletaform"
                          value={origen}
                          onChange={handleChangeOrigen}
                          label="Origen"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {origenItem
                            ? origenItem.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={item.Origen}
                                    value={item.Origen}
                                  >
                                    {item.Origen}
                                  </MenuItem>
                                );
                              })
                            : null}
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
                      <FormControl
                        className={classes.espaciado2}
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel id="primerCamion">Sección</InputLabel>
                        <Select
                          labelId="numeroBoletaform"
                          id="numeroBoletaform"
                          value={seccion}
                          onChange={handleChangeSeccion}
                          label="Sección"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {seccionItem
                            ? seccionItem.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={item.Seccion}
                                    value={item.Seccion}
                                  >
                                    {item.Seccion}
                                  </MenuItem>
                                );
                              })
                            : null}
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
                      <FormControl
                        className={classes.espaciado2}
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel id="primerCamion">Destino</InputLabel>
                        <Select
                          labelId="numeroBoletaform"
                          id="numeroBoletaform"
                          value={destino}
                          onChange={handleChangeDestino}
                          label="Destino"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {destinoItem
                            ? destinoItem.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={item.Destino}
                                    value={item.Destino}
                                  >
                                    {item.Destino}
                                  </MenuItem>
                                );
                              })
                            : null}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                )}
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
                    id="origen"
                    disabled={switchCombo}
                    {...register("origen")}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    type="number"
                    id="seccion"
                    disabled={switchCombo}
                    {...register("seccion")}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    id="destino"
                    disabled={switchCombo}
                    {...register("destino")}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    id="kmRipio"
                    {...register("kmRipio")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    type="number"
                    label="Km Ripio"
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
                    id="kmTotal"
                    {...register("kmTotal")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    type="number"
                    label="Km Total"
                    variant="outlined"
                  />
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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Ruta desde-hasta</FormLabel>
                    <RadioGroup
                      row
                      value={formula}
                      aria-label="position"
                      name="position"
                      onChange={handleChangeFormula}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="secondary" />}
                        label="Bosque - Cancha de acopio"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="secondary" />}
                        label="Cancha de acopio - Cancha de acopio"
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
                    {...register("observacion")}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                <Button
                  fullWidth
                  id="aBoton"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Grabar Ingresos
                </Button>
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
                <Button fullWidth onClick={() => reset()} variant="contained" color="primary">
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
