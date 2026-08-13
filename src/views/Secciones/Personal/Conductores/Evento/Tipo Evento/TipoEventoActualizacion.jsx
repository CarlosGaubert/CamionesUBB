import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(1),
  },
  espaciado2: {
    marginTop: theme.spacing(2),
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
export default function TipoEventoActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [evento, setEvento] = React.useState("");
  const [eventoItem, setEventoItem] = React.useState([]);

  const handleChangeEvento = (event) => {
    setEvento(event.target.value);
  };

  useEffect(() => {
    cargarEvento();
  }, []);

  const cargarEvento = async () => {
    const { data } = await Axios.get("http://localhost:4000/api/eventochofer/");
    setEventoItem(data.data);
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
    switch (actionButton) {
      case "Guardar":
        if (data.evento === "")
          mensajeDatosFaltantes =
            " - Falta ingresar tipo de evento.<br>" + mensajeDatosFaltantes;

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
          Axios.post("http://localhost:4000/api/eventochofer/", {
            DESCRIPCION_EVENTO: data.evento,
          })
            .then((response) => {
            
              if (response.status === 200) {
                Swal.fire({
                  title: "Tipo de evento creado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarEvento();
              reset()
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
  
      
          if (evento !== "") {

              Axios.put(
                `http://localhost:4000/api/eventochofer/${evento}`,
                {
                  DESCRIPCION_EVENTO: data.nuevoTipoEvento,
                
                }
              )
                .then((response) => {
                  if (response.status === 200) {
                    Swal.fire({
                      title: "Tipo de evento modificado",
                      text: response.data.message,
                      icon: "success",
                    });
                  }
                  cargarEvento()
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
              text: "Debe seleccionar algun tipo de evento",
              icon: "error",
            });
          
        }
        break;
      case "Eliminar":
        if (evento !== "") {
            Axios.delete(
              "http://localhost:4000/api/eventochofer/" + evento 
            )
              .then((response) => {
                Swal.fire({
                  title: "Tipo de evento eliminado",
                  text: response.data.message,
                  icon: "success",
                });
                cargarEvento()
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
            text: "Debe seleccionar algun tipo de evento",
            icon: "error",
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
          <Paper elevation={10} fullWidth className={classes.paper}>
            <Typography className={classes.titulo} variant="h6" noWrap>
              Datos Conductor
            </Typography>
            <Grid container justify="center">
              <Grid
                item
                md={12}
                xs={12}
                className={classes.espaciado}
                justify="center"
              >
                {!switchCombo ? (
                  <TextField
                    id="evento"
                    label="Evento"
                    {...register("evento")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    defaultValue=""
                    variant="outlined"
                  />
                ) : (
                  <div>
                    <FormControl
                      className={classes.espaciadoInput}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id="primerCamion">Tipo evento</InputLabel>
                      <Select
                        labelId="primerCamion"
                        id="primerCamion"
                        value={evento}
                        onChange={handleChangeEvento}
                        label="Tipo evento"
                      >
                        <MenuItem value="">
                          <em></em>
                        </MenuItem>
                        {eventoItem
                          ? eventoItem.map((item, index) => {
                              return (
                                <MenuItem
                                  key={item.CODIGO_EVENTO}
                                  value={item.CODIGO_EVENTO}
                                >
                                  {item.DESCRIPCION_EVENTO}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    </FormControl>
                    <TextField
                      id="nuevoTipoEvento"
                      label="Nuevo tipo evento"
                      className={classes.espaciado2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register("nuevoTipoEvento")}
                      multiline
                      rows={6}
                      fullWidth
                      defaultValue=""
                      variant="outlined"
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Button
            fullWidth
            type="submit"
            id="aBoton"
            className={classes.espaciado}
            variant="contained"
            color="primary"
          >
            Grabar Ingreso
          </Button>
        </Grid>
      </div>
    </form>
  );
}
