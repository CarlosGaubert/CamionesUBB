import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import arrayMove from "array-move";
import Paper from "@material-ui/core/Paper";
import SortableList, { SortableItem } from "react-easy-sort";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  select: {
    width: "80%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "95%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
};

export default function CamionAsignarCarro() {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  const [patente, setPatente] = React.useState("");
  const [camionesItem, setCamionesItem] = React.useState([]);
  const [selectCamion, setSelectCamion] = useState(false);
  const [patenteCarroAsociada, setPatenteCarroAsociada] = useState("");
  useEffect(() => {
    cargarCamiones();
  }, []);
  const cargarCamiones = async () => {
    const { data } = await Axios.get("/api/camion/");
    setCamionesItem(data.data);
    return null;
  };
  useEffect(() => {
    cargarCarrosLibres();
  }, []);
  const cargarCarrosLibres = async () => {
    const { data } = await Axios.get(
      "/api/carro/sincamion/"
    );
    setItems(data.data);
    return null;
  };

  const handleChangePatente = (event) => {
    setPatente(event.target.value);

    if (event.target.value === "") {
      setSelectCamion(false);
      setPatenteCarroAsociada("");
    } else {
      setSelectCamion(true);

      try {
        const datosCamion = camionesItem.find(
          (camion) => camion.PATENTE_CAMION === event.target.value
        );

        if (datosCamion.Patente_Carro === null) {
          setPatenteCarroAsociada("Espacio libre para asociar un carro");
        } else {
          setPatenteCarroAsociada(datosCamion.Patente_Carro);
        }
      } catch (error) {}
    }
  };

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  const desanclarCarro = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Ingresar odometro",
      html: '<input id="odometro" type="number" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("odometro").value];
      },
    });

    if (formValues) {
      if (patenteCarroAsociada !== "Espacio libre para asociar un carro") {
        Swal.fire({
          title: `¿Seuro deseas desanclar este carro "${patenteCarroAsociada}" del camión "${patente}"?`,
          icon: "info",
          showDenyButton: true,
          confirmButtonText: `Desanclar`,
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Axios.put("/api/camion/" + patente, {
              Patente_Carro: null,
            })
              .then((response) => {
                if (response.status === 200) {
                  cargarCarrosLibres();
                  cargarCamiones();
                  setPatenteCarroAsociada(
                    "Espacio libre para asociar un carro"
                  );
                  // agregar odometro
                  let fecha = new Date();
                  let dia = fecha.getDate();
                  let mes = fecha.getMonth() + 1;
                  let anio = fecha.getFullYear();
                  let final = anio + "-" + mes + "-" + dia;

                  console.log(final, formValues);
                  Axios.put(
                    "/api/odometro/" +
                      patente +
                      "&" +
                      final,
                    {
                      ODOMETRO_CAMION: formValues[0],
                    }
                  )
                    .then((response) => {
                      if (response.status === 200) {
                        Swal.fire({
                          title: "Carro desanclado",
                          text: "Carro desanclado correctamente",
                          icon: "success",
                        });
                      }
                    })
                    .catch((error) => {
                      Swal.fire({
                        title: "Cuidado !",
                        text: "Ocurrio un error inesperado",
                        icon: "warning",
                      });
                    });
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Cuidado !",
                  text: "Ocurrio un error inesperado",
                  icon: "warning",
                });
              });
          } else if (result.isDenied) {
          }
        });
      } else {
        Swal.fire(
          "Error",
          "Este camión no tiene ningún carro asignado",
          "warning"
        );
      }
    } else {
      Swal.fire("Error", "Debe ingresar un odometro", "warning");
    }
  };

  const handleClickCarro = async (patenteCarro) => {
    console.log(patenteCarro);

    const { value: formValues } = await Swal.fire({
      title: "Ingresar odometro",
      html: '<input id="odometro" type="number" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("odometro").value];
      },
    });

    if (formValues) {
      if (patente !== "") {
        Swal.fire({
          title: `¿Seuro deseas asignar este carro "${patenteCarro}" al camion "${patente}"?`,
          icon: "info",
          showDenyButton: true,
          confirmButtonText: `Asignar`,
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.put("/api/camion/" + patente, {
              Patente_Carro: patenteCarro,
            })
              .then((response) => {
                if (response.status === 200) {
                  cargarCarrosLibres();
                  cargarCamiones();
                  setPatenteCarroAsociada(response.data.data.Patente_Carro);
                  let fecha = new Date();
                  let dia = fecha.getDate();
                  let mes = fecha.getMonth() + 1;
                  let anio = fecha.getFullYear();
                  let final = anio + "-" + mes + "-" + dia;

                  console.log(final, formValues);
                  Axios.put(
                    "/api/odometro/" +
                      patente +
                      "&" +
                      final,
                    {
                      ODOMETRO_CAMION: formValues[0],
                    }
                  )
                    .then((response) => {
                      if (response.status === 200) {
                        Swal.fire({
                          title: "Carro asignado",
                          text: "Carro asignado correctamente",
                          icon: "success",
                        });
                      }
                    })
                    .catch((error) => {
                      Swal.fire({
                        title: "Cuidado !",
                        text: "Ocurrio un error inesperado",
                        icon: "warning",
                      });
                    });

              
                 
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Cuidado !",
                  text: "Ocurrio un error inesperado",
                  icon: "warning",
                });
              });
          } else if (result.isDenied) {
          }
        });
      } else {
        Swal.fire("Error", "Debe seleccionar un camión", "warning");
      }
    } else {
      Swal.fire("Error", "Debe ingresar un odometro", "warning");
    }
  };

  return (
    <div>
      <Grid container>
        <Paper className={classes.paper}>
          <Typography variant="h6" noWrap>
            Camion
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid item xs={12} container direction="row" justify="center">
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="primerCamion">Camiones</InputLabel>
                <Select
                  labelId="primerCamion"
                  id="primerCamion"
                  value={patente}
                  onChange={handleChangePatente}
                  label="Camiones"
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
            </Grid>
            {selectCamion ? (
              <Grid item xs={12} container direction="row" justify="center">
                <TextField
                  className={classes.formControl}
                  id="carroAsociado"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  label="Carro Asociado"
                  value={patenteCarroAsociada}
                  variant="outlined"
                />
                <Button
                  onClick={() => desanclarCarro()}
                  className={classes.formControl}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Desanclar este carro
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Paper>

        <Grid item xs={12} container justify="center">
          <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Carros disponibles
            </Typography>
            <SortableList
              onSortEnd={onSortEnd}
              className="list"
              draggedItemClassName="dragged"
            >
              {items
                ? items.map((item, index) => (
                    <SortableItem key={item.PATENTE_CARRO}>
                      <Box borderColor="primary.main" {...defaultProps}>
                        <ListItem
                          onClick={() => handleClickCarro(item.PATENTE_CARRO)}
                          button
                        >
                          <CardContent>
                            <Typography variant="h5" component="h2">
                              {"Patente: " + item.PATENTE_CARRO}
                            </Typography>
                            <Typography
                              className={classes.title}
                              color="textSecondary"
                              gutterBottom
                            >
                              {"Tipo de carro: " + item.TIPO_DE_CARRO}
                            </Typography>

                            <br />
                          </CardContent>
                        </ListItem>
                      </Box>
                    </SortableItem>
                  ))
                : null}
            </SortableList>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
