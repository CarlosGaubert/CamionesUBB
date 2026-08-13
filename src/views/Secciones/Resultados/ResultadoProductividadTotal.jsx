import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Bar } from 'react-chartjs-2'
import Axios from 'axios'
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
export default function ResultadoProductividadTotal() {
  const classes = useStyles();
  const [inicioMes, setInicioMes] = React.useState("");
  const [inicioAnio, setInicioAnio] = React.useState("");
  const [InicioAnios, setInicioAnios] = React.useState([]);
  const [isBar, setIsBar] = React.useState(false)
  const [chartData, setChartData] = useState({});
  
  const handleChangeInicioAnio = (event) => {
    setInicioAnio(event.target.value);
  };
  const handleChangeInicioMes = (event) => {
    setInicioMes(event.target.value);
  };

  useEffect(() => {
    llamar();
    function llamar() {
      const year = new Date().getFullYear();
      const arreglo = [];
      for (let index = year; index >= 2021; index--) {
        arreglo.push(index);
      }
      setInicioAnios(arreglo);
    }
  }, []);

  const cargarGrafico = () => {
    if (inicioAnio === "") {
      Swal.fire({
        title: "Error",
        text: "Falta seleccionar año",
        icon: "warning",
      });
    } else {
      if (inicioMes === "") {
        Swal.fire({
          title: "Error",
          text: "Falta seleccionar mes",
          icon: "warning",
        });
      } else {
        
        cargarProductividadTotal(inicioMes, inicioAnio)
      }
    }


  }


  const cargarProductividadTotal = async (mes, anio) => {
 

    //console.log(datosProductividad)
    let totalProduccion = [];
   
    Axios
      .get("/api/viajeefectuado/" + anio + "&" + mes)
      .then(res => {
       
        for (const dataObj of res.data.data) {
          totalProduccion.push(dataObj['Total precio unitario camión']);
          totalProduccion.push(dataObj['Total precio unitario carro']);
          totalProduccion.push(dataObj['Total odometro salida']);
          totalProduccion.push(dataObj['Total odometro llegada']);
          totalProduccion.push(dataObj['Total otros costos']);
          totalProduccion.push(dataObj['Total kilometraje ripio']);
          totalProduccion.push(dataObj['Total kilometraje pavimento']);
          totalProduccion.push(dataObj['Total cantidad carga camión']);
          totalProduccion.push(dataObj['Total cantidad carga carro']);
        }
        setChartData({
          labels: ['Total precio unitario camión', 'Total precio unitario carro', 'Total odometro salida', 'Total odometro llegada', 'Total otros costos', 'Total kilometraje ripio', "Total kilometraje pavimento", 'Total cantidad carga camión', 'Total cantidad carga carro'],
          datasets: [
            {
              label: 'Total productividad',
              data: totalProduccion,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        });
        setIsBar(true)
 
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <div className={classes.root}>
      <Grid container justify="center">
        {isBar ?
          <Bar
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Total productividad", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 4,
                      beginAtZero: true
                    },
                    gridLines: {
                      display: false
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false
                    }
                  }
                ]
              }
            }}
          />

          : null}

        <Paper elevation={3} fullWidth className={classes.paper}>
          <Grid className={classes.espaciado} container justify="center">

            <Grid
              item
              xs={12}
              md={12}
              className={classes.espaciado}
              container
              direction="row"
              justify="center"
            >
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.titulo}
                    variant="h6"
                    component="h2"
                  >
                    Inicio Rango
                  </Typography>

                  <Grid container justify="center">
                    <Grid
                      item
                      xs={12}
                      md={12}
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
                        <InputLabel>Mes</InputLabel>
                        <Select
                          labelId="Inicio Mes"
                          id="inicioMes"
                          value={inicioMes}
                          onChange={handleChangeInicioMes}
                          label="Mes"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          <MenuItem value={1}>Enero</MenuItem>
                          <MenuItem value={2}>Febrero</MenuItem>
                          <MenuItem value={3}>Marzo</MenuItem>
                          <MenuItem value={4}>Abril</MenuItem>
                          <MenuItem value={5}>Mayo</MenuItem>
                          <MenuItem value={6}>Junio</MenuItem>
                          <MenuItem value={7}>Julio</MenuItem>
                          <MenuItem value={8}>Agosto</MenuItem>
                          <MenuItem value={9}>Septiembre</MenuItem>
                          <MenuItem value={10}>Octubre</MenuItem>
                          <MenuItem value={11}>Noviembre</MenuItem>
                          <MenuItem value={12}>Diciembre</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
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
                        <InputLabel>Año</InputLabel>
                        <Select
                          labelId="Inicio Año"
                          id="inicioAnio"
                          value={inicioAnio}
                          onChange={handleChangeInicioAnio}
                          label="Año"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {InicioAnios ? (
                            InicioAnios.map((item) => (
                              <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No existen elementos</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>


          </Grid>
        </Paper>
        <Grid
          item
          xs={12}
          className={classes.espaciado}
          container
          direction="row"
          justify="center"
        >
          <Button fullWidth onClick={() => cargarGrafico()} variant="contained" color="primary">
            Ver Grafico
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
