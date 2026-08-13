import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(3),
  },
  espaciadoInput: {
    marginTop: theme.spacing(3),
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
}));

export default function CombustibleActualizacion() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [tiCombus, setTiCombus] = React.useState("Petroleo");
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [octanaje, setOctanaje] = React.useState(false);
  const [tarjetaCreditoItem, setTarjetaCreditoItem] = React.useState([]);
  const [camionesItem, setCamionesItem] = React.useState([]);
  const [patente, setPatente] = React.useState("");
  const [codTarjeta, setCodTarjeta] = React.useState("");
  const [boletas, setBoletas] = React.useState("");
  const [boletasItem, setBoletasItem] = React.useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleChangeBoletas = (event) => {
    setBoletas(event.target.value);

    try {
      const datosBoleta = boletasItem.find(
        (boleta) => boleta.NUMERO_BOLETA_COMBUSTIBLE === event.target.value
      );

      document.getElementById("numeroGuia").value = datosBoleta.NUMERO_GUIA;
      document.getElementById("odometro").value = datosBoleta.ODOMETRO;
      document.getElementById("proovedor").value =
        datosBoleta.PROVEEDOR_COMBUSTIBLE;
      document.getElementById("litrosDeCombustible").value =
        datosBoleta.LITROS_COMBUSTIBLE;
      document.getElementById("montoDeCombustible").value =
        datosBoleta.MONTO_COMBUSTIBLE;
      setCodTarjeta(datosBoleta.CODIGO_TARJETA);
      setPatente(datosBoleta.PATENTE_CAMION);
      setSelectedDate(datosBoleta.FECHA_BOLETA);

      document.getElementById("numeroGuia").focus();
      document.getElementById("odometro").focus();
      document.getElementById("proovedor").focus();
      document.getElementById("litrosDeCombustible").focus();
      document.getElementById("montoDeCombustible").focus();

      if (datosBoleta.COMBUSTIBLE_PETROLEO === 1) {
        setTiCombus("Petroleo");
      } else {
        setOctanaje(true);
        setTiCombus("Bencina");

        document.getElementById("octanaje").value =
          datosBoleta.OCTANAJE_COMBUSTIBLE;
        document.getElementById("octanaje").focus();
        console.log(datosBoleta.OCTANAJE_COMBUSTIBLE);
      }
    } catch (error) {}
  };

  const handleChangeTiCombus = (event) => {
    setTiCombus(event.target.value);
    if (tiCombus === "Bencina") {
      setOctanaje(false);
    } else {
      setOctanaje(true);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);
  };

  const handleChangeCodTarjeta = (event) => {
    setCodTarjeta(event.target.value);
  };

  useEffect(() => {
    cargartarjetaCredito();
  }, []);
  const cargartarjetaCredito = async () => {
    const { data } = await Axios.get(
      "/api/tarjetacredito/"
    );
    setTarjetaCreditoItem(data.data);
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
    cargarBoletas();
  }, []);
  const cargarBoletas = async () => {
    const { data } = await Axios.get(
      "/api/boletacombustible/"
    );
    setBoletasItem(data.data);
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

    if (data.numeroGuia === "" || data.numeroGuia === undefined)
      mensajeDatosFaltantes += " - Falta ingresar numero guia.<br>";
    if (data.odometro === "" || data.odometro === undefined)
      mensajeDatosFaltantes += " - Falta ingresar odometro.<br>";
    if (data.proovedor === "" || data.proovedor === undefined)
      mensajeDatosFaltantes += " - Falta ingresar proovedor.<br>";
    if (
      data.litrosDeCombustible === "" ||
      data.litrosDeCombustible === undefined
    )
      mensajeDatosFaltantes += " - Falta ingresar litros de combustible.<br>";
    if (data.montoDeCombustible === "" || data.montoDeCombustible === undefined)
      mensajeDatosFaltantes += " - Falta ingresar monto de combustible.<br>";

    var petroleo = 0;
    var bencina = 0;
    if (tiCombus === "Petroleo") {
      petroleo = 1;
      bencina = 0;
    } else {
      petroleo = 0;
      bencina = 1;
    }

    switch (actionButton) {
      case "Guardar":
        if (data.numBoleta === "" || data.numBoleta === undefined)
          mensajeDatosFaltantes += " - Falta ingresar numero de boleta.<br>";

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
          Axios.post("/api/boletacombustible/", {
            NUMERO_BOLETA_COMBUSTIBLE: data.numBoleta,
            NUMERO_GUIA: data.numeroGuia,
            PROVEEDOR_COMBUSTIBLE: data.proovedor,
            MONTO_COMBUSTIBLE: data.montoDeCombustible,
            LITROS_COMBUSTIBLE: data.litrosDeCombustible,
            OCTANAJE_COMBUSTIBLE: data.octanaje,
            COMBUSTIBLE_BENCINA: bencina,
            COMBUSTIBLE_PETROLEO: petroleo,
            PATENTE_CAMION: patente,
            CODIGO_TARJETA: codTarjeta,
            ODOMETRO: data.odometro,
            FECHA_BOLETA: selectedDate,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Boleta creado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarCamiones();
              cargarBoletas();
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
          if (boletas !== "") {
            Axios.put(
              `/api/boletacombustible/${boletas}`,
              {
                NUMERO_GUIA: data.numeroGuia,
                PROVEEDOR_COMBUSTIBLE: data.proovedor,
                MONTO_COMBUSTIBLE: data.montoDeCombustible,
                LITROS_COMBUSTIBLE: data.litrosDeCombustible,
                OCTANAJE_COMBUSTIBLE: data.octanaje,
                COMBUSTIBLE_BENCINA: bencina,
                COMBUSTIBLE_PETROLEO: petroleo,
                PATENTE_CAMION: patente,
                CODIGO_TARJETA: codTarjeta,
                ODOMETRO: data.odometro,
                FECHA_BOLETA: selectedDate,
              }
            )
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Boleta de combustible modificada",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarCamiones();
                cargarBoletas();
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
              text: "Debe seleccionar alguna boleta",
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
          if (boletas !== "") {
            Axios.delete(
              "/api/boletacombustible/" + boletas
            )
              .then((response) => {
                Swal.fire({
                  title: "Boleta eliminada",
                  text: response.data.message,
                  icon: "success",
                });
                cargarCamiones();
                cargarBoletas();
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
              text: "Debe seleccionar alguna boleta",
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
          <Paper fullWidth className={classes.paper}>
            <Typography variant="h6" noWrap>
              Datos
            </Typography>
            <Grid container xs={12} className={classes.espaciado} spacing={3}>
              <Grid item md={3} sm={12} xs={12}>
                {!switchCombo ? (
                  <TextField
                    id="numBoleta"
                    label="Numero Boleta"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("numBoleta")}
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                  />
                ) : (
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="primerCamion">Numero boleta</InputLabel>
                    <Select
                      labelId="numeroBoletaform"
                      id="numeroBoletaform"
                      value={boletas}
                      onChange={handleChangeBoletas}
                      label="Numero boleta"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {boletasItem
                        ? boletasItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.NUMERO_BOLETA_COMBUSTIBLEE}
                                value={item.NUMERO_BOLETA_COMBUSTIBLE}
                              >
                                {item.NUMERO_BOLETA_COMBUSTIBLE}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <TextField
                  id="numeroGuia"
                  label="Numero Guia"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("numeroGuia")}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>

              <Grid item md={3} sm={12} xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="primerCamion">Cod. Tarjeta</InputLabel>
                  <Select
                    labelId="qwe"
                    id="qwe"
                    value={codTarjeta}
                    onChange={handleChangeCodTarjeta}
                    label="Cod. Tarjeta"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    {tarjetaCreditoItem
                      ? tarjetaCreditoItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.CODIGO_TARJETA}
                              value={item.CODIGO_TARJETA}
                            >
                              {item.CODIGO_TARJETA}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="primerCamion">Patente</InputLabel>
                  <Select
                    labelId="primerCamion"
                    id="primerCamion"
                    value={patente}
                    onChange={handleChangePatente}
                    label="Patente"
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
              <Grid item xs={12}>
                <MuiPickersUtilsProvider fullWidth utils={DateFnsUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                      margin="normal"
                      id="fecha"
                      label="Fecha"
                      format="dd-MM-yyyy"
                      fullWidth
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Paper>
          <Paper fullWidth className={classes.paper}>
            <Typography variant="h6" noWrap>
              Datos Generales
            </Typography>
            <Grid container className={classes.espaciado} spacing={1}>
              <Grid item md={6} xs={12}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel className={classes.espaciado} component="legend">
                      Tipo de Combustible
                    </FormLabel>
                    <RadioGroup
                      value={tiCombus}
                      onChange={handleChangeTiCombus}
                    >
                      <FormControlLabel
                        value="Petroleo"
                        control={<Radio />}
                        label="Petroleo"
                      />
                      <FormControlLabel
                        value="Bencina"
                        control={<Radio />}
                        label="Bencina"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  alignItems="center"
                  xs={12}
                  className={classes.espaciado}
                >
                  {octanaje ? (
                    <TextField
                      id="octanaje"
                      {...register("octanaje")}
                      label="Octanaje Combustible"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className={classes.espaciadoInput}
                      variant="outlined"
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl
                  fullWidth
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="odometro"
                    {...register("odometro")}
                    endAdornment={
                      <InputAdornment position="end">Kg</InputAdornment>
                    }
                    inputProps={{
                      "aria-label": "Odómetro",
                    }}
                    labelWidth={0}
                  />
                  <FormHelperText id="outlined-weight-helper-text">
                    Odómetro
                  </FormHelperText>
                </FormControl>
                <TextField
                  id="proovedor"
                  {...register("proovedor")}
                  label="Proovedor"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciadoInput}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
                <TextField
                  id="litrosDeCombustible"
                  {...register("litrosDeCombustible")}
                  label="Litros de Combustible"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciadoInput}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  id="montoDeCombustible"
                  {...register("montoDeCombustible")}
                  label="Mont de Combustible"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.espaciadoInput}
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
          <Grid fullWidth className={classes.espaciado} item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              id="aBoton"
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
