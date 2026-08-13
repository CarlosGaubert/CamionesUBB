import React, { useEffect } from 'react'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import MaterialDatatable from 'material-datatable'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        textAlign: "center",

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
}));


export default function CamionListadoUnCamion() {
    const [camionesItem, setCamionesItem] = React.useState([]);
    const [patente, setPatente] = React.useState("");
    const [camionSelect, setCamionSelect] = React.useState([])

    const classes = useStyles();

    const handleChangePatente = (event) => {
        setPatente(event.target.value);

        try {
            if(event.target.value !== ""){
                const datosCamion = camionesItem.find(
                    (camion) => camion.PATENTE_CAMION === event.target.value
                );
                setCamionSelect([datosCamion])
            }
            
        } catch (error) {

        }

    }

    const options = {
        filter: true,
        selectableRows: false,

        responsive: 'scroll',
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Debes seleccionar un camión",
                toolTip: "Sort",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Columnas por pagina:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver columnas",
                filterTable: "Filtrar tabla",
            },
            filter: {
                all: "Todos",
                title: "Filtros",
                reset: "Reiniciar",
            },
            viewColumns: {
                title: "Mostrar columnas",
                titleAria: "Mostrar/Ocultar Columnas",
            },

        }

    };

    const columns = [

        {
            name: 'Patente',
            field: 'PATENTE_CAMION',
        },

        {
            name: 'Sigla',
            field: 'CODIGO_MANTENCION'
        }, {
            name: 'Marca',
            field: 'MARCA_CAMION'
        }, {
            name: 'Color',
            field: 'COLOR_CAMION',
        }, {
            name: 'Modelo',
            field: 'MODELO_CAMION',
        },
        {
            name: 'Kilometraje',
            field: 'KILOMETRAJE_COMPRA_CAMION',
        },
        {
            name: 'Fecha de compra',
            field: 'FECHA_COMPRA_CAMION',
        }
    ];

    useEffect(() => {
        cargarCamiones();
    }, []);
    const cargarCamiones = async () => {
        const { data } = await Axios.get("/api/camion/");
        setCamionesItem(data.data);
        return null;
    };
    return (
        <div>
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
            <Grid container>
                <Grid
                    item
                    xs={12}
                    container
                    className={classes.espaciado}
                    direction="row"
                    justify="center"
                >
                    <MaterialDatatable
                        title={"Camión"}
                        data={camionSelect}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
