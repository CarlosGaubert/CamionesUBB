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

}));
export default function ConductoresListado() {
    const classes = useStyles();
    const [choferesItem, setChoferesItem] = React.useState([]);

    useEffect(() => {
        cargarChoferes();
    }, []);
    const cargarChoferes = async () => {
        const { data } = await Axios.get("/api/chofer/");
        setChoferesItem(data.data);
        return null;
    };

    const options = {
        filter: true,
        selectableRows: false,

        responsive: 'scroll',
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Losiento, no se encontraron choferes",
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
            name: 'RUT',
            field: 'RUT_EMPLEADO',
        },

        {
            name: 'Nombre',
            field: 'NOMBRE_EMPLEADO',
        },
        
        {
            name: 'Apellido paterno',
            field: 'APELLIDO_EMPLEADO',
        },
        {
            name: 'Apellido materno',
            field: 'APELLIDO_EMPLEADO2',
        },
        {
            name: 'Direccion',
            field: 'DIRECCION_EMPLEADO',
        },
        
       
        
        {
            name: 'Fecha de nacimiento',
            field: 'FECHA_NACIMIENTO',
        },
        
        {
            name: 'Fono',
            field: 'FONO_EMPLEADO',
        },
        
        {
            name: 'Control licencia',
            field: 'FECHA_CONTROL_LICENCIA',
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
                        
                        title={"Choferes"}
                        data={choferesItem}
                        columns={columns}
                        options={options}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
