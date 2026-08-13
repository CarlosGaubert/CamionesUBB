import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Axios from "axios";
import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

export default function CamionOdometroMensual() {
  const classes = useStyles();
  const [patente, setPatente] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [fechas, setFechas] = React.useState("");
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [odometrosItem, setOdometrosItem] = React.useState([]);
  const [camionesItem, setCamionesItem] = React.useState([]);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    Swal.fire(
      "Atencion!",
      "Este dato se debe ingresar el 1° de cada mes!",
      "warning"
    );
  }, []);

  const cargarOdometros = async (patente) => {
    const { data } = await Axios.get(
      "/api/odometro/" + patente
    );
    setOdometrosItem(data.data);
    return null;
  };
  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async (patente) => {
    const { data } = await Axios.get("/api/camion/");
    setCamionesItem(data.data);
    return null;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeFechas = (event) => {
    setFechas(event.target.value);

    const datosOdometro = odometrosItem.find(
      (camion) => camion.FECHA_ODOMETRO === event.target.value
    );
    try {
      document.getElementById("odometro").value = datosOdometro.ODOMETRO_CAMION;
      document.getElementById("odometro").focus();
    } catch (error) {}
  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);
    cargarOdometros(event.target.value);
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
    if (data.odometro === undefined)
      mensajeDatosFaltantes += " - Falta ingresar odómetro.<br>";
    if (patente === "")
      mensajeDatosFaltantes += " - Falta seleccionar un camión.<br>";

    switch (actionButton) {
      case "Guardar":
        console.log("guardar");
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
          Axios.post("/api/odometro/", {
            PATENTE_CAMION: patente,
            ODOMETRO_CAMION: data.odometro,
            FECHA_ODOMETRO: selectedDate,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Odómetro creado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarOdometros(patente)
              e.target.reset();
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
        console.log("modificar");
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
          if (patente !== "") {
            if (fechas !== "") {
              const formatFecha = fechas.split('-')
              const fechaFinal = formatFecha[2] + '-' + formatFecha[1] + '-' + formatFecha[0];
              Axios.put(
                `/api/odometro/${patente}&${fechaFinal}`,
                {
                  ODOMETRO_CAMION: data.odometro,
                }
              )
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire({
                      title: "Odometro modificado",
                      text: response.data.message,
                      icon: "success",
                    });
                  }
                  cargarOdometros(patente)
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
                text: "Debe seleccionar alguna fecha",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              title: "Error !",
              text: "Debe seleccionar algun camión",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (patente !== "") {
          if (fechas !== "") {
            const formatFecha = fechas.split('-')
              const fechaFinal = formatFecha[2] + '-' + formatFecha[1] + '-' + formatFecha[0];
            Axios.delete(
              "/api/odometro/" + patente + "&" + fechaFinal
            )
              .then((response) => {
                Swal.fire({
                  title: "Camion eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarOdometros(patente)
                e.target.reset();
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
              text: "Debe seleccionar alguna fecha",
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Error !",
            text: "Debe seleccionar algun camión",
            icon: "error",
          });
        }
        console.log("eliminar");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={12}>
          <Grid
            item
            xs={12}
            md={4}
            className={classes.espaciado}
            container
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
            xs={12}
            md={4}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              color={colorModificacion}
              fullWidth
            >
              Modificación
            </Button>
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
            <Button
              variant="contained"
              onClick={switchColor}
              color={colorEliminar}
              fullWidth
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
            <Paper fullWidth className={classes.paper}>
              <Grid item xs={12} container direction="row" justify="center">
                <Grid
                  item
                  xs={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.formControl}
                  >
                    <InputLabel id="primerCamion">Camiónes</InputLabel>
                    <Select
                      labelId="primerCamion"
                      id="primerCamion"
                      value={patente}
                      onChange={handleChangePatente}
                      label="Camiones"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {camionesItem
                        ? camionesItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.PATENTE_CAMION}
                                value={item.PATENTE_CAMION}
                              >
                                {item.PATENTE_CAMION}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>

                  {!switchCombo ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          margin="normal"
                          id="fechacompra"
                          className={classes.espaciadoInput}
                          label="Fecha compra"
                          format="dd/MM/yyyy"
                          fullWidth
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  ) : (
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel id="primerCamion">Fecha de compra</InputLabel>
                      <Select
                        labelId="primerCamion"
                        id="primerCamion"
                        value={fechas}
                        onChange={handleChangeFechas}
                        label="Fecha de compra"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {odometrosItem
                          ? odometrosItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.FECHA_ODOMETRO}
                                  value={item.FECHA_ODOMETRO}
                                >
                                  {item.FECHA_ODOMETRO}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  )}
                  <TextField
                    required
                    id="odometro"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("odometro")}
                    className={classes.espaciadoInput}
                    fullWidth
                    label="Odómetro"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    className={classes.espaciadoInput}
                    id="aBoton"
                    fullWidth
                    label="Ejes"
                    variant="contained"
                    color="primary"
                  >
                    Grabar ingreso
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
