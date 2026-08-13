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
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


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
export default function TCCActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [estado, setEstado] = React.useState("");
  const [choferes, setChoferes] = React.useState("");
  const [choferesItem, setChoferesItem] = React.useState([]);
  const [tarjeta, setTarjeta] = React.useState("");
  const [tarjetaItem, setTarjetaItem] = React.useState([]);

  const handleChangeTarjeta = (event) => {
    setTarjeta(event.target.value);

    try {
      const datosTarjeta = tarjetaItem.find(
        (tarjeta) => tarjeta.CODIGO_TARJETA === event.target.value
      );
    
      document.getElementById("tope").value = datosTarjeta.TOPE_TARJETA;
      document.getElementById("tope").focus();
      setEstado(datosTarjeta.ESTADO_TARJETA)
     
      setChoferes(datosTarjeta.RUT_EMPLEADO)

      const datosChofer = choferesItem.find(
        (chofer) => chofer.RUT_EMPLEADO === datosTarjeta.RUT_EMPLEADO
      );

      document.getElementById("rut").value =
        datosChofer.RUT_EMPLEADO + "-" + datosChofer.DIGITO_CONDUCTOR;
      document.getElementById("rut").focus();
      document.getElementById("nombre").value =
        datosChofer.NOMBRE_EMPLEADO +
        " " +
        datosChofer.NOMBRE_EMPLEADO2 +
        " " +
        datosChofer.APELLIDO_EMPLEADO +
        " " +
        datosChofer.APELLIDO_EMPLEADO2;
      document.getElementById("nombre").focus();
      document.getElementById("telefono").value = datosChofer.FONO_EMPLEADO;
      document.getElementById("telefono").focus();
      document.getElementById("direccion").value =
        datosChofer.DIRECCION_EMPLEADO;
      document.getElementById("direccion").focus();
    } catch (error) {
      
    }
  };

  const handleChangeChoferes = (event) => {
    setChoferes(event.target.value);

    try {
      const datosChofer = choferesItem.find(
        (chofer) => chofer.RUT_EMPLEADO === event.target.value
      );

      document.getElementById("rut").value =
        datosChofer.RUT_EMPLEADO + "-" + datosChofer.DIGITO_CONDUCTOR;
      document.getElementById("rut").focus();
      document.getElementById("nombre").value =
        datosChofer.NOMBRE_EMPLEADO +
        " " +
        datosChofer.NOMBRE_EMPLEADO2 +
        " " +
        datosChofer.APELLIDO_EMPLEADO +
        " " +
        datosChofer.APELLIDO_EMPLEADO2;
      document.getElementById("nombre").focus();
      document.getElementById("telefono").value = datosChofer.FONO_EMPLEADO;
      document.getElementById("telefono").focus();
      document.getElementById("direccion").value =
        datosChofer.DIRECCION_EMPLEADO;
      document.getElementById("direccion").focus();
    } catch (error) {}
  };
  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
  };

  useEffect(() => {
    cargarChoferes();
  }, []);
  const cargarChoferes = async () => {
    const { data } = await Axios.get("/api/chofer/");
    setChoferesItem(data.data);
    return null;
  };

  useEffect(() => {
    cargarTarjetas();
  }, []);
  const cargarTarjetas = async () => {
    const { data } = await Axios.get(
      "/api/tarjetacredito/"
    );
    setTarjetaItem(data.data);
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

  
    if (data.tope === "" || data.tope === undefined)
      mensajeDatosFaltantes += " - Falta ingresar tope.<br>";
    if (estado === "")
      mensajeDatosFaltantes += " - Falta ingresar estado de tarjeta.<br>";
    if (choferes === "")
      mensajeDatosFaltantes += " - Falta ingresar chofer.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.codigo === "" || data.codigo === undefined)
        mensajeDatosFaltantes += " - Falta ingresar codigo de tarjeta.<br>";
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
         
          Axios.post("/api/tarjetacredito/", {
            CODIGO_TARJETA: data.codigo,
            TOPE_TARJETA: data.tope,
            ESTADO_TARJETA: estado,
            RUT_EMPLEADO: choferes,
           
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
              cargarTarjetas()
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
          if (tarjeta !== "") {
            Axios.put(`/api/tarjetacredito/${tarjeta}`, {
              TOPE_TARJETA: data.tope,
              ESTADO_TARJETA: estado,
              RUT_EMPLEADO: choferes,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Tarjeta de credito modificado",
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
              text: "Debe seleccionar alguna tarjeta de credito",
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
          if (tarjeta !== "") {
            Axios.delete("/api/tarjetacredito/" + tarjeta)
              .then((response) => {
                Swal.fire({
                  title: "Tarjeta de credito eliminada",
                  text: response.data.message,
                  icon: "success",
                });
                cargarTarjetas()
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
              text: "Debe seleccionar alguna tarjeta de credito",
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
          <Grid
            item
            xs={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Typography variant="h6" noWrap>
                Datos
              </Typography>
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
                  {!switchCombo ? (
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("codigo")}
                      id="codigo"
                      fullWidth
                      label="Código"
                      variant="outlined"
                    />
                  ) : (
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="primerCamion">Codigo</InputLabel>
                      <Select
                        labelId="numeroBoletaform"
                        id="numeroBoletaform"
                        value={tarjeta}
                        onChange={handleChangeTarjeta}
                        label="Codigo"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {tarjetaItem
                          ? tarjetaItem.map((item, index) => {
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
                  )}
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
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("tope")}
                    id="tope"
                    fullWidth
                    label="Tope"
                    variant="outlined"
                  />
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
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="Estado"
                      id="ruta"
                      value={estado}
                      onChange={handleChangeEstado}
                      label="Estado"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {["No vigente", "Vigente"].map((item, index) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
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
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="primerCamion">Chofer</InputLabel>
                    <Select
                      labelId="numeroBoletaform"
                      id="numeroBoletaform"
                      value={choferes}
                      onChange={handleChangeChoferes}
                      label="Chofer"
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
                  <TextField disabled id="rut" fullWidth variant="outlined" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.espaciado}
            container
            direction="row"
            justify="center"
          >
            <Paper elevation={13} fullWidth className={classes.paper}>
              <Typography variant="h6" noWrap>
                Datos del conductor
              </Typography>
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
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="nombre"
                    fullWidth
                    label="Nombre"
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
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="telefono"
                    fullWidth
                    label="Teléfono"
                    variant="outlined"
                  />
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
                  <TextField
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="direccion"
                    fullWidth
                    label="Dirección"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                container
                direction="row"
                justify="center"
              >
                <Button
                  fullWidth
                  id="aBoton"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Grabar Ingreso
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
