import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from "react-hook-form";
import Axios from "axios";
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
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

export default function CarroActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [patente, setPatente] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [carrosItem, setCarrosItem] = React.useState([]);

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);

    try {
      const datosCarros = carrosItem.find(
        (carro) => carro.PATENTE_CARRO === event.target.value
      );
      
      document.getElementById("numEjes").value = datosCarros.EJE_CARRO;
      document.getElementById("marca").value = datosCarros.MARCA_CARRO;
      document.getElementById("valorCompra").value = datosCarros.VALOR_CARRO;
      document.getElementById("observacion").value = datosCarros.OBSERVACION_CARRO;
      //setSelectedDate(datosCarros.FECHA_DE_COMPRA_CARRO)

      document.getElementById("numEjes").focus();
      document.getElementById("marca").focus();
      document.getElementById("valorCompra").focus();
      document.getElementById("observacion").focus();  

      setTipo(datosCarros.TIPO_DE_CARRO)


    } catch (error) {
      setTipo("Simple")
    }

  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    cargarCarros();
  }, []);
  const cargarCarros = async () => {
    const { data } = await Axios.get("/api/carro/");
    setCarrosItem(data.data);
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
    if (data.marca === undefined)
      mensajeDatosFaltantes += " - Falta ingresar marca.<br>";
    if (data.numEjes === undefined)
      mensajeDatosFaltantes += " - Falta ingresar numero de ejes.<br>";
    if (data.valorCompra === undefined)
      mensajeDatosFaltantes += " - Falta ingresar valor de compra.<br>";
    if (tipo === "")
      mensajeDatosFaltantes += " - Falta ingresar tipo de carro.<br>";
    if (data.observacion === "")
      mensajeDatosFaltantes += " - Falta ingresar observación.<br>";
   
    switch (actionButton) {
      case "Guardar":
        console.log("guardar");
        if (data.patente === "")
          mensajeDatosFaltantes =
            " - Falta ingresar patente de carro.<br>" + mensajeDatosFaltantes;

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
          Axios.post("/api/carro/", {
            PATENTE_CARRO: data.patente,
            TIPO_DE_CARRO: tipo,
            FECHA_DE_COMPRA_CARRO: selectedDate,
            VALOR_CARRO: data.valorCompra,
            EJE_CARRO: data.numEjes,
            MARCA_CARRO: data.marca,
            OBSERVACION_CARRO: data.observacion,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Carro creado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarCarros();
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

              Axios.put(
                `/api/carro/${patente}`,
                {
                  TIPO_DE_CARRO: tipo,
                  FECHA_DE_COMPRA_CARRO: selectedDate,
                  VALOR_CARRO: data.valorCompra,
                  EJE_CARRO: data.numEjes,
                  MARCA_CARRO: data.marca,
                  OBSERVACION_CARRO: data.observacion,
                }
              )
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire({
                      title: "Carro modificado",
                      text: response.data.message,
                      icon: "success",
                    });
                  }
                  cargarCarros()
                })
                .catch((error) => {
                  Swal.fire({
                    title: "Cuidado !",
                    text: error.response.data.message,
                    icon: "warning",
                  });
                });
         
          } else {
            Swal.fire({
              title: "Error !",
              text: "Debe seleccionar algun carro",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (patente !== "") {
            Axios.delete(
              "/api/carro/" + patente 
            )
              .then((response) => {
                Swal.fire({
                  title: "Carro eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarCarros()
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
            text: "Debe seleccionar algun carro",
            icon: "error",
          });
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
          <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Antecedentes Generales
            </Typography>
            <Grid
              item
              xs={12}
              container
              fullWidth
              direction="row"
              justify="center"
            >
              <Grid
                item
                xs={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                {!switchCombo ? (
                  <TextField
                    className={classes.espaciadoInput}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("patente")}
                    id="patente"
                    name="patente"
                    fullWidth
                    label="Patente"
                    variant="outlined"
                  />
                ) : (
                  <FormControl
                    className={classes.espaciadoInput}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="primerCamion">Patente carro</InputLabel>
                    <Select
                      labelId="primerCamion"
                      id="primerCamion"
                      value={patente}
                      onChange={handleChangePatente}
                      label="Patente carro"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {carrosItem
                        ? carrosItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.PATENTE_CARRO}
                                value={item.PATENTE_CARRO}
                              >
                                {item.PATENTE_CARRO}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  id="marca"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("marca")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Marca"
                  variant="outlined"
                />

                <FormControl
                  className={classes.espaciadoInput}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel id="primerCamion">Tipo</InputLabel>
                  <Select
                    labelId="primerCamion"
                    id="primerCamion"
                    value={tipo}
                    onChange={handleChangeTipo}
                    label="Tipo"
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    <MenuItem key="montado" value="Montado">
                      Montado
                    </MenuItem>
                    <MenuItem key="peerleesdp" value="Peerlees Doble Puente">
                      Peerlees Doble Puente
                    </MenuItem>
                    <MenuItem key="peerleess" value="Peerlees Sencillo">
                      Peerlees Sencillo
                    </MenuItem>
                    <MenuItem key="simple" value="Simple">
                      Simple
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <TextField
                  type="number"
                  className={classes.espaciadoInput}
                  id="numEjes"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("numEjes")}
                  fullWidth
                  label="Numero Ejes"
                  variant="outlined"
                />

                <MuiPickersUtilsProvider
                  className={classes.espaciadoInput}
                  utils={DateFnsUtils}
                >
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      id="fechacompra"
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
                <TextField
                  type="number"
                  id="valorCompra"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("valorCompra")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Valor Compra"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <TextField
                  id="observacion"
                  label="Observación"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("observacion")}
                  multiline
                  rows={6}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              id="aBoton"
              color="primary"
            >
              Grabar ingreso
            </Button>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}
