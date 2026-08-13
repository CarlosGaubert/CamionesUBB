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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(1),
  },
  espaciado2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
export default function ConductoresSueldos() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [choferes, setChoferes] = React.useState("");
  const [choferesItem, setChoferesItem] = React.useState([]);
  const [fechaDePago, setFechaDePago] = React.useState("");
  const [sueldosChoferItem, setSueldosChoferItem] = React.useState([]);

  const handleChangeFechaDePago = (event) => {
    setFechaDePago(event.target.value);

    try {
      const datosSueldos = sueldosChoferItem.find(
        (sueldo) => sueldo.FECHA_PAGO === event.target.value
      );

      document.getElementById("sueldoBruto").value = datosSueldos.SUELDO_BRUTO;
      document.getElementById("sueldoBruto").focus();
      document.getElementById("provisionDesahucio").value =
        datosSueldos.PROVICION_DESAUCIO;
      document.getElementById("provisionDesahucio").focus();
      document.getElementById("provisionVacaciones").value =
        datosSueldos.PROVICION_VACACIONES;
      document.getElementById("provisionVacaciones").focus();
    } catch (error) {}
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
    } catch (error) {}

    try {
      cargarSueldos(event.target.value);
    } catch (error) {}
  };

  useEffect(() => {
    cargarChoferes();
  }, []);

  const cargarSueldos = async (rut) => {
    const { data } = await Axios.get(
      "/api/sueldochofer/" + rut
    );
    setSueldosChoferItem(data.data);
    return null;
  };

  const cargarChoferes = async () => {
    const { data } = await Axios.get("/api/chofer/");
    setChoferesItem(data.data);
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";
    if (choferes === "")
      mensajeDatosFaltantes += " - Debe seleccionar un chofer.<br>";
    if (data.sueldoBruto === "" || data.sueldoBruto === undefined)
      mensajeDatosFaltantes += " - Debe ingresar un sueldo bruto.<br>";
    if (data.provisionDesahucio === "" || data.provisionDesahucio === undefined)
      mensajeDatosFaltantes +=
        " - Debe ingresar una provision de desahucio.<br>";
    if (
      data.provisionVacaciones === "" ||
      data.provisionVacaciones === undefined
    )
      mensajeDatosFaltantes +=
        " - Debe ingresar una provisión de vacaciones.<br>";

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
          Axios.post("/api/sueldochofer/", {
            RUT_CHOFER: choferes,
            FECHA_PAGO: selectedDate,
            SUELDO_BRUTO: data.sueldoBruto,
            PROVICION_DESAUCIO: data.provisionDesahucio,
            PROVICION_VACACIONES: data.provisionVacaciones,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Sueldo creado",
                  text: response.data.message,
                  icon: "success",
                });
                setChoferes("");
                setFechaDePago("");
                reset();
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
          if (fechaDePago !== "") {
            Axios.put(
              `/api/sueldochofer/${choferes}&${fechaDePago}`,
              {
                SUELDO_BRUTO: data.sueldoBruto,
                PROVICION_DESAUCIO: data.provisionDesahucio,
                PROVICION_VACACIONES: data.provisionVacaciones,
              }
            )
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Sueldo modificado",
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
              text: "Debe seleccionar alguna fecha de pago",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (fechaDePago !== "") {
          Axios.delete(
            "/api/sueldochofer/" +
              choferes +
              "&" +
              fechaDePago
          )
            .then((response) => {
              Swal.fire({
                title: "Sueldo eliminado",
                text: response.data.message,
                icon: "success",
              });
              cargarSueldos(choferes);
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
            text: "Debe seleccionar alguna fecha de pago",
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
              Datos
            </Typography>

            <Grid container item md={12} sm={12} justify="center">
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
                  {...register("nombre")}
                  disabled
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Divider className={classes.margen} />

            {!switchCombo ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  className={classes.espaciado}
                  container
                  justify="space-around"
                >
                  <KeyboardDatePicker
                    id="fechaPago"
                    label="Fecha Pago"
                    format="dd/MM/yyyy"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            ) : (
              <FormControl
                className={classes.espaciado2}
                variant="outlined"
                fullWidth
              >
                <InputLabel id="primerCamion">Fecha de pago</InputLabel>
                <Select
                  labelId="primerCamion"
                  id="primerCamion"
                  value={fechaDePago}
                  onChange={handleChangeFechaDePago}
                  label="Fecha de pago"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {sueldosChoferItem
                    ? sueldosChoferItem.map((item, index) => {
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
            <Grid className={classes.espaciado} xs={12}>
              <TextField
                type="number"
                id="sueldoBruto"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("sueldoBruto")}
                fullWidth
                label="Sueldo Bruto"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} xs={12}>
              <TextField
                type="number"
                id="provisionDesahucio"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("provisionDesahucio")}
                fullWidth
                label="Provisión Desahucio"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} xs={12}>
              <TextField
                type="number"
                id="provisionVacaciones"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("provisionVacaciones")}
                fullWidth
                label="Provisión Vacaciones"
                variant="outlined"
              />
            </Grid>

            <Grid className={classes.espaciado} xs={12}>
              <Button
                type="submit"
                id="aBoton"
                fullWidth
                variant="contained"
                color="primary"
              >
                Grabar
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </form>
  );
}
