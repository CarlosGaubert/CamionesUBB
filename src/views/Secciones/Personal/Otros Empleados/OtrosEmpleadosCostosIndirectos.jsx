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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import { useForm } from "react-hook-form";
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
export default function OtrosEmpleadosCostosIndirectos() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDateContrato, setSelectedDateContrato] = React.useState(
    new Date()
  );
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [fechas, setFechas] = React.useState("");
  const [fechasItem, setFechasItem] = React.useState([]);

  const handleChangeFechas = (event) => {
    setFechas(event.target.value);

    try {
      const datosCostoIndirecto = fechasItem.find(
        (fecha) => fecha.FECHA_PAGO === event.target.value
      );

      document.getElementById("costo").value = datosCostoIndirecto.MONTO_DISTRIBUCION;
      document.getElementById("costo").focus();

    } catch (error) {
      
    }
  };

  useEffect(() => {
    cargarCostosIndirectos();
  }, []);
  const cargarCostosIndirectos = async () => {
    const { data } = await Axios.get(
      "/api/costodistribuir/"
    );
    setFechasItem(data.data);
    return null;
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

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (data.costo === "" || data.costo === undefined)
      mensajeDatosFaltantes += " - Falta ingresar costo.<br>";

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
          Axios.post("/api/costodistribuir/", {
            FECHA_PAGO: selectedDateContrato,
            MONTO_DISTRIBUCION: data.costo,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Costo indireco registrado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarCostosIndirectos();
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
          if (fechas !== "") {
            Axios.put(`/api/costodistribuir/${fechas}`, {
              MONTO_DISTRIBUCION: data.costo,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Costo indirecto modificado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarCostosIndirectos()
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
              text: "Debe seleccionar alguna fecha de costo indirecto",
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
          if (fechas !== "") {
            Axios.delete("/api/costodistribuir/" + fechas)
              .then((response) => {
                Swal.fire({
                  title: "Costo indirecto eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarCostosIndirectos()
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
              text: "Debe seleccionar alguna fecha de costo indirecto",
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
              <Grid item container xs={12}>
                {!switchCombo ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                      className={classes.espaciado2}
                      container
                      justify="space-around"
                    >
                      <KeyboardDatePicker
                        id="mes"
                        label="Mes"
                        format="dd/MM/yyyy"
                        fullWidth
                        value={selectedDateContrato}
                        onChange={handleDateChangeContrato}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                ) : (
                  <FormControl
                    className={classes.espaciado2}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="primerCamion">Mes</InputLabel>
                    <Select
                      labelId="numeroBoletaform"
                      id="numeroBoletaform"
                      value={fechas}
                      onChange={handleChangeFechas}
                      label="Mes"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {fechasItem
                        ? fechasItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.FECHA_PAGO}
                                value={item.FECHA_PAGO}
                              >
                                {item.FECHA_PAGO}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  required
                  id="costo"
                  {...register("costo")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciado2}
                  fullWidth
                  label="Costo"
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
