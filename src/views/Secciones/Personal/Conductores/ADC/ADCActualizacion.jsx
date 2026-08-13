import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
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
  espaciado: {
    padding: theme.spacing(2),
  },
  espaciado2: {
    margin: theme.spacing(2),
  },
}));

export default function ADCActualizacion() {
  const classes = useStyles();
  const [colorAsignarCamion, setColorAsignarCamion] =
    React.useState("secondary");
  const [colorDesasignarCamion, setColorDesasignarCamion] =
    React.useState("primary");
  const [colorEliminarAsignar, setColorEliminarAsignar] =
    React.useState("primary");
  const [colorEliminarDesasignar, setColorEliminarDesasignar] =
    React.useState("primary");
  const [actionButton, setActionButton] = React.useState("Asignar camion");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [switchDesde, setSwitchDesde] = React.useState(true);
  const [patente, setPatente] = React.useState("");
  const [camionesItem, setCamionesItem] = React.useState([]);
  const [choferes, setChoferes] = React.useState("");
  const [choferesItem, setChoferesItem] = React.useState([]);
  const [fechaCamionChofer, setFechaCamionChofer] = React.useState("");
  const [camionChoferItem, setCamionChoferItem] = React.useState([]);
  const { handleSubmit } = useForm();
  const handleChangeCamionCamionChofer = (event) => {
    setFechaCamionChofer(event.target.value);
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

    if(event.target.value !== "" && patente !== ""){
      cargarCamionChofer(patente,event.target.value)
    }
   

  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);

    if(event.target.value !== "" && choferes !== ""){
      cargarCamionChofer(event.target.value, choferes)
    }
   
   
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const cargarCamionChofer = async (patente, chofer) => {
    const { data } = await Axios.get("/api/camionchofer/" + patente + "&" + chofer);
    setCamionChoferItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async () => {
    const { data } = await Axios.get("/api/camion/");
    setCamionesItem(data.data);
    return null;
  };
  useEffect(() => {
    cargarChoferes();
  }, []);
  const cargarChoferes = async () => {
    const { data } = await Axios.get("/api/chofer/");
    setChoferesItem(data.data);
    return null;
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (patente === "" || patente === undefined)
      mensajeDatosFaltantes += " - Debe seleccionar un camión.<br>";
    if (choferes === "" || choferes === undefined)
      mensajeDatosFaltantes += " - Debe seleccionar un chofer.<br>";

    switch (actionButton) {
      case "Asignar camion":
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
          Axios.post("/api/camionchofer/", {
            Patente_Camion: patente,
            Rut_Conductor: choferes,
            FechaDesde: selectedDate,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Asignación creada",
                  text: response.data.message,
                  icon: "success",
                });
              }
              setPatente("");
              setChoferes("");
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
      case "Desasignar camion":
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
          Axios.put(
            `/api/camionchofer/${patente}&${choferes}`,
            {
              FechaHasta: selectedDate,
            }
          )
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  title: "Desasignación modificado",
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
        }
        break;
      case "Elimina asignar":
        if(fechaCamionChofer === "") mensajeDatosFaltantes += " - Debe seleccionar una fecha.<br>";

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
          Axios.delete(
            "/api/camionchofer/" + fechaCamionChofer + "&" + patente + "&" + choferes 
          )
            .then((response) => {
              Swal.fire({
                title: "Carro eliminado",
                text: response.data.message,
                icon: "success",
              });
              setPatente("");
              setChoferes("");
              cargarCamionChofer(patente, choferes)
            })
            .catch((error) => {
              Swal.fire({
                title: "Cuidado !",
                text: "Ocurrio un error inesperado",
                icon: "warning",
              });
            });
        }

        break;
      case "Elimina desasignar":
        break;
      default:
        break;
    }
  };

  const switchColor = async (evt) => {
    switch (evt.target.innerText) {
      case "ASIGNAR CAMIÓN":
        setColorAsignarCamion("secondary");
        setColorDesasignarCamion("primary");
        setColorEliminarAsignar("primary");
        setColorEliminarDesasignar("primary");
        setSwitchCombo(false);
        setSwitchDesde(true);
        document.getElementById("aBoton").innerHTML = "GRABAR ASIGNAR";
        setActionButton("Asignar camion");
        break;
      case "DESASIGNAR CAMIÓN":
        setColorAsignarCamion("primary");
        setColorDesasignarCamion("secondary");
        setColorEliminarAsignar("primary");
        setColorEliminarDesasignar("primary");
        setSwitchCombo(false);
        setSwitchDesde(false);
        document.getElementById("aBoton").innerHTML = "GRABAR DESASIGNAR";
        setActionButton("Desasignar camion");
        break;
      case "ELIMINAR ASIGNAR":
        setColorAsignarCamion("primary");
        setColorDesasignarCamion("primary");
        setColorEliminarAsignar("secondary");
        setColorEliminarDesasignar("primary");
        setSwitchCombo(true);
        setSwitchDesde(true);
        document.getElementById("aBoton").innerHTML = "ELIMINA ASIGNAR";
        setActionButton("Elimina asignar");
        break;
      case "ELIMINAR DESASIGNAR":
        setColorAsignarCamion("primary");
        setColorDesasignarCamion("primary");
        setColorEliminarAsignar("primary");
        setColorEliminarDesasignar("secondary");
        setSwitchCombo(true);
        setSwitchDesde(false);
        document.getElementById("aBoton").innerHTML = "ELIMINA DESASIGNAR";
        setActionButton("Elimina desasignar");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="center">
          <Grid
            item
            md={6}
            xs={12}
            className={classes.espaciado}
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorAsignarCamion}
            >
              Asignar camión
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={classes.espaciado}
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorDesasignarCamion}
            >
              Desasignar camión
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={classes.espaciado}
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorEliminarAsignar}
            >
              Eliminar asignar
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={classes.espaciado}
            justify="center"
          >
            <Button
              variant="contained"
              onClick={switchColor}
              fullWidth
              color={colorEliminarDesasignar}
            >
              Eliminar desasignar
            </Button>
          </Grid>
          <Paper elevation={13} fullWidth className={classes.paper}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="primerCamion">Patentes</InputLabel>
              <Select
                labelId="primerCamion"
                id="primerCamion"
                value={patente}
                onChange={handleChangePatente}
                label="Patentes"
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
                  disabled
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {!switchCombo ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid
                  className={classes.espaciado}
                  container
                  justify="space-around"
                >
                  <KeyboardDatePicker
                    id="fecha"
                    label={switchDesde ? "Fecha Desde" : "Fecha Hasta"}
                    format="dd/MM/yyyy"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            ) : (
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.espaciado2}
              >
                <InputLabel id="primerCamion">
                  {switchDesde ? "Fecha Desde" : "Fecha Hasta"}
                </InputLabel>
                <Select
                  labelId="primerCamion"
                  id="primerCamion"
                  value={fechaCamionChofer}
                  onChange={handleChangeCamionCamionChofer}
                  label={switchDesde ? "Fecha Desde" : "Fecha Hasta"}
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {camionChoferItem
                    ? switchDesde
                      ? camionChoferItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.FechaDesde}
                              value={item.FechaDesde}
                            >
                              {item.FechaDesde}
                            </MenuItem>
                          );
                        })
                      : camionChoferItem.map((item, index) => {
                        if(item.FechaHasta !== "Invalid date"){
                          return (
                            <MenuItem
                              key={item.FechaHasta}
                              value={item.FechaHasta}
                            >
                              {item.FechaHasta}
                            </MenuItem>
                          );
                        }else{
                          return null
                        }
                        })
                    : null}
                </Select>
              </FormControl>
            )}
            <Button
              fullWidth
              id="aBoton"
              type="submit"
              className={classes.espaciado}
              variant="contained"
              color="primary"
            >
              GRABAR ASIGNAR
            </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}
