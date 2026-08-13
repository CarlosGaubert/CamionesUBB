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
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
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
    minWidth: "100%",
  },
}));

export default function APMPIngreso() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [camion, setCamion] = React.useState("");
  const [camionesItem, setCamionesItem] = React.useState([]);

  const handleChangeCamion = (event) => {
    setCamion(event.target.value);
  };

  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async () => {
    const { data } = await Axios.get("/api/camion/");
    setCamionesItem(data.data);
    return null;
  };

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";

    if (camion === "")
      mensajeDatosFaltantes +=
        " - Falta seleccionar seleccionar un camión.<br>";
  
    if (data.elemento === undefined)
      mensajeDatosFaltantes += " - Falta ingresar un elemento.<br>";
    if (data.tipo === undefined)
      mensajeDatosFaltantes += " - Falta ingresar un tipo.<br>";
    if (data.accion === undefined)
      mensajeDatosFaltantes += " - Falta ingresar acción.<br>";
    if (data.kilometraje === undefined)
      mensajeDatosFaltantes += " - Falta ingresar kilometraje.<br>";
    if (data.observacion === undefined)
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
      Axios.post("/api/mantencionnormal/", {
        CODIGO_MANTENCION: camion,
        OBSERVACION_MANTENCION: data.observacion,
      })
        .then((response) => {
          if (response.status === 200) {  
            Axios.post("/api/programademantencion/", {
              CODIGO_MANTENCION: response.data.data.CODIGO_MANTENCION,
              ELEMENTO: data.elemento,
              TIPO: data.tipo,
              MANTENCION: data.accion,
              KILOMETRAJE_PROGRAMADO: data.kilometraje,
              FECHA_DE_MANTENCION: new Date(),
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Programa de mantención",
                    text: response.data.message,
                    icon: "success",
                  });
                  cargarCamiones()
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
      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.paper}>
            <Grid item xs={12} container full direction="row" justify="center">
              <Grid
                item
                xs={6}
                className={classes.espaciado}
                container
                direction="row"
                alignContent="flex-start"
                spacing={1}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                >
                  <InputLabel id="primerCamion">Patente camión</InputLabel>
                  <Select
                    labelId="primerCamion"
                    id="primerCamion"
                    value={camion}
                    onChange={handleChangeCamion}
                    label="Patente camión"
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

                <TextField
                  
                  InputLabelProps={{ shrink: true }}
                  id="elemento"
                  {...register("elemento")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Elemento"
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
                spacing={1}
              >
                <TextField
                  
                  InputLabelProps={{ shrink: true }}
                  id="tipo"
                  {...register("tipo")}
                  fullWidth
                  label="Tipo"
                  variant="outlined"
                />

                <TextField
                  
                  InputLabelProps={{ shrink: true }}
                  id="accion"
                  {...register("accion")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Acción"
                  variant="outlined"
                />
                <TextField
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  id="kilometraje"
                  {...register("kilometraje")}
                  className={classes.espaciadoInput}
                  fullWidth
                  label="Kilometraje"
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
                spacing={1}
              >
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="observacion"
                  {...register("observacion")}
                  label="Descripción"
                  multiline
                  rows={6}
                  fullWidth
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Tabla de mantención preventiva
            </Typography>
            <Grid item xs={12} container full direction="row" justify="center">
              tabla
            </Grid>
            <Grid item xs={12} container direction="row" justify="center">
              <Grid
                item
                xs={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Graba programa
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.espaciado}
                container
                direction="row"
                justify="center"
              >
                <Button
                  variant="contained"
                  onClick={() => reset()}
                  fullWidth
                  color="primary"
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </div>
  );
}
