import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));
export default function ObrasActualizacion() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [colorIngreso, setColorIngreso] = React.useState("secondary");
  const [colorModificacion, setColorModificacion] = React.useState("primary");
  const [colorEliminar, setColorEliminar] = React.useState("primary");
  const [switchCombo, setSwitchCombo] = React.useState(false);
  const [actionButton, setActionButton] = React.useState("Guardar");
  const [obras, setObras] = React.useState("obra");
  const [obrasItem, setObrasItem] = React.useState([]);

  const handleChangeObras = (event) => {
    setObras(event.target.value);

    try {
      const datosObra = obrasItem.find(
        (obra) => obra.CODIGO_OBRA === event.target.value
      );

      document.getElementById("descripcion").value = datosObra.DESCRIPCION_OBRA;
      document.getElementById("descripcion").focus();
    } catch (error) {}
  };

  useEffect(() => {
    cargarObras();
  }, []);
  const cargarObras = async () => {
    const { data } = await Axios.get("/api/obra/");
    setObrasItem(data.data);
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

    if (data.descripcion === "" || data.descripcion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar descipción.<br>";

    switch (actionButton) {
      case "Guardar":
        if (data.codigoObra === "" || data.codigoObra === undefined)
          mensajeDatosFaltantes += " - Falta ingresar codigo de obra.<br>";
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
          Axios.post("/api/obra/", {
            CODIGO_OBRA: data.codigoObra,
            DESCRIPCION_OBRA: data.descripcion,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                Swal.fire({
                  title: "Obra creado",
                  text: response.data.message,
                  icon: "success",
                });
              }
              cargarObras();
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
          if (obras !== "") {
            Axios.put(`/api/obra/${obras}`, {
              DESCRIPCION_OBRA: data.descripcion,
            })
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    title: "Obra modificada",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarObras();
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
              text: "Debe seleccionar alguna obra",
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
          if (obras !== "") {
            Axios.delete(
              "/api/obra/" + obras
            )
              .then((response) => {
                Swal.fire({
                  title: "Obra eliminada",
                  text: response.data.message,
                  icon: "success",
                });
                cargarObras();
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
              text: "Debe seleccionar alguna obra",
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
          <Paper elevation={13} fullWidth className={classes.paper}>
            {!switchCombo ? (
              <TextField
                id="codigoObra"
                type="number"
                {...register("codigoObra")}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.espaciadoInput}
                fullWidth
                label="Código de Obra"
                variant="outlined"
              />
            ) : (
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
                            {item.CODIGO_OBRA}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            )}
            <TextField
              id="descripcion"
              label="Descripción"
              {...register("descripcion")}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              className={classes.espaciadoInput}
              rows={3}
              fullWidth
              variant="outlined"
            />
          </Paper>
          <Grid item xs={12} container direction="row" justify="center">
            <Button
              fullWidth
              type="submit"
              id="aBoton"
              className={classes.espaciadoInput}
              variant="contained"
              color="primary"
            >
              Grabar ingreso
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
