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
 
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function TCCListados() {
    const classes = useStyles();
    const [tarjetaItem, setTarjetaItem] = React.useState([]);

    useEffect(() => {
        cargarTarjetas();
    }, []);
    const cargarTarjetas = async () => {
        const { data } = await Axios.get(
            "/api/tarjetacredito/"
        );
        setTarjetaItem(data.data);
        return null;
    };

    const options = {
        filter: true,
        selectableRows: false,

        responsive: 'scroll',
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Losiento, no se encontraron tarjetas",
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
            name: 'Codigo',
            field: 'CODIGO_TARJETA',
        },

        {
            name: 'Tope',
            field: 'TOPE_TARJETA',
        },
        {
            name: 'RUT',
            field: 'RUT_EMPLEADO',
        },
        {
            name: 'Estado',
            field: 'ESTADO_TARJETA',
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
                        
                        title={"Tarjetas carga combustible"}
                        data={tarjetaItem}
                        columns={columns}
                        options={options}
                    />



                </Grid>
            </Grid>
        </div>
    )
}
