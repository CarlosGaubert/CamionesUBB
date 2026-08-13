import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import Swal from "sweetalert2";
import { validate } from "rut.js";

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
    padding: theme.spacing(2),
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

export default function ClientesActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [cliente, setCliente] = React.useState("");
  const [clienteItem, setClienteItem] = React.useState([]);

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);

    try {
      const rutsolo = event.target.value.substring(
        0,
        event.target.value.length - 1
      );
      const datosCliente = clienteItem.find(
        (cliente) => cliente.CODIGO_CLIENTE === parseInt(rutsolo)
      );

      console.log(datosCliente.NOMBRE_CLIENTE);
      document.getElementById("nombre").value = datosCliente.NOMBRE_CLIENTE;
      document.getElementById("direccion").value =
        datosCliente.DIRECCION_CLIENTE;
      document.getElementById("girocliente").value = datosCliente.GIRO_CLIENTE;
      document.getElementById("telefono").value = datosCliente.FONO_CLIENTE;
      document.getElementById("fax").value = datosCliente.FAX_CLIENTE;
      document.getElementById("observacion").value =
        datosCliente.OBSERVACION_CLIENTE;

      document.getElementById("nombre").focus();
      document.getElementById("direccion").focus();
      document.getElementById("girocliente").focus();
      document.getElementById("telefono").focus();
      document.getElementById("fax").focus();
      document.getElementById("observacion").focus();
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

    if (data.nombre === "" || data.nombre === undefined)
      mensajeDatosFaltantes += " - Falta ingresar nombre de cliente.<br>";
    if (data.direccion === "" || data.direccion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar direccion de cliente.<br>";
    if (data.girocliente === "" || data.girocliente === undefined)
      mensajeDatosFaltantes += " - Falta ingresar giro de cliente.<br>";
    if (data.telefono === "" || data.telefono === undefined)
      mensajeDatosFaltantes += " - Falta ingresar telefono de cliente.<br>";
    if (data.fax === "" || data.fax === undefined)
      mensajeDatosFaltantes += " - Falta ingresar fax de cliente.<br>";
    if (data.observacion === "" || data.observacion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar observación de cliente.<br>";

    switch (actionButton) {
      case "Guardar":
        if (validate(data.rut)) {
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
            const dv = data.rut.charAt(data.rut.length - 1);
            const rutsolo = data.rut.substring(0, data.rut.length - 1);

            Axios.post("/api/cliente/", {
              CODIGO_CLIENTE: rutsolo,
              NOMBRE_CLIENTE: data.nombre,
              DIRECCION_CLIENTE: data.direccion,
              FAX_CLIENTE: data.fax,
              FONO_CLIENTE: data.telefono,
              OBSERVACION_CLIENTE: data.observacion,
              GIRO_CLIENTE: data.girocliente,
              DIGITO_CLIENTE: dv,
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Cliente creado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarClientes();
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
        } else {
          Swal.fire({
            title: "Error !",
            text: "Rut no valido",
            icon: "error",
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
          if (cliente !== "") {
            const rutsolo = cliente.substring(0, cliente.length - 1);
            Axios.put(`/api/cliente/${rutsolo}`, {
              NOMBRE_CLIENTE: data.nombre,
              DIRECCION_CLIENTE: data.direccion,
              FAX_CLIENTE: data.fax,
              FONO_CLIENTE: data.telefono,
              OBSERVACION_CLIENTE: data.observacion,
              GIRO_CLIENTE: data.girocliente,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Cliente modificado",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarClientes();
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
              text: "Debe seleccionar algun cliente",
              icon: "error",
            });
          }
        }
        break;
      case "Eliminar":
        if (cliente !== "") {
          const rutsolo = cliente.substring(0, cliente.length - 1);
          Axios.delete("/api/cliente/" + rutsolo)
            .then((response) => {
              Swal.fire({
                title: "Cliente eliminado",
                text: response.data.message,
                icon: "success",
              });
              cargarClientes();
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
              fullWidth
              color={colorModificacion}
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
              fullWidth
              color={colorEliminar}
            >
              Eliminación
            </Button>
          </Grid>
          <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Antecedentes Generales
            </Typography>
            <Grid item xs={12} container full direction="row" justify="center">
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="rut"
                    {...register("rut")}
                    fullWidth
                    label="Rut"
                    variant="outlined"
                  />
                ) : (
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
                                key={item.CODIGO_CLIENTE + item.DIGITO_CLIENTE}
                                value={
                                  item.CODIGO_CLIENTE + item.DIGITO_CLIENTE
                                }
                              >
                                {item.CODIGO_CLIENTE + item.DIGITO_CLIENTE}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="nombre"
                  {...register("nombre")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="direccion"
                  {...register("direccion")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Direccion"
                  variant="outlined"
                />
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="girocliente"
                  {...register("girocliente")}
                  fullWidth
                  label="Giro del Cliente"
                  variant="outlined"
                />

                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="telefono"
                  {...register("telefono")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Telefono"
                  variant="outlined"
                />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="fax"
                  {...register("fax")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Fax"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Observación"
                  {...register("observacion")}
                  multiline
                  rows={6}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" justify="center">
              <Button
                variant="contained"
                type="submit"
                id="aBoton"
                color="primary"
              >
                Grabar ingreso
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </div>
  );
}
