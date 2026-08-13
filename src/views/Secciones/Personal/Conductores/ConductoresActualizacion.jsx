import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import { useForm } from "react-hook-form";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import Swal from "sweetalert2";
import { validate } from "rut.js";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    margin: theme.spacing(1),
  },

  botones: {
    padding: theme.spacing(1),
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
export default function ConductoresActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDateControlLicencia, setSelectedDateControlLicencia] =
    React.useState(new Date());
  const [selectedDateNacimiento, setSelectedDateNacimiento] = React.useState(
    new Date()
  );
  const [selectedDateContrato, setSelectedDateContrato] = React.useState(
    new Date()
  );
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [choferes, setChoferes] = React.useState("");
  const [choferesItem, setChoferesItem] = React.useState([]);

  useEffect(() => {
    cargarChoferes();
  }, []);
  const cargarChoferes = async () => {
    const { data } = await Axios.get("/api/chofer/");
    setChoferesItem(data.data);
    return null;
  };

  const handleChangeChoferes = (event) => {
    setChoferes(event.target.value);

    try {
      const datosChofer = choferesItem.find(
        (chofer) => chofer.RUT_EMPLEADO === event.target.value
      );

      //setSelectedDateControlLicencia(datosChofer.FECHA_CONTROL_LICENCIA)
      //setSelectedDateNacimiento(datosChofer.FECHA_NACIMIENTO)
      //setSelectedDateContrato(datosChofer.FECHA_CONTRATO)

      document.getElementById("licenciaConducir").value = datosChofer.NRO_LICENCIA_CONDUCIR;
      document.getElementById("licenciaConducir").focus();
      document.getElementById("claseLicencia").value = datosChofer.CLASE_LICENCIA;
      document.getElementById("claseLicencia").focus();
      document.getElementById("primerNombre").value = datosChofer.NOMBRE_EMPLEADO;
      document.getElementById("primerNombre").focus();
      document.getElementById("segundoNombre").value = datosChofer.NOMBRE_EMPLEADO2;
      document.getElementById("segundoNombre").focus();
      document.getElementById("apellidoPaterno").value = datosChofer.APELLIDO_EMPLEADO;
      document.getElementById("apellidoPaterno").focus();
      document.getElementById("apellidoMaterno").value = datosChofer.APELLIDO_EMPLEADO2;
      document.getElementById("apellidoMaterno").focus();
      document.getElementById("direccion").value = datosChofer.DIRECCION_EMPLEADO;
      document.getElementById("direccion").focus();
      document.getElementById("telefono").value = datosChofer.FONO_EMPLEADO;
      document.getElementById("telefono").focus();
      document.getElementById("participacion").value = datosChofer.PORCENTAJE_PARTICIPACION;
      document.getElementById("participacion").focus();
      document.getElementById("observacion").value = datosChofer.OBSERVACION_CHOFERES;
      document.getElementById("observacion").focus();

    } catch (error) {
      
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

  const handleDateChangeContrato = (date) => {
    setSelectedDateContrato(date);
  };

  const handleDateChangeNacimiento = (date) => {
    setSelectedDateNacimiento(date);
  };

  const handleDateChangeControlLicencia = (date) => {
    setSelectedDateControlLicencia(date);
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (data.licenciaConducir === "" || data.licenciaConducir === undefined)
      mensajeDatosFaltantes += " - Falta ingresar licencia de conducir.<br>";
    if (data.claseLicencia === "" || data.claseLicencia === undefined)
      mensajeDatosFaltantes += " - Falta ingresar clase de licencia.<br>";
    if (data.primerNombre === "" || data.primerNombre === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar primer nombre del chofer.<br>";
    if (data.segundoNombre === "" || data.segundoNombre === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar segundo nombre del chofer.<br>";
    if (data.apellidoPaterno === "" || data.apellidoPaterno === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar primer apellido del chofer.<br>";
    if (data.apellidoMaterno === "" || data.apellidoMaterno === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar segundo apellido del chofer.<br>";
    if (data.direccion === "" || data.direccion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar direccion del chofer.<br>";
    if (data.telefono === "" || data.telefono === undefined)
      mensajeDatosFaltantes += " - Falta ingresar telefono del chofer.<br>";
    if (data.participacion === "" || data.participacion === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar porcentaje de participacion del chofer.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar observación del chofer.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.rut === "" || data.rut === undefined)
          mensajeDatosFaltantes =
            " - Falta ingresar rut del chofer.<br>" + mensajeDatosFaltantes;
        if (validate(data.rut)) {
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
            const dv = data.rut.charAt(data.rut.length - 1);
            const rutsolo = data.rut.substring(0, data.rut.length - 1);

            Axios.post("/api/chofer/", {
              RUT_EMPLEADO: rutsolo,
              NRO_LICENCIA_CONDUCIR : data.licenciaConducir,
              
              NOMBRE_EMPLEADO: data.primerNombre,
              NOMBRE_EMPLEADO2: data.segundoNombre,
              APELLIDO_EMPLEADO: data.apellidoPaterno,
              APELLIDO_EMPLEADO2: data.apellidoMaterno,
              DIRECCION_EMPLEADO: data.direccion,
              FONO_EMPLEADO: data.telefono,
              OBSERVAVION_EMPLEADO: data.observacion,
              FECHA_CONTRATO: selectedDateContrato,
              CLASE_LICENCIA: data.claseLicencia,
              OBSERVACION_CHOFERES: data.observacion,
              FECHA_CONTROL_LICENCIA: selectedDateControlLicencia,
              FECHA_NACIMIENTO: selectedDateNacimiento,
              DIGITO_CONDUCTOR: dv,
              PORCENTAJE_PARTICIPACION: data.participacion,
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Chofer creado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarChoferes();
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
        } else {
          Swal.fire({
            title: "Error !",
            text: "Rut no valido",
            icon: "error",
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
          if (choferes !== "") {
            Axios.put(`/api/chofer/${choferes}`, {
              NRO_LICENCIA_CONDUCIR : data.licenciaConducir,
              NOMBRE_EMPLEADO: data.primerNombre,
              NOMBRE_EMPLEADO2: data.segundoNombre,
              APELLIDO_EMPLEADO: data.apellidoPaterno,
              APELLIDO_EMPLEADO2: data.apellidoMaterno,
              DIRECCION_EMPLEADO: data.direccion,
              FONO_EMPLEADO: data.telefono,
              OBSERVAVION_EMPLEADO: data.observacion,
              FECHA_CONTRATO: selectedDateContrato,
              CLASE_LICENCIA: data.claseLicencia,
              OBSERVACION_CHOFERES: data.observacion,
              FECHA_CONTROL_LICENCIA: selectedDateControlLicencia,
              FECHA_NACIMIENTO: selectedDateNacimiento,
              PORCENTAJE_PARTICIPACION: data.participacion,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Chofer modificada",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarChoferes();
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
              text: "Debe seleccionar algun chofer",
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
          if (choferes !== "") {
            Axios.delete("/api/chofer/" + choferes)
              .then((response) => {
                Swal.fire({
                  title: "Chofer eliminada",
                  text: response.data.message,
                  icon: "success",
                });
                cargarChoferes();
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
              text: "Debe seleccionar alguna chofer",
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
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} container direction="row" justify="center">
          <Grid
            item
            xs={4}
            container
            className={classes.botones}
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
            className={classes.botones}
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
            className={classes.botones}
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
          <Paper elevation={10} className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Datos generales
            </Typography>
            <Grid item container xs={12}>
              <Grid item container md={4} xs={12}>
                {!switchCombo ? (
                  <TextField
                    
                    id="rut"
                    {...register("rut")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.espaciado}
                    fullWidth
                    label="Rut"
                    variant="outlined"
                  />
                ) : (
                  <FormControl
                    className={classes.espaciado}
                    variant="outlined"
                    fullWidth
                  >
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
                                {item.NOMBRE_EMPLEADO +
                                  " " +
                                  item.APELLIDO_EMPLEADO}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  type="number"
                  id="licenciaConducir"
                  {...register("licenciaConducir")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Licencia de Conducir"
                  variant="outlined"
                />
                <TextField
                  
                  id="claseLicencia"
                  {...register("claseLicencia")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Clase Licencia"
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    className={classes.espaciado}
                    container
                    justify="space-around"
                  >
                    <KeyboardDatePicker
                      id="fechaControlLicencia"
                      label="Fecha Control Licencia"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={selectedDateControlLicencia}
                      onChange={handleDateChangeControlLicencia}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item container md={4} xs={12}>
                <TextField
                  
                  id="primerNombre"
                  {...register("primerNombre")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Primer Nombre"
                  variant="outlined"
                />
                <TextField
                  
                  id="segundoNombre"
                  {...register("segundoNombre")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Segundo Nombre"
                  variant="outlined"
                />
                <TextField
                  
                  id="apellidoPaterno"
                  {...register("apellidoPaterno")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Apellido Paterno"
                  variant="outlined"
                />
                <TextField
                  id="apellidoMaterno"
                  {...register("apellidoMaterno")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Apellido Materno"
                  variant="outlined"
                />
              </Grid>
              <Grid item container md={4} xs={12}>
                <TextField
                  
                  id="direccion"
                  {...register("direccion")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Dirección"
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    className={classes.espaciado}
                    container
                    justify="space-around"
                  >
                    <KeyboardDatePicker
                      id="fechaNacimiento"
                      label="Fecha Nacimiento"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={selectedDateNacimiento}
                      onChange={handleDateChangeNacimiento}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <TextField
                  
                  id="telefono"
                  {...register("telefono")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado}
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    className={classes.espaciado}
                    container
                    justify="space-around"
                  >
                    <KeyboardDatePicker
                      id="fechaContrato"
                      label="Fecha Contrato"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={selectedDateContrato}
                      onChange={handleDateChangeContrato}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item container xs={12}>
                <FormControl
                  fullWidth
                  className={classes.espaciado}
                  variant="outlined"
                >
                  <OutlinedInput
                    type="number"
                    id="participacion"
                    {...register("participacion")}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    inputProps={{
                      "aria-label": "Paticipación",
                    }}
                    labelWidth={0}
                  />
                  <FormHelperText id="outlined-weight-helper-text">
                    Paticipación
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item container xs={12}>
                <TextField
                  id="observacion"
                  {...register("observacion")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Observación"
                  multiline
                  className={classes.espaciado}
                  rows={3}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>

      
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                id="aBoton"
                fullWidth
                color="primary"
              >
                Grabar ingreso
              </Button>
            </Grid>
       
        </Grid>
      </form>
    </div>
  );
}
