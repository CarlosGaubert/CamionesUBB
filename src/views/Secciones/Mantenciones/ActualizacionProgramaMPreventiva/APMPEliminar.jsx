import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
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
    margin: theme.spacing(3),
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

export default function APMPEliminar() {
  const classes = useStyles();
  const [mantencion, setMantencion] = React.useState("");
  const { register, handleSubmit, reset } = useForm();
  const [mantencioneNormalItem, setMantencioneNormal] = React.useState([]);

  const handleChangeMantencion = (event) => {
    setMantencion(event.target.value);

    try {
      const datosMantencionNormal = mantencioneNormalItem.find(
        (mantencionM) => mantencionM.CODIGO_MANTENCION === event.target.value
      );

      document.getElementById("programa").value =
        datosMantencionNormal.OBSERVACION_MANTENCION;
      document.getElementById("programa").focus();
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

  const onSubmit = (data, e) => {
    var mensajeDatosFaltantes = "";
    if (data.programa === undefined)
      mensajeDatosFaltantes += " - Falta ingresar descripción de programa.<br>";

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
      Axios.delete("/api/mantencionnormal/" + mantencion)
        .then((response) => {
          if (response.status === 200) {
            Axios.put(
              "/api/programademantencion/" + mantencion)
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
        <Grid container>
          <Paper className={classes.paper}>
            <Grid item xs={12} container full direction="row" justify="center">
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
            </Grid>
          </Paper>
          <Paper spacing={3} className={classes.paper}>
            <Typography variant="h6" noWrap>
              Programa de Mantención Normal
            </Typography>
            <Grid item xs={12} container full direction="row" justify="center">
              tabla
            </Grid>
          </Paper>
          <Button
            type="submit"
            className={classes.espaciado}
            variant="contained"
            fullWidth
            color="primary"
          >
            Eliminar Ingreso
          </Button>
        </Grid>
      </div>
    </form>
  );
}
