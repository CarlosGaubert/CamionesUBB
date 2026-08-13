import React, { useEffect } from "react";
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
import Swal from "sweetalert2";
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

export default function CamionSeguro() {
  const classes = useStyles();
  const [patente, setPatente] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { register, handleSubmit } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [fechas, setFechas] = React.useState("");
  const [segurosItem, setSegurosItem] = React.useState([]);
  const [camionesItem, setCamionesItem] = React.useState([]);

  const cargarSeguros = async (patente) => {
    const { data } = await Axios.get(
      "/api/segurocamion/" + patente
    );
    console.log(data.data);
    setSegurosItem(data.data);
    return null;
  };

  const handleChange = (event) => {
    setPatente(event.target.value);
    cargarSeguros(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeFechas = (event) => {
    setFechas(event.target.value);

    const datosSeguros = segurosItem.find(
      (camion) => camion.FECHA_PAGO_SEGURO === event.target.value
    );
    try {
      document.getElementById("valorpago").value = datosSeguros.VALOR_SEGURO;
      document.getElementById("valorpago").focus();
    } catch (error) {}
  };
  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async (patente) => {
    const { data } = await Axios.get("/api/camion/");
    setCamionesItem(data.data);
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
  
  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";
    if (data.valorpago === undefined)
      mensajeDatosFaltantes += " - Falta ingresar valor de pago.<br>";

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
            Axios.post("/api/segurocamion/", {
              PATENTE_CAMION: patente,
              VALOR_SEGURO: data.valorpago,
              FECHA_PAGO_SEGURO: selectedDate,
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Seguro creado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarSeguros(patente)
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
                
                Axios.put(
                  `/api/segurocamion/${patente}&${fechas}`,
                  {
                    VALOR_SEGURO:  data.valorpago,
                  }
                )
                  .then((response) => {
                    if (response.status === 200) {
                      Swal.fire({
                        title: "Seguro de camión modificado",
                        text: response.data.message,
                        icon: "success",
                      });
                    }
                    cargarSeguros(patente)
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
    
              Axios.delete(
                "/api/segurocamion/" + patente + "&" + fechas
              )
                .then((response) => {
                  Swal.fire({
                    title: "Seguro de camión eliminado",
                    text: response.data.message,
                    icon: "success",
                  });
                  cargarSeguros(patente)
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
  }


  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="primerCamion">Vehiculo</InputLabel>
                  <Select
                    labelId="vehiculo"
                    id="vehiculo"
                    value={patente}
                    onChange={handleChange}
                    label="Vehiculo"
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
                        label="Fecha del seguro"
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
                    <InputLabel id="primerCamion">Fecha del seguro</InputLabel>
                    <Select
                      labelId="primerCamion"
                      id="primerCamion"
                      value={fechas}
                      onChange={handleChangeFechas}
                      label="Fecha del seguro"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {segurosItem
                        ? segurosItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.FECHA_PAGO_SEGURO}
                                value={item.FECHA_PAGO_SEGURO}
                              >
                                {item.FECHA_PAGO_SEGURO}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  required
                  id="valorpago"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("valorpago")}
                  type="number"
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Valor pago"
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
      </form>
    </div>
  );
}
