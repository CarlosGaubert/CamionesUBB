import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    width: "100%",
    borderColor: "#430",
  },
  espaciado: {
    padding: theme.spacing(1),
  },
  fechas: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
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
  izqierda: {
    textAlign: "left",
  },
  titulo: {
    marginBottom: theme.spacing(3),
    textAlign: "left",
  },
}));
export default function CorrectivaIngreso() {
  const classes = useStyles();
  const [camion, setCamion] = React.useState("");
  const [tipoDocumento, setTipoDocumento] = React.useState("");
  const [tipoDocumentoRepues, setTipoDocumentoRepues] = React.useState("");
  const [origenRepuesto, setOrigenRepuesto] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChangeCamion = (event) => {
    setCamion(event.target.value);
  };
  const handleChangeTipoDoc = (event) => {
    setTipoDocumento(event.target.value);
  };
  const handleChangeTipoDocRepues = (event) => {
    setTipoDocumentoRepues(event.target.value);
  };
  const handleChangeOrigenRepues = (event) => {
    setOrigenRepuesto(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid item xs={12} container direction="row" justify="center">
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Orden de Trabajo
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid item xs={5}>
              <Grid item md={6} sm={12}>
                <FormControl
                  className={classes.formControl}
                  component="fieldset"
                >
                  <FormLabel className={classes.izqierda} component="legend">
                    Orden de Trabajo para
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="end"
                  >
                    <FormControlLabel
                      value="Camión"
                      control={<Radio color="secondary" />}
                      label="Camión"
                    />
                    <FormControlLabel
                      value="Carro"
                      control={<Radio color="secondary" />}
                      label="Carro"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControl
                  className={classes.formControl}
                  component="fieldset"
                >
                  <FormLabel className={classes.izqierda} component="legend">
                    Origen
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="end"
                  >
                    <FormControlLabel
                      value="Interna"
                      control={<Radio color="secondary" />}
                      label="Interna"
                    />
                    <FormControlLabel
                      value="Externa"
                      control={<Radio color="secondary" />}
                      label="Externa"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid item xs={12} container justify="center">
                <Grid className={classes.espaciado} item md={6} sm={12}>
                  <TextField
                    required
                    id="codigoOt"
                    fullWidth
                    label="Codigo Orden Trabajo"
                    variant="outlined"
                  />
                </Grid>
                <Grid className={classes.espaciado} item md={6} sm={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Patente Camión</InputLabel>
                    <Select
                      labelId="camion"
                      id="patenteCamion"
                      value={camion}
                      onChange={handleChangeCamion}
                      label="Patente Camión"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={10}>dx1234</MenuItem>
                      <MenuItem value={20}>dx2452</MenuItem>
                      <MenuItem value={30}>dx6234</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className={classes.espaciado} item md={6} sm={12}>
                  <FormControl
                    fullWidth
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="odometro"
                      endAdornment={
                        <InputAdornment position="end">Km</InputAdornment>
                      }
                      inputProps={{
                        "aria-label": "Odómetro",
                      }}
                      labelWidth={0}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                      Duración Estimada
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid className={classes.fechas} item md={6} sm={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="fecha"
                        label="Fecha"
                        format="dd/MM/yyyy"
                        fullWidth
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.espaciado}>
              <TextField
                id="descripcionOT"
                label="Descripcion Orden de trabajo"
                multiline
                rows={3}
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Mano de Obra
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="numeroOrden"
                fullWidth
                label="N° Orden Trabajo"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="horas"
                fullWidth
                label="Horas (HH)"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="valor"
                fullWidth
                label="Valor ($)"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Tipo Documento</InputLabel>
                <Select
                  labelId="camion"
                  id="patenteCamion"
                  value={tipoDocumento}
                  onChange={handleChangeTipoDoc}
                  label="Patente Camión"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.espaciado} item md={12} sm={12}>
              <TextField
                required
                id="numeroDocumento"
                fullWidth
                label="Numero Documento"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Observación"
                multiline
                rows={3}
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={10} className={classes.paper}>
          <Typography className={classes.titulo} variant="h6" noWrap>
            Repuestos
          </Typography>
          <Grid item xs={12} container direction="row" justify="center">
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="descripcion"
                fullWidth
                label="Descripción"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="codigoRepuestos"
                fullWidth
                label="Codigo Repuestos"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="valorRepuestos"
                fullWidth
                label="Valor ($)"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Origen</InputLabel>
                <Select
                  labelId="camion"
                  id="patenteCamion"
                  value={origenRepuesto}
                  onChange={handleChangeOrigenRepues}
                  label="Patente Camión"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Tipo Documento</InputLabel>
                <Select
                  labelId="camion"
                  id="patenteCamion"
                  value={tipoDocumentoRepues}
                  onChange={handleChangeTipoDocRepues}
                  label="Patente Camión"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>dx1234</MenuItem>
                  <MenuItem value={20}>dx2452</MenuItem>
                  <MenuItem value={30}>dx6234</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.espaciado} item md={6} sm={12}>
              <TextField
                required
                id="numeroDocumento"
                fullWidth
                label="Numero Documento"
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.espaciado} item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Observación"
                multiline
                rows={3}
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid container direction="row" className={classes.espaciado} item xs={12}>
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" fullWidth color="primary">
              Otro Repuesto {'>>'}
            </Button>
          </Grid>
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" disabled fullWidth color="primary">
              Eliminar
            </Button>
          </Grid>
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" disabled fullWidth color="primary">
              Grabar
            </Button>
          </Grid>
          <Grid className={classes.espaciado} item xs={3}>
            <Button variant="contained" fullWidth color="primary">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
