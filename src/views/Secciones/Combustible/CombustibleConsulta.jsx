import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
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
  button:{
    marginTop: theme.spacing(3),
  }
}));

export default function CombustibleConsulta() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h6" noWrap>
          Consultar por
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="camion"
          >
            <FormControlLabel
              value="camion"
              control={<Radio color="primary" />}
              label="Camión"
            />
            <FormControlLabel
              value="tarjetaCombustible"
              control={<Radio color="primary" />}
              label="Tarjeta combustible"
            />
            <FormControlLabel
              value="proovedor"
              control={<Radio color="primary" />}
              label="Proovedor"
            />
            <FormControlLabel
              value="guia"
              control={<Radio color="primary" />}
              label="Guia"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h6" noWrap>
          Alcance
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="uno"
          >
            <FormControlLabel
              value="uno"
              control={<Radio color="primary" />}
              label="Uno"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="primary" />}
              label="Todos"
            />
           
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h6" noWrap>
          En
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="todasLasFechas"
          >
            <FormControlLabel
              value="todasLasFechas"
              control={<Radio color="primary" />}
              label="Todas las fechas"
            />
            <FormControlLabel
              value="rangoDeFechas"
              control={<Radio color="primary" />}
              label="Rango de fechas"
            />
         
          </RadioGroup>
        </FormControl>
      </Paper>
      <Button className={classes.button} variant="contained" color="secondary">
        Listar consulta
      </Button>
    </div>
  );
}
