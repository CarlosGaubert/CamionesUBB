import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import { validate } from "rut.js";
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
  espaciado2: {
    margin: theme.spacing(1),
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
export default function OtrosEmpleadosActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [empleado, setEmpleado] = React.useState("");
  const [empleadoItem, setEmpleadoItem] = React.useState([]);
  const [selectedDateContrato, setSelectedDateContrato] = React.useState(
    new Date()
  );

  useEffect(() => {
    cargarEmpleado();
  }, []);
  const cargarEmpleado = async () => {
    const { data } = await Axios.get("/api/empleado/");
    setEmpleadoItem(data.data);
    return null;
  };

  const handleChangeEmpleado = (event) => {
    setEmpleado(event.target.value);


    try {
      const datosEmpleado = empleadoItem.find(
        (empleado) => empleado.RUT_EMPLEADO === event.target.value
      );

      document.getElementById("primerNombre").value = datosEmpleado.NOMBRE_EMPLEADO;
      document.getElementById("primerNombre").focus();
      document.getElementById("segundoNombre").value = datosEmpleado.NOMBRE_EMPLEADO2;
      document.getElementById("segundoNombre").focus();
      document.getElementById("apellidoPaterno").value = datosEmpleado.APELLIDO_EMPLEADO;
      document.getElementById("apellidoPaterno").focus();
      document.getElementById("apellidoMaterno").value = datosEmpleado.APELLIDO_EMPLEADO2;
      document.getElementById("apellidoMaterno").focus();
      document.getElementById("direccion").value = datosEmpleado.DIRECCION_EMPLEADO;
      document.getElementById("direccion").focus();
      document.getElementById("telefono").value = datosEmpleado.FONO_EMPLEADO;
      document.getElementById("telefono").focus();
      document.getElementById("observacion").value = datosEmpleado.OBSERVACION_EMPLEADO;
      document.getElementById("observacion").focus();
      document.getElementById("cargo").value = datosEmpleado.CARGO_EMPLEADO;
      document.getElementById("cargo").focus();
      var fecha = new Date(datosEmpleado.FECHA_CONTRATO )
      fecha.setDate(fecha.getDate() + 1)
      //setSelectedDateContrato(fecha)

    } catch (error) {
      
    }
  };



  const handleDateChangeContrato = (date) => {
    setSelectedDateContrato(date);
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

    if (data.primerNombre === "" || data.primerNombre === undefined)
      mensajeDatosFaltantes += " - Falta ingresar primer nombre.<br>";
    if (data.segundoNombre === "" || data.segundoNombre === undefined)
      mensajeDatosFaltantes += " - Falta ingresar segundo nombre.<br>";
    if (data.apellidoPaterno === "" || data.apellidoPaterno === undefined)
      mensajeDatosFaltantes += " - Falta ingresar primer apellido.<br>";
    if (data.apellidoMaterno === "" || data.apellidoMaterno === undefined)
      mensajeDatosFaltantes += " - Falta ingresar segundo apellido.<br>";
    if (data.direccion === "" || data.direccion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar dirección.<br>";
    if (data.telefono === "" || data.telefono === undefined)
      mensajeDatosFaltantes += " - Falta ingresar telefono.<br>";
    if (data.cargo === "" || data.cargo === undefined)
      mensajeDatosFaltantes += " - Falta ingresar cargo.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar observación.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.rut === "" || data.rut === undefined)
          mensajeDatosFaltantes += " - Falta ingresar rut.<br>";
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
            Axios.post("/api/empleado/", {
              RUT_EMPLEADO: rutsolo,
              NOMBRE_EMPLEADO: data.primerNombre,
              NOMBRE_EMPLEADO2: data.segundoNombre,
              APELLIDO_EMPLEADO: data.apellidoPaterno,
              APELLIDO_EMPLEADO2: data.apellidoMaterno,
              DIRECCION_EMPLEADO: data.direccion,
              FONO_EMPLEADO: data.telefono,
              OBSERVACION_EMPLEADO: data.observacion,
              FECHA_CONTRATO: selectedDateContrato,
              DIGITO_EMPLEADO: dv,
              CARGO_EMPLEADO: data.cargo,
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Empleado registrado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarEmpleado()
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
          if (empleado !== "") {
            Axios.put(`/api/empleado/${empleado}`, {
              NOMBRE_EMPLEADO: data.primerNombre,
              NOMBRE_EMPLEADO2: data.segundoNombre,
              APELLIDO_EMPLEADO: data.apellidoPaterno,
              APELLIDO_EMPLEADO2: data.apellidoMaterno,
              DIRECCION_EMPLEADO: data.direccion,
              FONO_EMPLEADO: data.telefono,
              OBSERVACION_EMPLEADO: data.observacion,
              FECHA_CONTRATO: selectedDateContrato,
              CARGO_EMPLEADO: data.cargo,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Empleado modificado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarEmpleado()
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
              text: "Debe seleccionar algun empleado",
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
          if (empleado !== "") {
            Axios.delete("/api/empleado/" + empleado)
              .then((response) => {
                Swal.fire({
                  title: "Empleado eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarEmpleado()
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
              text: "Debe seleccionar algun empleado",
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
        <Grid container justify="center">
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
          <Paper elevation={10} fullWidth className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Datos
            </Typography>
            <Grid item container xs={12}>
              <Grid item container xs={6}>
                {!switchCombo ? (
                  <TextField
                    id="rut"
                    {...register("rut")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.espaciado2}
                    fullWidth
                    label="Rut"
                    variant="outlined"
                  />
                ) : (
                  <FormControl
                    className={classes.espaciado2}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="primerCamion">Rut</InputLabel>
                    <Select
                      labelId="numeroBoletaform"
                      id="numeroBoletaform"
                      value={empleado}
                      onChange={handleChangeEmpleado}
                      label="Rut"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {empleadoItem
                        ? empleadoItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.RUT_EMPLEADO}
                                value={item.RUT_EMPLEADO}
                              >
                                {item.NOMBRE_EMPLEADO +
                                  " " +
                                  item.APELLIDO_EMPLEADO +
                                  " (" +
                                  item.RUT_EMPLEADO +
                                  "-" +
                                  item.DIGITO_EMPLEADO +
                                  ")"}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  id="primerNombre"
                  {...register("primerNombre")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
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
                  className={classes.espaciado2}
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
                  className={classes.espaciado2}
                  fullWidth
                  label="Apellido Paterno"
                  variant="outlined"
                />
              </Grid>

              <Grid item container xs={6}>
                <TextField
                  id="apellidoMaterno"
                  {...register("apellidoMaterno")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
                  fullWidth
                  label="Apellido Materno"
                  variant="outlined"
                />
                <TextField
                  id="direccion"
                  {...register("direccion")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
                  fullWidth
                  label="Dirección"
                  variant="outlined"
                />

                <TextField
                  id="telefono"
                  {...register("telefono")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    className={classes.espaciado2}
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
                <TextField
                  id="cargo"
                  {...register("cargo")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
                  fullWidth
                  label="Cargo"
                  variant="outlined"
                />
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
                  className={classes.espaciado2}
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
