import React from 'react'
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


export default function PreventivaIngreso() {
    const classes = useStyles();
    const [camion, setCamion] = React.useState("");
    const handleChangeCamion = (event) => {
        setCamion(event.target.value);
    };
    return (
        <div className={classes.root}>
             <Grid item xs={12} container full direction="row" justify="center">
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Camión</InputLabel>
                <Select
                  labelId="camion"
                  id="camion"
                  value={camion}
                  onChange={handleChangeCamion}
                  label="Camión"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                id="programa"
                className={classes.espaciadoInput}
                fullWidth
                label="Programa"
                variant="outlined"
              />
            </Grid>
            <Paper elevation={10} className={classes.paper}>
          <Typography variant="h6" noWrap>
            Tabla de mantención normal
          </Typography>
          <Grid item xs={12} container full direction="row" justify="center">
            tabla
          </Grid>
          
          </Paper>
          <Grid  item xs={12} className={classes.paper} container direction="row" justify="center">
            <Grid item xs={4} container direction="row" justify="center">
              <Button disabled variant="contained" color="primary">
                  Grabar
              </Button>
              </Grid>
              <Grid item xs={4} container direction="row" justify="center">
              <Button disabled variant="contained" color="primary">
                  Cancelar
              </Button>
              </Grid>
            
          </Grid>
          </Grid>
        </div>
    )
}
