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
import Axios from "axios";
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
export default function TarifaOtrosClientes() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [cliente, setCliente] = React.useState("");
  const [clienteItem, setClienteItem] = React.useState([]);
  const [unidadMedida, setunidadMedida] = React.useState("");

  const handleChangeUnidadMedida = (event) => {
    setunidadMedida(event.target.value);

    if (switchCombo) {
      cargarClietesByTarifaUM(cliente, event.target.value);
    }
  };

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };

  useEffect(() => {
    cargarClietes();
  }, []);

  const cargarClietesByTarifaUM = async (cliente, um) => {
    const { data } = await Axios.get(
      "/api/tarifa/" + cliente + "&" + um
    );
    try {
      if (data.data.length === 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          title: "Este cliente no registra tarifa con esta unidad de medida.",
        });
        reset();
      } else {
        document.getElementById("tarifa").value = data.data[0].Tarifa;
        document.getElementById("tarifa").focus();
      }
    } catch (error) {
      console.log(error);
    }

    return null;
  };

  const cargarClietes = async () => {
    const { data } = await Axios.get("/api/cliente/");
    setClienteItem(data.data);
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

    if (data.tarifa === "" || data.tarifa === undefined)
      mensajeDatosFaltantes += " - Falta ingresar tarifa.<br>";
    if (cliente === "")
      mensajeDatosFaltantes += " - Falta ingresar cliente.<br>";
    if (unidadMedida === "")
      mensajeDatosFaltantes += " - Falta ingresar cliente.<br>";

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
          Axios.post("/api/tarifa/", {
            Codigo_Cliente: cliente,
            U_M_tarifa: unidadMedida,
            Tari: data.tarifa,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Tarifa registrada",
                  text: response.data.message,
                  icon: "success",
                });
              }

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
          Axios.put(
            `/api/tarifa/${cliente}&${unidadMedida}`,
            {
              Tari: data.tarifa,
            }
          )
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  title: "Tarifa modificada",
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
          Axios.delete(`/api/tarifa/${cliente}&${unidadMedida}`)
            .then((response) => {
              Swal.fire({
                title: "Tarifa eliminada",
                text: response.data.message,
                icon: "success",
              });
              reset();
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
              <Grid container>
                <Grid
                  item
                  xs={4}
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
                                {item.CODIGO_CLIENTE}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.espaciado2}
                  >
                    <InputLabel>Unidad de Medida</InputLabel>
                    <Select
                      labelId="Unidad de Medida"
                      id="unidadMedida"
                      value={unidadMedida}
                      onChange={handleChangeUnidadMedida}
                      label="Unidad de Medida"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {["Metro Ruma", "Metro Cúbico", "Tonelada"].map(
                        (item, index) => (
                          <MenuItem value={index + 1}>{item}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  className={classes.espaciado}
                  container
                  direction="row"
                  justify="center"
                >
                  <TextField
                    type="number"
                    id="tarifa"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("tarifa")}
                    fullWidth
                    label="Tarifa"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                className={classes.espaciado}
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
                  Grabar Ingresos
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
