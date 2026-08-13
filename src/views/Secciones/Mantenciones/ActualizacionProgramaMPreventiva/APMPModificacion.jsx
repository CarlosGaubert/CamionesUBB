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
import Box from "@material-ui/core/Box";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
  boton: {
    marginTop: theme.spacing(3),
  },
}));

export default function APMPModificacion() {
  const classes = useStyles();
  const [mantencion, setMantencion] = React.useState("");
  const { register, handleSubmit } = useForm();
  const [mantencioneNormalItem, setMantencioneNormal] = React.useState([]);
  const [programaMantencionItem, setProgramaMantencion] = React.useState([]);

  const handleChangeMantencion = (event) => {
    setMantencion(event.target.value);

    try {
      const datosMantencionNormal = mantencioneNormalItem.find(
        (mantencionM) => mantencionM.CODIGO_MANTENCION === event.target.value
      );

      document.getElementById("programa").value =
        datosMantencionNormal.OBSERVACION_MANTENCION;
      document.getElementById("programa").focus();

      const datosProgramaMantencion = programaMantencionItem.find(
        (programaM) => programaM.CODIGO_MANTENCION === event.target.value
      );

      document.getElementById("elementoMod").value =
        datosProgramaMantencion.ELEMENTO;
      document.getElementById("tipoMod").value = datosProgramaMantencion.TIPO;
      document.getElementById("accionMod").value =
        datosProgramaMantencion.MANTENCION;
      document.getElementById("kilometrajeMod").value =
        datosProgramaMantencion.KILOMETRAJE_PROGRAMADO;

      document.getElementById("elementoMod").focus();
      document.getElementById("tipoMod").focus();
      document.getElementById("accionMod").focus();
      document.getElementById("kilometrajeMod").focus();
    } catch (error) {}
  };

  useEffect(() => {
    cargarMantencionNormal();
  }, []);
  const cargarMantencionNormal = async () => {
    const { data } = await Axios.get(
      "/api/mantencionnormal/"
    );
    setMantencioneNormal(data.data);
    return null;
  };

  useEffect(() => {
    cargarProgramaMantencion();
  }, []);
  const cargarProgramaMantencion = async () => {
    const { data } = await Axios.get(
      "/api/programademantencion/"
    );
    setProgramaMantencion(data.data);
    return null;
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";
    if (data.kilometrajeNew === undefined)
      mensajeDatosFaltantes += " - Falta ingresar kilometraje.<br>";
    if (data.programa === undefined)
      mensajeDatosFaltantes += " - Falta ingresar descripción.<br>";

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
      //grabar
      Axios.put("/api/mantencionnormal/" + mantencion, {
        OBSERVACION_MANTENCION: data.programa,
      })
        .then((response) => {
          if (response.status === 200) {
            Axios.put(
              "/api/programademantencion/" + mantencion,
              {
                KILOMETRAJE_PROGRAMADO: data.kilometrajeNew,
                FECHA_DE_MANTENCION: new Date(),
              }
            )
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Programa de mantención",
                    text: response.data.message,
                    icon: "success",
                  });
                }
                cargarMantencionNormal();
                cargarProgramaMantencion();
              })
              .catch((error) => {
                Swal.fire({
                  title: "Error !",
                  text: error.response.data.message,
                  icon: "error",
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
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="primerCamion">Patente Mantencion</InputLabel>
                <Select
                  labelId="primerCamion"
                  id="primerCamion"
                  value={mantencion}
                  onChange={handleChangeMantencion}
                  label="Patente Mantencion"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {mantencioneNormalItem
                    ? mantencioneNormalItem.map((item, index) => {
                        return (
                          <MenuItem
                            key={item.CODIGO_MANTENCION}
                            value={item.CODIGO_MANTENCION}
                          >
                            {item.CODIGO_MANTENCION}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="programa"
                {...register("programa")}
                className={classes.espaciadoInput}
                label="Programa"
                multiline
                rows={6}
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" noWrap>
                Modificación de Mantención
              </Typography>
              listado
              <Grid container>
                <Grid item xs={6} spacing={1}>
                  <Box m={0.5}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="elementoMod"
                      {...register("elementoMod")}
                      disabled
                      label="Elemento"
                      className={classes.espaciadoInput}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="tipoMod"
                      {...register("tipoMod")}
                      disabled
                      label="Tipo"
                      className={classes.espaciadoInput}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} spacing={1}>
                  <Box m={0.5}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="accionMod"
                      {...register("accionMod")}
                      disabled
                      label="Acción"
                      className={classes.espaciadoInput}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      id="kilometrajeMod"
                      {...register("kilometrajeMod")}
                      disabled
                      label="Kilometraje Programa"
                      className={classes.espaciadoInput}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" noWrap>
                <ListItemIcon className={classes.menuItemIcon}>
                  <FontAwesomeIcon icon={faTools} size="xs" />
                </ListItemIcon>
                Ingreso Nueva Mantención
              </Typography>

              <TextField
                InputLabelProps={{ shrink: true }}
                id="kilometrajeNew"
                {...register("kilometrajeNew")}
                label="Kilometraje Programa"
                className={classes.espaciadoInput}
                fullWidth
                variant="outlined"
              />
              <Button
                type="submit"
                className={classes.boton}
                variant="contained"
                fullWidth
                color="primary"
              >
                Grabar Ingreso
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
