import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "center",
    width: "100%",
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
export default function RegistrarEventoActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [choferes, setChoferes] = React.useState("");
  const [choferesItem, setChoferesItem] = React.useState([]);
  const [patente, setPatente] = React.useState("");
  const [quienPaga, setQuienPaga] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDateFinalizacion, setSelectedDateFinalizacion] =
    React.useState(new Date());
  const [selectedDateHora, setSelectedDateHora] = React.useState(new Date());
  const [evento, setEvento] = React.useState("");
  const [eventoItem, setEventoItem] = React.useState([]);
  const [camionesItem, setCamionesItem] = React.useState([]);
  const [fechaEvento, setFechaEvento] = React.useState("");
  const [fechaEventoItem, setFechaEventoItem] = React.useState([]);
  const [horaEvento, setHoraEvento] = React.useState("");
  const [horaEventoItem, setHoraEventoItem] = React.useState([]);

  const handleChangeHoraEvento = (event) => {
    setHoraEvento(event.target.value);

    try {
      const datosHistoria = horaEventoItem.find(
        (historia) =>
          historia.RUT_EMPLEADO === choferes &&
          historia.FECHA_EVENTO === fechaEvento &&
          historia.HORA_EVENTO === event.target.value
      );

      setEvento(datosHistoria.CODIGO_EVENTO);
      setPatente(datosHistoria.CAMION_EVENTO);
      document.getElementById("costoEvento").value = datosHistoria.COSTO_EVENTO;
      document.getElementById("costoEvento").focus();
      document.getElementById("observacion").value =
        datosHistoria.OBSERVACION_HISTORIAL;
      document.getElementById("observacion").focus();
      setQuienPaga(datosHistoria.QUIEN_PAGA);
      var separacion = datosHistoria.FINALIZACION_EVENTO.split("-");
      var fechaFix = separacion[2] + "/" + separacion[1] + "/" + separacion[0];
      console.log(fechaFix);
      setSelectedDateFinalizacion(new Date(fechaFix));
    } catch (error) {}
  };

  const handleChangeFechaEvento = (event) => {
    setFechaEvento(event.target.value);
    cargarHistoriaChoferFechaHora(choferes, event.target.value);
  };

  const cargarHistoriaChoferFechaHora = async (rutChofer, fecha) => {
    const { data } = await Axios.get(
      "http://localhost:4000/api/historiachofer/fecha/" +
        rutChofer +
        "&" +
        fecha
    );
    setHoraEventoItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/camion/");
    setCamionesItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarEvento();
  }, []);

  const cargarEvento = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/eventochofer/");
    setEventoItem(data.data);
    return null;
  };
  useEffect(() => {
    cargarChoferes();
  }, []);

  const cargarChoferes = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/chofer/");
    setChoferesItem(data.data);
    return null;
  };

  const handleChangeChoferes = (event) => {
    setChoferes(event.target.value);
    try {
      const datosChofer = choferesItem.find(
        (chofer) => chofer.RUT_EMPLEADO === event.target.value
      );

      document.getElementById("nombre").value =
        datosChofer.NOMBRE_EMPLEADO + " " + datosChofer.APELLIDO_EMPLEADO;
      document.getElementById("nombre").focus();
      document.getElementById("licenciaConducir").value =
        datosChofer.NRO_LICENCIA_CONDUCIR;
      document.getElementById("licenciaConducir").focus();
      document.getElementById("claseLicencia").value =
        datosChofer.CLASE_LICENCIA;
      document.getElementById("claseLicencia").focus();
    } catch (error) {}

    //llamar a eventos
    setHoraEventoItem([]);
    cargarHistoriaChoferFecha(event.target.value);
  };

  const cargarHistoriaChoferFecha = async (rutChofer) => {
    const { data } = await Axios.get(
      "http://localhost:4000/api/historiachofer/" + rutChofer
    );
    setFechaEventoItem(data.data);
    return null;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateChangeHora = (date) => {
    setSelectedDateHora(date);
  };

  const handleDateChangeFinalizacion = (date) => {
    setSelectedDateFinalizacion(date);
  };
  const handleChangeQuienPaga = (event) => {
    setQuienPaga(event.target.value);
  };
  const handleChangePatente = (event) => {
    setPatente(event.target.value);
  };
  const handleChangeEvento = (event) => {
    setEvento(event.target.value);
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
    var nombre = "";
    var digito = 0;

    if (choferes === "")
      mensajeDatosFaltantes += " - Debe seleccionar un chofer.<br>";
    if (patente === "")
      mensajeDatosFaltantes += " - Debe seleccionar un camión.<br>";
    if (quienPaga === "")
      mensajeDatosFaltantes += " - Debe seleccionar quién paga.<br>";
    if (evento === "")
      mensajeDatosFaltantes += " - Debe seleccionar un tipo de evento.<br>";

    if (data.costoEvento === "" || data.costoEvento === undefined)
      mensajeDatosFaltantes += " - Debe ingresar un costo de evento.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes +=
        " - Debe ingresar una observación de evento.<br>";

    switch (actionButton) {
      case "Guardar":
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
          console.log("guardar");
          try {
            const datosChofer = choferesItem.find(
              (carro) => carro.RUT_EMPLEADO === choferes
            );
            nombre =
              datosChofer.NOMBRE_EMPLEADO +
              " " +
              datosChofer.APELLIDO_EMPLEADO +
              " " +
              datosChofer.APELLIDO_EMPLEADO2;
            digito = datosChofer.DIGITO_CONDUCTOR;
          } catch (error) {}

          Axios.post("http://localhost:4000/api/historiachofer/", {
            CODIGO_EVENTO: evento,
            RUT_EMPLEADO: choferes,
            OBSERVACION_HISTORIAL: data.observacion,
            FECHA_EVENTO: selectedDate,
            HORA_EVENTO:
              selectedDateHora.getHours() +
              ":" +
              selectedDateHora.getMinutes() +
              ":" +
              selectedDateHora.getSeconds(),
            COSTO_EVENTO: data.costoEvento,
            FINALIZACION_EVENTO: selectedDateFinalizacion,
            QUIEN_PAGA: quienPaga,
            CAMION_EVENTO: patente,
            Nombre_Empleado: nombre,
            DIGITO_conductor: digito,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Evento creado",
                  text: response.data.message,
                  icon: "success",
                });
                reset();
                setPatente("");
                cargarHistoriaChoferFecha(choferes);
              }
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
          if (fechaEvento !== "") {
            if (horaEvento !== "") {
              Axios.put(
                `http://localhost:4000/api/historiachofer/${choferes}&${fechaEvento}&${horaEvento}`,
                {
                  CODIGO_EVENTO: evento,
                  OBSERVACION_HISTORIAL: data.observacion,
                  COSTO_EVENTO: data.costoEvento,
                  FINALIZACION_EVENTO: selectedDateFinalizacion,
                  QUIEN_PAGA: quienPaga,
                  CAMION_EVENTO: patente,
                }
              )
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire({
                      title: "Evento modificado",
                      text: response.data.message,
                      icon: "success",
                    });
                  }
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
                text: "Debe seleccionar alguna hora de evento",
                icon: "error",
              });
            }
          } else {
            Swal.fire({
              title: "Error !",
              text: "Debe seleccionar alguna fecha de evento",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (fechaEvento !== "") {
          if (horaEvento !== "") {
            Axios.delete(
              "http://localhost:4000/api/historiachofer/" +
                choferes +
                "&" +
                fechaEvento + "&" + horaEvento
            )
              .then((response) => {
                Swal.fire({
                  title: "Evento eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarHistoriaChoferFecha(choferes)
                setHoraEventoItem([])
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
              text: "Debe seleccionar alguna hora de evento",
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Error !",
            text: "Debe seleccionar alguna fecha de evento",
            icon: "error",
          });
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
            xs={4}
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
            xs={4}
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
          <Paper elevation={10} fullWidth className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Datos Conductor
            </Typography>
            <Grid container justify="center">
              <Grid
                item
                md={6}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="primerCamion">Rut</InputLabel>
                  <Select
                    labelId="numeroBoletaform"
                    id="numeroBoletaform"
                    value={choferes}
                    onChange={handleChangeChoferes}
                    label="Rut"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    {choferesItem
                      ? choferesItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.RUT_EMPLEADO}
                              value={item.RUT_EMPLEADO}
                            >
                              {item.RUT_EMPLEADO}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <TextField
                  id="nombre"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <TextField
                  id="licenciaConducir"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  label="Licencia Conducir"
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <TextField
                  id="claseLicencia"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  label="Clase Licencia"
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              {!switchCombo ? null : (
                <Grid container justify="center">
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.espaciado}
                    justify="center"
                  >
                    <FormControl
                      className={classes.espaciado2}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Fecha evento</InputLabel>
                      <Select
                        labelId="primerCamion"
                        id="primerCamion"
                        value={fechaEvento}
                        onChange={handleChangeFechaEvento}
                        label="Fecha evento"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {fechaEventoItem
                          ? fechaEventoItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.FECHA_EVENTO}
                                  value={item.FECHA_EVENTO}
                                >
                                  {item.FECHA_EVENTO}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.espaciado}
                    justify="center"
                  >
                    {" "}
                    <FormControl
                      className={classes.espaciado2}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Hora evento</InputLabel>
                      <Select
                        labelId="primerCamion"
                        id="primerCamion"
                        value={horaEvento}
                        onChange={handleChangeHoraEvento}
                        label="Hora evento"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {horaEventoItem
                          ? horaEventoItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.HORA_EVENTO}
                                  value={item.HORA_EVENTO}
                                >
                                  {item.HORA_EVENTO}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
          <Paper elevation={10} fullWidth className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Tipo Evento
            </Typography>
            <Grid container justify="center">
              <Grid
                item
                md={12}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <FormControl
                  className={classes.espaciadoInput}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel id="primerCamion">Evento</InputLabel>
                  <Select
                    labelId="primerCamion"
                    id="primerCamion"
                    value={evento}
                    onChange={handleChangeEvento}
                    label="Evento"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    {eventoItem
                      ? eventoItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.CODIGO_EVENTO}
                              value={item.CODIGO_EVENTO}
                            >
                              {item.DESCRIPCION_EVENTO}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={10} fullWidth className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Datos Historial
            </Typography>
            <Grid container justify="center">
              <Grid
                item
                md={4}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="primerCamion">Camiones</InputLabel>
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
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <TextField
                  type="number"
                  id="costoEvento"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("costoEvento")}
                  fullWidth
                  label="Costo Evento"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Quién Paga</InputLabel>
                  <Select
                    labelId="quienPaga"
                    id="quienPaga"
                    value={quienPaga}
                    onChange={handleChangeQuienPaga}
                    label="Quién Paga"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    <MenuItem value="Empresa">Empresa</MenuItem>
                    <MenuItem value="Conductor">Conductor</MenuItem>
                    <MenuItem value="Seguro">Seguro</MenuItem>
                    <MenuItem value="Terceros">Terceros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {!switchCombo ? (
                <Grid container justify="center">
                  <Grid
                    item
                    md={4}
                    xs={12}
                    className={classes.espaciado}
                    justify="center"
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          id="fechaEvento"
                          label="Fecha Evento"
                          format="dd/MM/yyyy"
                          fullWidth
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                    className={classes.espaciado}
                    justify="center"
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardTimePicker
                          id="hora"
                          label="Hora evento"
                          fullWidth
                          value={selectedDateHora}
                          onChange={handleDateChangeHora}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              ) : null}

              <Grid
                item
                md={4}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      id="fechaFinalizacion"
                      label="Fecha finalización"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={selectedDateFinalizacion}
                      onChange={handleDateChangeFinalizacion}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                <TextField
                  id="observacion"
                  label="Oberservación"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("observacion")}
                  multiline
                  className={classes.espaciadoInput}
                  rows={3}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
            fullWidth
            type="submit"
            id="aBoton"
            className={classes.espaciado}
            variant="contained"
            color="primary"
          >
            Grabar Ingreso
          </Button>
        </Grid>
      </div>
    </form>
  );
}
