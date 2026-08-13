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
import Axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    marginBottom: theme.spacing(3),
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
export default function ActualizacionIngreso() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDateProgramaViaje, setSelectedDateProgramaViaje] =
    React.useState(new Date());

  const [patente, setPatente] = React.useState("");
  const [choferes, setChoferes] = React.useState("");
  const [cliente, setCliente] = React.useState("");
  const [camionesItem, setCamionesItem] = React.useState([]);
  const [choferesItem, setChoferesItem] = React.useState([]);
  const [clienteItem, setClienteItem] = React.useState([]);
  const [origen, setOrigen] = React.useState("");
  const [origenItem, setOrigenItem] = React.useState([]);
  const [seccion, setSeccion] = React.useState("");
  const [seccionItem, setSeccionItem] = React.useState([]);
  const [destino, setDestino] = React.useState("");
  const [destinoItem, setDestinoItem] = React.useState([]);
  const [conObra, setConObra] = React.useState("sinObra");
  const [switchObra, setSwitchObra] = React.useState(false);
  const [obras, setObras] = React.useState("");
  const [obrasItem, setObrasItem] = React.useState([]);

  const handleChangeObras = (event) => {
    setObras(event.target.value);
  };

  useEffect(() => {
    cargarObras();
  }, []);
  const cargarObras = async () => {
    const { data } = await Axios.get("/api/obra/");
    setObrasItem(data.data);
    return null;
  };

  const handleChangeConObra = (event) => {
    setConObra(event.target.value);
    if (event.target.value === "asignaObra") {
      setSwitchObra(true);
    } else {
      setSwitchObra(false);
      setObras("");
    }
  };

  const cargarOrigenByOrigen = async (origen) => {
    const { data } = await Axios.get(
      "/api/recorrido/" + origen
    );
    setSeccionItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarOrigen();
  }, []);
  const cargarOrigen = async () => {
    const { data } = await Axios.get("/api/recorrido/");
    setOrigenItem(data.data);
    return null;
  };

  const cargarOrigenByOrigenSeccion = async (origen, seccion) => {
    const { data } = await Axios.get(
      "/api/recorrido/destino/" + origen + "&" + seccion
    );
    setDestinoItem(data.data);
    return null;
  };


  const handleChangeOrigen = (event) => {
    setOrigen(event.target.value);

    try {
      cargarOrigenByOrigen(event.target.value);
    } catch (error) {}
  };

  const handleChangeSeccion = (event) => {
    setSeccion(event.target.value);
    try {
      cargarOrigenByOrigenSeccion(origen, event.target.value);
    } catch (error) {}
  };

  useEffect(() => {
    cargarClientes();
  }, []);
  const cargarClientes = async () => {
    const { data } = await Axios.get("/api/cliente/");
    setClienteItem(data.data);
    return null;
  };

  const cargarCamionChoferes = async (patente) => {
    const { data } = await Axios.get(
      "/api/camionchofer/patente/" + patente
    );
    if (data.data.length === 0) {
      Swal.fire({
        title: "Cuidado !",
        text: "Este camion no presenta chofer asignados",
        icon: "warning",
      });
      setChoferesItem([]);
    } else setChoferesItem(data.data);
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

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };
  const handleChangeChoferes = (event) => {
    setChoferes(event.target.value);

    cargarDatoChofer(event.target.value);
  };

  const handleChangeDestino = (event) => {
    setDestino(event.target.value);

    try {
      const datosRuta = destinoItem.find(
        (ruta) =>
          ruta.Origen === origen &&
          ruta.Seccion === seccion &&
          ruta.Destino === event.target.value
      );
      console.log(datosRuta);
      document.getElementById("kmRipio").value = datosRuta.Km_Ripio;
      document.getElementById("kmRipio").focus();
      document.getElementById("kmTotal").value = datosRuta.Total_Km;
      document.getElementById("kmTotal").focus();
      document.getElementById("kmPavimento").value = datosRuta.Km_Pavimento;
      document.getElementById("kmPavimento").focus();
    } catch (error) {
      console.log(error);
    }
  };

  const cargarDatoChofer = async (rut) => {
    const { data } = await Axios.get("/api/chofer/" + rut);
    console.log(data.data);
    if (data.data.length !== 0) {
      document.getElementById("choferNombre").value =
        data.data[0].NOMBRE_EMPLEADO + " " + data.data[0].APELLIDO_EMPLEADO;
      document.getElementById("choferNombre").focus();
    }

    return null;
  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);

    try {
      const datosCamion = camionesItem.find(
        (camion) => camion.PATENTE_CAMION === event.target.value
      );

      document.getElementById("carroAsociado").value =
        datosCamion.Patente_Carro;
      document.getElementById("carroAsociado").focus();
    } catch (error) {}

    try {
      cargarCamionChoferes(event.target.value);
    } catch (error) {}
  };

  const handleDateChangeProgramaViaje = (date) => {
    setSelectedDateProgramaViaje(date);
  };

  const cargarCodigoViaje = async () => {
    const { data } = await Axios.get("/api/programa/max/");
    console.log(data.data);
    return data.data;
  };

  const onSubmit = async (data, e) => {
    var mensajeDatosFaltantes = "";

  
    if (data.producto === "" || data.producto === undefined)
      mensajeDatosFaltantes += " - Falta ingresar producto.<br>";

    if (patente === "")
      mensajeDatosFaltantes +=
        " - Falta seleccionar una patente de camión.<br>";
    if (choferes === "")
      mensajeDatosFaltantes += " - Falta seleccionar un chofer.<br>";
    if (cliente === "")
      mensajeDatosFaltantes += " - Falta seleccionar un cliente.<br>";
    if (origen === "")
      mensajeDatosFaltantes += " - Falta seleccionar un origen de ruta.<br>";
    if (seccion === "")
      mensajeDatosFaltantes += " - Falta seleccionar una sección de ruta.<br>";
    if (destino === "")
      mensajeDatosFaltantes += " - Falta seleccionar un destino de ruta.<br>";
    if (switchObra) {
      if (obras === "")
        mensajeDatosFaltantes += " - Falta seleccionar una obra.<br>";
    }

    if (mensajeDatosFaltantes.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Datos vacios.",
        html:
          "<div style='text-align: left;'>" + mensajeDatosFaltantes + "</div>",
        customClass: {
          popup: "format-pre",
        },
      });
    } else {
      const codViaje = await cargarCodigoViaje();
      var codObra = 0;
      if(obras === ""){
        codObra = 0
      }else{
        codObra = obras
      }
      
      Axios.post("/api/programa/", {
        PATENTE_CAMION: patente,
        RUT_EMPLEADO: choferes,
        PATENTE_CARRO: data.carroAsociado,
        PARTIDA: origen,
        LLEGADA: destino,
        SECCION: seccion,
        CLIENTE: cliente,
        CODIGO_VIAJE: codViaje,
        FECHA_VIAJE: selectedDateProgramaViaje,
        HORA_SALIDA_VIAJE: document.getElementById("horaSalida").value,
        PRODUCTO: data.producto,
        HORA_LLEGADA_VIAJE: document.getElementById("horaLlegada").value,
        CODIGO_OBRA: codObra ,
        Viajerealizado: "NO",
        
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              title: "Programa creado",
              text: response.data.message,
              icon: "success",
            });
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Paper elevation={3} fullWidth className={classes.paper}>
            <Grid className={classes.espaciado} container justify="center">
              <Grid
                item
                xs={12}
                md={6}
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
                xs={12}
                md={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    className={classes.espaciado}
                    container
                    justify="space-around"
                  >
                    <KeyboardDatePicker
                      id="mes"
                      label="Mes"
                      format="dd/MM/yyyy"
                      fullWidth
                      value={selectedDateProgramaViaje}
                      onChange={handleDateChangeProgramaViaje}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Paper>
          <Grid container justify="center">
            <Grid
              item
              xs={12}
              md={6}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Paper elevation={3} fullWidth className={classes.paper}>
                <Grid direction="row" container>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="start"
                  >
                    <Typography className={classes.titulo} variant="h6" noWrap>
                      Recorridos
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <FormControl
                      className={classes.espaciado2}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Origen</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={origen}
                        onChange={handleChangeOrigen}
                        label="Origen"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {origenItem
                          ? origenItem.map((item, index) => {
                              return (
                                <MenuItem key={item.Origen} value={item.Origen}>
                                  {item.Origen}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <FormControl
                      className={classes.espaciado2}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Sección</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={seccion}
                        onChange={handleChangeSeccion}
                        label="Sección"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {seccionItem
                          ? seccionItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.Seccion}
                                  value={item.Seccion}
                                >
                                  {item.Seccion}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <FormControl
                      className={classes.espaciado2}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Destino</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={destino}
                        onChange={handleChangeDestino}
                        label="Destino"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {destinoItem
                          ? destinoItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.Destino}
                                  value={item.Destino}
                                >
                                  {item.Destino}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      id="horaSalida"
                      {...register("horaSalida")}
                      fullWidth
                      label="Hora salida"
                      type="time"
                      defaultValue="08:00"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      id="horaLlegada"
                      {...register("horaLlegada")}
                      fullWidth
                      label="Hora llegada"
                      type="time"
                      defaultValue="09:00"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <MuiPickersUtilsProvider f utils={DateFnsUtils}>
                      <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                          fullWidth
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          id="date-picker-inline"
                          label="Fecha recorrido"
                          value={selectedDateProgramaViaje}
                          onChange={handleDateChangeProgramaViaje}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      disabled
                      id="kmPavimento"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Km Pavimento"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      disabled
                      id="kmRipio"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Km Rípio"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="kmTotal"
                      fullWidth
                      label="Km Total"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Paper elevation={3} fullWidth className={classes.paper}>
                <Typography className={classes.titulo} variant="h6" noWrap>
                  Datos Generales
                </Typography>
                <Grid container justify="center">
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("carroAsociado")}
                      id="carroAsociado"
                      fullWidth
                      label="Carro Asociado"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="primerCamion">Rut chofer</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={choferes}
                        onChange={handleChangeChoferes}
                        label="Rut chofer"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {choferesItem
                          ? choferesItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.Rut_Conductor}
                                  value={item.Rut_Conductor}
                                >
                                  {item.Rut_Conductor}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="choferNombre"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="primerCamion">Rut Cliente</InputLabel>
                      <Select
                        labelId="rutCliente"
                        id="rutCliente"
                        value={cliente}
                        onChange={handleChangeCliente}
                        label="Rut Cliente"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {clienteItem
                          ? clienteItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.CODIGO_CLIENTE}
                                  value={item.CODIGO_CLIENTE}
                                >
                                  {item.CODIGO_CLIENTE +
                                    "-" +
                                    item.DIGITO_CLIENTE}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.espaciado}
                    container
                    direction="row"
                    justify="center"
                  >
                    <TextField
                      {...register("producto")}
                      id="producto"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      label="Producto"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Paper elevation={3} fullWidth className={classes.paper}>
              <Typography className={classes.titulo} variant="h6" noWrap>
                Obra Viaje
              </Typography>
              <Grid className={classes.espaciado} container justify="center">
                <Grid
                  item
                  xs={12}
                  md={3}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="start"
                >
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={conObra}
                      onChange={handleChangeConObra}
                    >
                      <FormControlLabel
                        value="sinObra"
                        control={<Radio color="secondary" />}
                        label="Sin Obra"
                      />
                      <FormControlLabel
                        value="asignaObra"
                        control={<Radio color="secondary" />}
                        label="Asigna Obra"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="start"
                >
                  {switchObra ? (
                    <FormControl
                      className={classes.espaciadoInput}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Numero boleta</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={obras}
                        onChange={handleChangeObras}
                        label="Numero boleta"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {obrasItem
                          ? obrasItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.CODIGO_OBRA}
                                  value={item.CODIGO_OBRA}
                                >
                                  {item.DESCRIPCION_OBRA}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                  ) : null}
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} fullWidth className={classes.paper}>
              Tabla Programa de Viaje
            </Paper>
            <Grid
              item
              xs={12}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Grid
                item
                xs={12}
                md={12}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Grabar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
