import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function IFActualizacion() {
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [bancos, setBancos] = React.useState("");
  const [bancosItem, setBancosItem] = React.useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleChangeBancos = (event) => {
    setBancos(event.target.value);

    try {
      const datosBanco = bancosItem.find(
        (banco) => banco.CODIGO_BANCO === event.target.value
      );

        
      document.getElementById("nombre").value = datosBanco.NOMBRE_BANCO;
      document.getElementById("direccion").value = datosBanco.DIRECCION_INSTITUCION;
      document.getElementById("fono").value =
      datosBanco.FONO_BANCO;
      document.getElementById("fax").value = datosBanco.FAX_BANCO;

      document.getElementById("nombre").focus()
      document.getElementById("direccion").focus()
      document.getElementById("fono").focus()
      document.getElementById("fax").focus()
      
    }catch (error) {

    }


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

  useEffect(() => {
    cargarBancos();
  }, []);
  const cargarBancos = async () => {
    const { data } = await Axios.get("/api/banco/");
    setBancosItem(data.data);
    return null;
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

   
    if (data.nombre === "" || data.nombre === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar nombre del banco o institución financiera.<br>";
    if (data.direccion === "" || data.direccion === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar direccion del banco o institución financiera.<br>";
    if (data.fono === "" || data.fono === undefined)
      mensajeDatosFaltantes +=
        " - Falta ingresar fono de banco o institución financiera.<br>";
    if (data.fax === "" || data.fax === undefined)
      mensajeDatosFaltantes += " - Falta ingresar fax de institución financiera.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.rut === "" || data.rut === undefined)
        mensajeDatosFaltantes += " - Falta ingresar rut del banco o institución financiera.<br>";

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

          Axios.post("/api/banco/", {
            CODIGO_BANCO: rutsolo,
            NOMBRE_BANCO: data.nombre,
            DIRECCION_INSTITUCION: data.direccion,
            FONO_BANCO: data.fono,
            FAX_BANCO: data.fax,
            DIGITO_BANCO: dv
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Institucion financiera creada",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarBancos()
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
          if (bancos !== "") {
            Axios.put(
              `/api/banco/${bancos}`,
              {
                NOMBRE_BANCO: data.nombre,
                DIRECCION_INSTITUCION: data.direccion,
                FONO_BANCO: data.fono,
                FAX_BANCO: data.fax,
              }
            )
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Institucion financiera modificada",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarBancos()
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
              text: "Debe seleccionar algun banco",
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
          if (bancos !== "") {
            Axios.delete(
              `/api/banco/${bancos}`)
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Institucion financiera eliminada",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarBancos()
                reset()
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
              text: "Debe seleccionar algun banco",
              icon: "error",
            });
          }
        }
        break;
      default:
        break;
    }

  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
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
            xs={12}
            md={4}
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
            xs={12}
            md={4}
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
          <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Datos de la institución financiera
            </Typography>
            <Grid item xs={12} container full direction="row" justify="center">
              <Grid
                item
                xs={12}
                md={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                {!switchCombo ? (
                  <TextField
                    
                    id="rut"
                    {...register("rut")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Rut"
                    variant="outlined"
                  />
                ) : (
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="primerCamion">Numero boleta</InputLabel>
                    <Select
                      labelId="numeroBoletaform"
                      id="numeroBoletaform"
                      value={bancos}
                      onChange={handleChangeBancos}
                      label="Numero boleta"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      {bancosItem
                        ? bancosItem.map((item, index) => {
                            return (
                              <MenuItem
                                key={item.CODIGO_BANCO}
                                value={item.CODIGO_BANCO}
                              >
                                {item.NOMBRE_BANCO}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                )}
                <TextField
                  
                  id="nombre"
                  {...register("nombre")}
                  className={classes.espaciadoInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  
                  id="direccion"
                  {...register("direccion")}
                  className={classes.espaciadoInput}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Direccion"
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
                <Box alignItems="flex-start">
                  <TextField
                    
                    id="fono"
                    {...register("fono")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label="Fono"
                    variant="outlined"
                  />

                  <TextField
                    
                    id="fax"
                    {...register("fax")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.espaciadoInput}
                    fullWidth
                    label="Fax"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} container direction="row" justify="center">
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
          </Paper>
        </Grid>
      </form>
    </div>
  );
}
