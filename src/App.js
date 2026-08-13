import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { CustomThemeProvider } from "./ThemeContext";
import Drawer from "./views/DrawerNavigation/Drawer";
import Home from "./views/Home";
import CamionActualizacion from "./views/Secciones/Camion/CamionActualizacion";
import CamionAsignarCarro from "./views/Secciones/Camion/CamionAsignarCarro";
import CamionOdometroMensual from "./views/Secciones/Camion/CamionOdometroMensual";
import CamionSeguro from "./views/Secciones/Camion/CamionSeguro";
import CamionListadoGeneral from "./views/Secciones/Camion/CamionListadoGeneral";
import CamionListadoUnCamion from "./views/Secciones/Camion/CamionListadoUnCamion";
import CamionListadoCamionCarro from "./views/Secciones/Camion/CamionListadoCamionCarro";
import CarroActualizacion from "./views/Secciones/Carro/CarroActualizacion";
import CarroListados from "./views/Secciones/Carro/CarroListados";
import ClientesActualizacion from "./views/Secciones/Clientes/ClientesActualizacion";
import ClientesListado from "./views/Secciones/Clientes/ClientesListado";
import CombustibleActualizacion from "./views/Secciones/Combustible/CombustibleActualizacion";
import CombustibleConsulta from "./views/Secciones/Combustible/CombustibleConsulta";
import IFActualizacion from "./views/Secciones/InstitucionFinanciera/IFActualizacion";
import IFListado from "./views/Secciones/InstitucionFinanciera/IFListado";
import APMPIngreso from "./views/Secciones/Mantenciones/ActualizacionProgramaMPreventiva/APMPIngreso";
import APMPModificacion from "./views/Secciones/Mantenciones/ActualizacionProgramaMPreventiva/APMPModificacion";
import APMPEliminar from "./views/Secciones/Mantenciones/ActualizacionProgramaMPreventiva/APMPEliminar";
import APMPListadoProgramas from "./views/Secciones/Mantenciones/ActualizacionProgramaMPreventiva/APMPListadoProgramas";
import PreventivaIngreso from "./views/Secciones/Mantenciones/Realizar Mantencion/Preventiva/PreventivaIngreso";
import PreventivaModificar from "./views/Secciones/Mantenciones/Realizar Mantencion/Preventiva/PreventivaModificar";
import PreventivaEliminar from "./views/Secciones/Mantenciones/Realizar Mantencion/Preventiva/PreventivaEliminar";
import CorrectivaIngreso from "./views/Secciones/Mantenciones/Realizar Mantencion/Correctiva/CorrectivaIngreso";
import CorrectivaModificar from "./views/Secciones/Mantenciones/Realizar Mantencion/Correctiva/CorrectivaModificar";
import CorrectivaEliminar from "./views/Secciones/Mantenciones/Realizar Mantencion/Correctiva/CorrectivaEliminar";
import GenerarOrdenTrabajo from "./views/Secciones/Mantenciones/Realizar Mantencion/GenerarOrdenTrabajo";
import ListadoPreventivasProgramadas from "./views/Secciones/Mantenciones/Listados/Preventivas/ListadoPreventivasProgramadas";
import ListadoPreventivasEfectuadas from "./views/Secciones/Mantenciones/Listados/Preventivas/ListadoPreventivasEfectuadas";
import ListadoCorrectivasGeneral from "./views/Secciones/Mantenciones/Listados/Correctivas/ListadoCorrectivasGeneral";
import ListadoCorrectivaUnaMantencion from "./views/Secciones/Mantenciones/Listados/Correctivas/ListadoCorrectivaUnaMantencion";
import ObrasActualizacion from "./views/Secciones/Obras/ObrasActualizacion";
import ObrasListado from "./views/Secciones/Obras/ObrasListado";
import ConductoresActualizacion from "./views/Secciones/Personal/Conductores/ConductoresActualizacion";
import ADCActualizacion from "./views/Secciones/Personal/Conductores/ADC/ADCActualizacion";
import ADCListado from "./views/Secciones/Personal/Conductores/ADC/ADCListado";
import ConductoresSueldos from "./views/Secciones/Personal/Conductores/ConductoresSueldos";
import TipoEventoActualizacion from "./views/Secciones/Personal/Conductores/Evento/Tipo Evento/TipoEventoActualizacion";
import TipoEventoListado from "./views/Secciones/Personal/Conductores/Evento/Tipo Evento/TipoEventoListado";
import RegistrarEventoActualizacion from "./views/Secciones/Personal/Conductores/Evento/Registrar Evento/RegistrarEventoActualizacion";
import RegistrarEventoListado from "./views/Secciones/Personal/Conductores/Evento/Registrar Evento/RegistrarEventoListado";
import ConductoresListado from "./views/Secciones/Personal/Conductores/ConductoresListado";
import OtrosEmpleadosActualizacion from "./views/Secciones/Personal/Otros Empleados/OtrosEmpleadosActualizacion";
import OtrosEmpleadosCostosIndirectos from "./views/Secciones/Personal/Otros Empleados/OtrosEmpleadosCostosIndirectos";
import OtrosEmpleadosListado from "./views/Secciones/Personal/Otros Empleados/OtrosEmpleadosListado";
import ActualizacionIngreso from "./views/Secciones/Programa de Viaje/Actualizacion/ActualizacionIngreso";
import ActualizacionModificacionEliminacion from "./views/Secciones/Programa de Viaje/Actualizacion/ActualizacionModificacionEliminacion";
import ListadoGeneral from "./views/Secciones/Programa de Viaje/Listados/ListadoGeneral";
import ListadoUnCamion from "./views/Secciones/Programa de Viaje/Listados/ListadoUnCamion";
import ProductividadCombustibleCostoUtilidad from "./views/Secciones/Resultados/ProductividadCombustibleCostoUtilidad";
import ResultadoCamionXMes from "./views/Secciones/Resultados/ResultadoCamionXMes";
import ResultadoCostos from "./views/Secciones/Resultados/ResultadoCostos";
import ResultadoProductividadTotal from "./views/Secciones/Resultados/ResultadoProductividadTotal";
import RutasActualizacion from "./views/Secciones/Rutas/RutasActualizacion";
import RutasListado from "./views/Secciones/Rutas/RutasListado";
import TarifaOtrosClientes from "./views/Secciones/Tarifa/TarifaOtrosClientes";
import TCCActualizacion from "./views/Secciones/Tarjeta Carga Combustible/TCCActualizacion";
import TCCListados from "./views/Secciones/Tarjeta Carga Combustible/TCCListados";
import EfectuarViaje from "./views/Secciones/Viajes/EfectuarViaje";
import ModViajeEfectuado from "./views/Secciones/Viajes/Modificar Viaje/ModViajeEfectuado";
import ModViajeNoEfectuado from './views/Secciones/Viajes/Modificar Viaje/ModViajeNoEfectuado'
import ListadoViajeEfectuado from './views/Secciones/Viajes/Listados/ListadoViajeEfectuado'
import ListadoViajeNoEfectuado from './views/Secciones/Viajes/Listados/ListadoViajeNoEfectuado'
import ListadoGastos from './views/Secciones/Viajes/Listados/ListadoGastos'
function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Drawer seccion={<Home />} />
          </Route>
          <Route path="/camion/actualizacion">
            <Drawer seccion={<CamionActualizacion />} titulo="Camiones" />
          </Route>
          <Route path="/camion/asignarcarro">
            <Drawer seccion={<CamionAsignarCarro />} titulo="Camión - Carro" />
          </Route>
          <Route path="/camion/odometromensual">
            <Drawer
              seccion={<CamionOdometroMensual />}
              titulo="Odómetro mensual"
            />
          </Route>
          <Route path="/camion/camionseguro">
            <Drawer seccion={<CamionSeguro />} titulo="Seguro" />
          </Route>
          <Route path="/camion/camionlistadogeneral">
            <Drawer
              seccion={<CamionListadoGeneral />}
              titulo="Listado General"
            />
          </Route>
          <Route path="/camion/camionlistadouncamion">
            <Drawer
              seccion={<CamionListadoUnCamion />}
              titulo="Listado Camion"
            />
          </Route>
          <Route path="/camion/camionlistadocamioncarro">
            <Drawer
              seccion={<CamionListadoCamionCarro />}
              titulo="Listado Camion-Carro"
            />
          </Route>
          <Route path="/carro/carroactualizacion">
            <Drawer seccion={<CarroActualizacion />} titulo="Carros" />
          </Route>
          <Route path="/carro/carrolistado">
            <Drawer seccion={<CarroListados />} titulo="Listado Carros" />
          </Route>
          <Route path="/clientes/clientesactualizacion">
            <Drawer seccion={<ClientesActualizacion />} titulo="Clientes" />
          </Route>
          <Route path="/clientes/clienteslistado">
            <Drawer seccion={<ClientesListado />} titulo="Listado Clientes" />
          </Route>
          <Route path="/combustible/combustibleactualizacion">
            <Drawer
              seccion={<CombustibleActualizacion />}
              titulo="Boletas de combustible"
            />
          </Route>
          <Route path="/combustible/combustibleconsulta">
            <Drawer seccion={<CombustibleConsulta />} titulo="Combustible" />
          </Route>
          <Route path="/institucionfinanciera/ifactualizacion">
            <Drawer
              seccion={<IFActualizacion />}
              titulo="Instituciones Financieras"
            />
          </Route>
          <Route path="/institucionfinanciera/iflistado">
            <Drawer
              seccion={<IFListado />}
              titulo="Instituciones Financieras"
            />
          </Route>
          <Route path="/mantenciones/apmp/ingreso">
            <Drawer
              seccion={<APMPIngreso />}
              titulo="Programa de mantención preventiva"
            />
          </Route>
          <Route path="/mantenciones/apmp/modificacion">
            <Drawer
              seccion={<APMPModificacion />}
              titulo="Programa de mantención preventiva"
            />
          </Route>
          <Route path="/mantenciones/apmp/eliminar">
            <Drawer
              seccion={<APMPEliminar />}
              titulo="Elimina Programa mantención preventiva"
            />
          </Route>
          <Route path="/mantenciones/apmp/listado">
            <Drawer
              seccion={<APMPListadoProgramas />}
              titulo="Listado Programa mantención preventiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/preventiva/ingreso">
            <Drawer
              seccion={<PreventivaIngreso />}
              titulo="Realiza Mantencion Preventiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/preventiva/modifica">
            <Drawer
              seccion={<PreventivaModificar />}
              titulo="Modifica Mantencion Preventiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/preventiva/eliminar">
            <Drawer
              seccion={<PreventivaEliminar />}
              titulo="Elimina Mantencion Preventiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/correctiva/ingreso">
            <Drawer
              seccion={<CorrectivaIngreso />}
              titulo="Ingreso Mantencion Correctiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/correctiva/modifica">
            <Drawer
              seccion={<CorrectivaModificar />}
              titulo="Modifica Mantencion Correctiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/correctiva/eliminar">
            <Drawer
              seccion={<CorrectivaEliminar />}
              titulo="Eliminar Mantencion Correctiva"
            />
          </Route>
          <Route path="/mantenciones/realizarm/generarordentrabajo">
            <Drawer
              seccion={<GenerarOrdenTrabajo />}
              titulo="Orden de Trabajo"
            />
          </Route>
          <Route path="/mantenciones/listados/preventivas/programadas">
            <Drawer
              seccion={<ListadoPreventivasProgramadas />}
              titulo="Mantenciones Preventivas Programadas"
            />
          </Route>
          <Route path="/mantenciones/listados/preventivas/efectuadas">
            <Drawer
              seccion={<ListadoPreventivasEfectuadas />}
              titulo="Mantenciones Preventivas Efectuadas"
            />
          </Route>
          <Route path="/mantenciones/listados/correctivas/general">
            <Drawer
              seccion={<ListadoCorrectivasGeneral />}
              titulo="Mantenciones Correctivas Generales"
            />
          </Route>
          <Route path="/mantenciones/listados/correctivas/unamantencion">
            <Drawer
              seccion={<ListadoCorrectivaUnaMantencion />}
              titulo="Mantenciones Correctivas"
            />
          </Route>
          <Route path="/obras/actualizacion">
            <Drawer seccion={<ObrasActualizacion />} titulo="Obra" />
          </Route>
          <Route path="/obras/listado">
            <Drawer seccion={<ObrasListado />} titulo="Listado de Obras" />
          </Route>
          <Route path="/personal/conductores/actualizacion">
            <Drawer
              seccion={<ConductoresActualizacion />}
              titulo="Conductores"
            />
          </Route>
          <Route path="/personal/conductores/adc/actualizacion">
            <Drawer
              seccion={<ADCActualizacion />}
              titulo="Camión - Conductor"
            />
          </Route>
          <Route path="/personal/conductores/adc/listado">
            <Drawer seccion={<ADCListado />} titulo="Camión - Conductor" />
          </Route>
          <Route path="/personal/conductores/sueldos">
            <Drawer
              seccion={<ConductoresSueldos />}
              titulo="Sueldo Conductor"
            />
          </Route>
          <Route path="/personal/conductores/evento/tipoevento/actualizacion">
            <Drawer
              seccion={<TipoEventoActualizacion />}
              titulo="Tipo de Eventos Chofer"
            />
          </Route>
          <Route path="/personal/conductores/evento/tipoevento/listado">
            <Drawer
              seccion={<TipoEventoListado />}
              titulo="Listado Tipo de Eventos"
            />
          </Route>
          <Route path="/personal/conductores/evento/registrarevento/actualizacion">
            <Drawer
              seccion={<RegistrarEventoActualizacion />}
              titulo="Evento Conductor"
            />
          </Route>
          <Route path="/personal/conductores/evento/registrarevento/listado">
            <Drawer
              seccion={<RegistrarEventoListado />}
              titulo="Listado Eventos Conductor"
            />
          </Route>
          <Route path="/personal/conductores/listado">
            <Drawer
              seccion={<ConductoresListado />}
              titulo="Listado Conductores"
            />
          </Route>
          <Route path="/personal/otrosempleados/actualizacion">
            <Drawer
              seccion={<OtrosEmpleadosActualizacion />}
              titulo="Empleados"
            />
          </Route>
          <Route path="/personal/otrosempleados/costosindirectos">
            <Drawer
              seccion={<OtrosEmpleadosCostosIndirectos />}
              titulo="Costos Indirectos"
            />
          </Route>
          <Route path="/personal/otrosempleados/listado">
            <Drawer
              seccion={<OtrosEmpleadosListado />}
              titulo="Listado Otros Empleados"
            />
          </Route>
          <Route path="/programadeviaje/actualizacion/ingreso">
            <Drawer
              seccion={<ActualizacionIngreso />}
              titulo="Programa de Viaje"
            />
          </Route>
          <Route path="/programadeviaje/actualizacion/modificareliminar">
            <Drawer
              seccion={<ActualizacionModificacionEliminacion />}
              titulo="Modifica Datos del Programa de Viaje"
            />
          </Route>
          <Route path="/programadeviaje/listado/general">
            <Drawer
              seccion={<ListadoGeneral />}
              titulo="Consulta General Programa de Viaje"
            />
          </Route>
          <Route path="/programadeviaje/listado/uncamion">
            <Drawer
              seccion={<ListadoUnCamion />}
              titulo="Consulta Programa de Viaje a Un Camión"
            />
          </Route>
          <Route path="/resultado/productividadcostoutilidad">
            <Drawer
              seccion={<ProductividadCombustibleCostoUtilidad />}
              titulo="Productividad / Costo Utilidad"
            />
          </Route>
          <Route path="/resultado/resultadocamionxmes">
            <Drawer
              seccion={<ResultadoCamionXMes />}
              titulo="Resultado Camión por mes"
            />
          </Route>
          <Route path="/resultado/resultadocosto">
            <Drawer seccion={<ResultadoCostos />} titulo="Costos" />
          </Route>
          <Route path="/resultado/productividadtotal">
            <Drawer
              seccion={<ResultadoProductividadTotal />}
              titulo="Productividad Total"
            />
          </Route>
          <Route path="/rutas/actualizacion">
            <Drawer
              seccion={<RutasActualizacion />}
              titulo="Ingreso de Nuevas Rutas"
            />
          </Route>
          <Route path="/rutas/listado">
            <Drawer seccion={<RutasListado />} titulo="Listado de Rutas" />
          </Route>
          <Route path="/tarifa/otrosclientes">
            <Drawer
              seccion={<TarifaOtrosClientes />}
              titulo="Actualización Tarifa Cliente"
            />
          </Route>
          <Route path="/tarjetacombustiblecarga/actualizacion">
            <Drawer
              seccion={<TCCActualizacion />}
              titulo="Tarjeta Carga Combustible"
            />
          </Route>
          <Route path="/tarjetacombustiblecarga/listado">
            <Drawer
              seccion={<TCCListados />}
              titulo="Listado Tarjeta Carga Combustible"
            />
          </Route>
          <Route path="/viajes/efectuarviaje">
            <Drawer seccion={<EfectuarViaje />} titulo="Viajes Efectuados" />
          </Route>
          <Route path="/viajes/modificarviaje/viajeefectuado">
            <Drawer
              seccion={<ModViajeEfectuado />}
              titulo="Modificación Viajes Efectuados"
            />
          </Route>
          <Route path="/viajes/modificarviaje/viajenoefectuado">
            <Drawer
              seccion={<ModViajeNoEfectuado />}
              titulo="Modificación Viajes No Efectuados"
            />
          </Route>
          <Route path="/viajes/listados/viajeefectuado">
            <Drawer
              seccion={<ListadoViajeEfectuado />}
              titulo="Viajes Efectuados"
            />
          </Route>
          <Route path="/viajes/listados/viajenoefectuado">
            <Drawer
              seccion={<ListadoViajeNoEfectuado />}
              titulo="Viajes No Efectuados"
            />
          </Route>
          <Route path="/viajes/listados/gastos">
            <Drawer
              seccion={<ListadoGastos />}
              titulo="Gastos"
            />
          </Route>
        </Switch>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
