import React, { useEffect } from 'react'
import MaterialDatatable from 'material-datatable'
import Axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: "center",
        width: "100%",
        marginBottom: theme.spacing(3),
        borderColor: "#430",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {


    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    prueba: {
        width: '100%'
    }
}));
export default function RegistrarEventoListado() {
    const classes = useStyles();
    const [eventoItem, setEventoItem] = React.useState([]);
    useEffect(() => {
        cargarEvento();
    }, []);

    const cargarEvento = async () => {
        const { data } = await Axios.get("http://localhost:4000/api/historiachofer/");
        setEventoItem(data.data);
        return null;
    };
    const options = {
        filter: true,
        selectableRows: false,

        responsive: 'scroll',
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Losiento, no se encontraron historiales de conductor",
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
            name: 'Codigo evento',
            field: 'CODIGO_EVENTO',
        },
        {
            name: 'Fecha evento',
            field: 'FECHA_EVENTO',
        },
        {
            name: 'Hora evento',
            field: 'HORA_EVENTO',
        },
        {
            name: 'Finalización evento',
            field: 'FINALIZACION_EVENTO',
        },
        {
            name: 'Patente camión',
            field: 'CAMION_EVENTO',
        },
        {
            name: 'Costo',
            field: 'COSTO_EVENTO',
        },
        {
            name: 'Paga',
            field: 'QUIEN_PAGA',
        },
        {
            name: 'Observación historial',
            field: 'OBSERVACION_HISTORIAL',
        },

    ];
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="center"
                >
                    <MaterialDatatable
                        classes={classes.prueba}
                        title={"Historial conductor"}
                        data={eventoItem}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
