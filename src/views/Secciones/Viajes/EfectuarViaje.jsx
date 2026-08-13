import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Axios from 'axios'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import MaterialDatatable from 'material-datatable'
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
  marginboton: {
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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: "100%",
  },
}));
export default function EfectuarViaje() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDatePrograma, setSelectedDatePrograma] = React.useState(
    new Date()
  );
  const [programaViaje, setProgramaViaje] = React.useState("");
  const [unidadCamion, setUnidadCamion] = React.useState("");
  const [unidadCarro, setUnidadCarro] = React.useState("");
  const [programaViajeItem, setProgramaViajeItem] = React.useState([]);
  const [value, setValue] = React.useState("1");
  const [tipoCargaItem, setTipoCargaItem] = React.useState([])
  const [listProgramasViajes, setListProgramasViajes] = React.useState([])


  const handleChange = async (event) => {
    await setValue(event.target.value);
    if (event.target.value === "1") {
      document.getElementById("totalGastos").value = 0

    }
  };

  const sumarCostos = async () => {
    try {
      var accesorios = document.getElementById("accesorios").value || 0
      var carguio = document.getElementById("carguio").value || 0
      var encarpe = document.getElementById("encarpe").value || 0
      var infraccion = document.getElementById("infraccion").value || 0
      var peaje = document.getElementById("peaje").value || 0
      var romana = document.getElementById("romana").value || 0
      var transbordo = document.getElementById("transbordo").value || 0
      var vulcanizacion = document.getElementById("vulcanizacion").value || 0
      var sinRespaldo = document.getElementById("sinRespaldo").value || 0

      var total = parseFloat(accesorios) + parseFloat(carguio) + parseFloat(encarpe) + parseFloat(infraccion) + parseFloat(peaje) + parseFloat(romana) + parseFloat(transbordo) + parseFloat(vulcanizacion) + parseFloat(sinRespaldo)

      document.getElementById("totalGastos").value = total.toFixed(3)

    } catch (error) {

    }

  }

  useEffect(() => {
    cargarTipoCarga();
  }, []);

  const cargarTipoCarga = async () => {
    const { data } = await Axios.get("/api/tipocarga/");
    setTipoCargaItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarListProgramaViaje();
  }, []);

  const cargarListProgramaViaje = async () => {
    const { data } = await Axios.get("/api/programa/");
    setListProgramasViajes(data.data);
    return null;
  };


  useEffect(() => {
    cargarProgramaViaje();
  }, []);

  const cargarProgramaViaje = async () => {
    const { data } = await Axios.get("/api/programa/norealizado/");
    setProgramaViajeItem(data.data);
    return null;
  };

  const handleChangeUnidadCarro = (event) => {
    setUnidadCarro(event.target.value);
  };
  const handleChangeUnidadCamion = (event) => {
    setUnidadCamion(event.target.value);
  };

  const handleChangeProgramaViaje = (event) => {
    setProgramaViaje(event.target.value);

    try {
      const datosProgramaViaje = programaViajeItem.find(
        (programa) => programa.CODIGO_VIAJE === event.target.value
      );
        console.log(datosProgramaViaje)
      document.getElementById("fecha").value = datosProgramaViaje.FECHA_VIAJE
      document.getElementById("origen").value = datosProgramaViaje.PARTIDA
      document.getElementById("seccion").value = datosProgramaViaje.SECCION
      document.getElementById("destino").value = datosProgramaViaje.LLEGADA
      document.getElementById("chofer").value = datosProgramaViaje.RUT_EMPLEADO
      document.getElementById("hrSalida").value = datosProgramaViaje.HORA_SALIDA_VIAJE
      document.getElementById("hrLlegada").value = datosProgramaViaje.HORA_LLEGADA_VIAJE
      document.getElementById("numGuia").value = datosProgramaViaje.CODIGO_VIAJE

      document.getElementById("fecha").focus()
      document.getElementById("origen").focus()
      document.getElementById("seccion").focus()
      document.getElementById("destino").focus()
      document.getElementById("chofer").focus()
      document.getElementById("hrSalida").focus()
      document.getElementById("hrLlegada").focus()
      document.getElementById("numGuia").focus()
      cargarRuta(datosProgramaViaje.PARTIDA, datosProgramaViaje.SECCION, datosProgramaViaje.LLEGADA)
    } catch (error) {

    }

  }

  const cargarRuta = async (origen, seccion, destino) => {
    const { data } = await Axios.get(`/api/recorrido/primarykey/${origen}&${seccion}&${destino}`);
    var datos = data.data[0]
    document.getElementById("kmRipio").value = datos.Km_Ripio
    document.getElementById("kmPavimento").value = datos.Km_Pavimento
    document.getElementById("kmTotal").value = datos.Total_Km

    document.getElementById("kmRipio").focus()
    document.getElementById("kmPavimento").focus()
    document.getElementById("kmTotal").focus()
  };


  const handleDateChangeProgramaViaje = (date) => {
    setSelectedDatePrograma(date);
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (programaViaje === "")
      mensajeDatosFaltantes +=
        " - Falta seleccionar un programa de viaje.<br>";
    if (data.odometroSalida === "" || data.odometroSalida === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar odometro de salida.<br>";
    if (data.odometroLlegada === "" || data.odometroLlegada === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar odometro de llegada.<br>";
    if (data.cantCamion === "" || data.cantCamion === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar cantidad camión.<br>";
    if (data.cantCarro === "" || data.cantCarro === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar cantidad carro.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar observación.<br>";

    if (unidadCamion === "")
      mensajeDatosFaltantes +=
        " - Falta seleccionar estado de camión.<br>";
    if (unidadCarro === "")
      mensajeDatosFaltantes +=
        " - Falta seleccionar estado de carro.<br>";

    Swal.fire({
      title: '¿Desea efectuar este viaje?',
      showDenyButton: true,

      confirmButtonText: `Efectuar`,
      denyButtonText: `No efectuar`,
    }).then((result) => {
      if (result.isConfirmed) {

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
          console.log(data.origen)
          const datosProgramaViaje = programaViajeItem.find(
            (programa) => programa.CODIGO_VIAJE === programaViaje
          );
    
          Axios.post("/api/viajeefectuado/", {
            NUMERO_GUIA_DESPACHO: programaViaje,
            PATENTE_CAMION: datosProgramaViaje.PATENTE_CAMION,
            RUT_EMPLEADO: datosProgramaViaje.RUT_EMPLEADO,
            PATENTE_CARRO: datosProgramaViaje.PATENTE_CARRO,
            PARTIDA: document.getElementById("origen").value,
            SECCION: document.getElementById("seccion").value,
            LLEGADA: document.getElementById("destino").value,
            CLIENTE: datosProgramaViaje.CLIENTE,
            TIPO_CARGA_CARRO: datosProgramaViaje.TIPO_CARGA_CARRO,
            TIPO_CARGA_CAMION: datosProgramaViaje.TIPO_CARGA_CAMION,
            CANTIDAD_CARGA_CAMION: data.cantCamion,
            CANTIDAD_CARGA_CARRO: data.cantCarro,
            CODIGO_VIAJE: programaViaje,
            FECHA_VIAJE: selectedDatePrograma,
            HORA_SALIDA_VIAJE: document.getElementById("hrSalida").value,
            HORA_LLEGADA_VIAJE: document.getElementById("hrLlegada").value,
            PRODUCTO: datosProgramaViaje.PRODUCTO,
            CODIGO_OBRA: datosProgramaViaje.CODIGO_OBRA,
            PRECIO_UNITARIO_CARGA_CAMION: data.precioUniCamion,
            PRECIO_UNITARIO_CARGA_CARRO: data.precioUniCarro,
            ODOMETRO_SALIDA: data.odometroSalida,
            ODOMETRO_LLEGADA: data.odometroLlegada,
            OTROS_COSTOS: document.getElementById("totalGastos").value,
            KILOMETRAJE_CAMINO_RIPIO: 0,
            KILOMETRAJE_CAMINO_PAVIMENTO: 0,
            Formula: programaViaje.Formula,
            OBSERVACION: data.observacion,
            Num_PViaje: programaViaje.Num_PViaje
          })
            .then((response) => {
             
              if (response.status === 200) {
                Axios.put(
                  `/api/programa/${datosProgramaViaje.PATENTE_CAMION}&${datosProgramaViaje.CODIGO_VIAJE}&${datosProgramaViaje.FECHA_VIAJE}&${datosProgramaViaje.HORA_SALIDA_VIAJE}&${datosProgramaViaje.CODIGO_OBRA}`,
                  {
                    Viajerealizado: "SI"
                  }
                )
                  .then((response) => {
                    if (response.status === 200) {
                      Swal.fire({
                        title: "Felicidades",
                        text: "Viaje efectuado correctamente",
                        icon: "success",
                      });
                      reset()
                      cargarListProgramaViaje()
                      cargarProgramaViaje()
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
             
            })
            .catch((error) => {
              Swal.fire({
                title: "Error !",
                text: error.response.data.message,
                icon: "error",
              });
            });
        }

      } else if (result.isDenied) {
        Swal.fire('No se efectuo este viaje', '', 'info')
      }
    })

  }

  const options = {
    filter: true,
    selectableRows: false,

    responsive: 'scroll',
    rowsPerPage: 4,
    textLabels: {
      body: {
        noMatch: "",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Columnas por pagina:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Reiniciar",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },

    }

  };

  const columns = [

    {
      name: 'Fecha',
      field: 'FECHA_VIAJE',
    },
    {
      name: 'Chofer',
      field: 'RUT_EMPLEADO'
    }, {
      name: 'Cliente',
      field: 'CLIENTE'
    }, {
      name: 'Producto',
      field: 'PRODUCTO',
    }, {
      name: 'Origen',
      field: 'PARTIDA',
    },
    {
      name: 'Sección',
      field: 'SECCION',
    },
    {
      name: 'Destino',
      field: 'LLEGADA',
    },
    {
      name: 'Hr. Salida',
      field: 'HORA_SALIDA_VIAJE',
    },
    {
      name: 'Hr. Llegada',
      field: 'HORA_LLEGADA_VIAJE',
    },
    {
      name:'¿ Se realizo ?',
      field: 'Viajerealizado'
    }
  ];

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>

          <Grid
            item
            xs={12}
            sm={6}
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
              <InputLabel id="primerCamion">Numero programa viaje</InputLabel>
              <Select
                labelId="primerCamion"
                id="primerCamion"
                value={programaViaje}
                onChange={handleChangeProgramaViaje}
                label="Numero programa viaje"
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                {programaViajeItem
                  ? programaViajeItem.map((item, index) => {
                    return (
                      <MenuItem
                        key={item.CODIGO_VIAJE}
                        value={item.CODIGO_VIAJE}
                      >
                        {item.CODIGO_VIAJE}
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
            sm={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  id="mes"
                  label="Mes"
                  format="dd/MM/yyyy"
                  fullWidth
                  value={selectedDatePrograma}
                  onChange={handleDateChangeProgramaViaje}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
          <MaterialDatatable
          classes={classes.prueba}
          title={"Programa de viajes"}
          data={listProgramasViajes}
          columns={columns}
          options={options}
      />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    {...register("fecha")}
                    id="fecha"
                    fullWidth
                    label="Fecha"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="origen"
                    {...register("origen")}
                    fullWidth
                    label="Origen"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="seccion"
                    {...register("seccion")}
                    fullWidth
                    label="Sección"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="destino"
                    {...register("destino")}
                    fullWidth
                    label="Destino"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="chofer"
                    {...register("chofer")}
                    fullWidth
                    label="Chofer"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="hrSalida"
                    {...register("hrSalida")}
                    fullWidth
                    label="Hora Salida"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="hrLlegada"
                    {...register("hrLlegada")}
                    fullWidth
                    label="Hora LLegada"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="kmRipio"
                    {...register("kmRipio")}
                    fullWidth
                    label="Km. Ripio"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="kmPavimento"
                    {...register("kmPavimento")}
                    fullWidth
                    label="Km. Pavimento"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    id="kmTotal"
                    {...register("kmTotal")}
                    fullWidth
                    label="Km. Total"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="numGuia"
                    disabled
                    {...register("numGuia")}
                    fullWidth
                    label="N° Guía"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="odometroSalida"
                    type="number"
                    {...register("odometroSalida")}
                    fullWidth
                    label="Odómetro Salida"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="odometroLlegada"
                    type="number"
                    {...register("odometroLlegada")}
                    fullWidth
                    label="Odómetro Llegada"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="cantCamion"
                    type="number"
                    {...register("cantCamion")}
                    fullWidth
                    label="Cantidad Camión"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="Estado"
                      id="ruta"
                      value={unidadCamion}
                      onChange={handleChangeUnidadCamion}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {tipoCargaItem
                        ? tipoCargaItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.CODIGO_CARGA}
                              value={item.CODIGO_CARGA}
                            >
                              {item.NOMBRE_TIPO_CARGA}
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
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id="cantCarro"
                    type="number"
                    {...register("cantCarro")}
                    fullWidth
                    label="Cantidad Carros"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="Estado"
                      id="ruta"
                      value={unidadCarro}
                      onChange={handleChangeUnidadCarro}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {tipoCargaItem
                        ? tipoCargaItem.map((item, index) => {
                          return (
                            <MenuItem
                              key={item.CODIGO_CARGA}
                              value={item.CODIGO_CARGA}
                            >
                              {item.NOMBRE_TIPO_CARGA}
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
                  sm={6}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="start"
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Otros Costos</FormLabel>
                    <RadioGroup
                      value={value}
                      onChange={handleChange}
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="no"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="secondary" />}
                        label="No"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="secondary" />}
                        label="Si"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {value === "1" ? null :
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.espaciado}
                      container
                      direction="row"
                      justify="center"
                    >
                      <Grid
                        item
                        xs={12}
                        className={classes.espaciado}
                        container
                        direction="row"
                        justify="center"
                      >
                        <TextField
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="accesorios"
                          {...register("accesorios")}
                          fullWidth
                          label="Accesorios"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="carguio"
                          {...register("carguio")}
                          fullWidth
                          label="Carguio"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="encarpe"
                          {...register("encarpe")}
                          fullWidth
                          label="Encarpe"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="infraccion"
                          {...register("infraccion")}
                          fullWidth
                          label="Infracción"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="peaje"
                          {...register("peaje")}
                          fullWidth
                          label="Peaje"
                          variant="outlined"
                        />
                      </Grid>

                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.espaciado}
                      container
                      direction="row"
                      alignContent="flex-start"
                    >
                      <Grid
                        item
                        xs={12}
                        className={classes.espaciado}
                        container
                        direction="row"
                        justify="center"
                      >
                        <TextField
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="romana"
                          {...register("romana")}
                          fullWidth
                          label="Romana"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="transbordo"
                          {...register("transbordo")}
                          fullWidth
                          label="Transbordo"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="vulcanizacion"
                          {...register("vulcanizacion")}
                          fullWidth
                          label="Vulcanización"
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
                          InputLabelProps={{ shrink: true }}

                          type="number"
                          id="sinRespaldo"
                          {...register("sinRespaldo")}
                          fullWidth
                          label="Sin respaldo"
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
                        <Button onClick={sumarCostos} fullWidth variant="contained" color="primary">
                          Aplicar costos
                        </Button>
                      </Grid>

                    </Grid>
                  </Grid>

                }
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="totalGastos"
                  className={classes.marginboton}
                  {...register("totalGastos")}
                  label="Total gastos"
                  disabled
                  fullWidth
                  defaultValue="0"
                  variant="outlined"
                />

                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="observacion"
                  className={classes.marginboton}
                  {...register("observacion")}
                  label="Observación"
                  multiline
                  rows={3}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    type="number"
                    id="precioUniCamion"
                    value="0"
                    {...register("precioUniCamion")}
                    fullWidth
                    label="Precio Unitario Camión"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    type="number"
                    id="precioUniCarro"
                    {...register("precioUniCarro")}
                    fullWidth
                    value="0"
                    label="Precio Unitario Carro"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    disabled
                    type="number"
                    id="totalViaje"
                    {...register("totalViaje")}
                    fullWidth
                    value="0"
                    label="Total Viaje"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}

              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Button fullWidth type="submit" variant="contained" color="primary">
                Efectuar viaje
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </form>
    </div>
  );
}
