<template>
  <div class="home p-3">
    <p>Home</p>
    <div class="header p-2">
      <div class="cajaimg">
        <h5 class="vitrina">Vitrina</h5>
      </div>
      <h3>Bienvenido</h3>
      <p>Bienvenido al Sistema de Ordenes e Inventario de Classic Models</p>
    </div>
    <div class="twoBoxPorcentaje mt-3">
      <div class="boxLeftPorcentaje" v-for="(kpi,i) in kpis" :key="i">
        <div class="porcentaje">
          <el-progress v-if="kpi.entregadas" type="circle" color="#26823a" :percentage="porcentajeLeft(kpi.entregadas,kpi.pendientes)"></el-progress>
           <el-progress v-else type="circle" color="#26823a" :percentage="porcentajeRight(kpi.totales, kpi.atrasadas)"></el-progress>
            <!--h1 v-if="kpi.entregadas">{{porcentajeLeft(kpi.entregadas,kpi.pendientes)}}</h1-->
            <!--h1 v-else>{{porcentajeRight(kpi.totales, kpi.atrasadas)}}</h1-->
        </div>
        <div class="contenido">
          <div class="cumplimiento_diario">
             <h5><b>{{kpi.nombre}}</b></h5>
          </div>
          <div class="numeros_ordenes">
            <div class="ordenes_entregadas">
              <h2><b>{{kpi.entregadas ? kpi.entregadas : kpi.totales}}</b></h2>
              <p>{{kpi.entregadas ? "Ordenes Entregadas" : "Ordenes Totales"}}</p>
            </div>
            <div class="ordenes_pendientes">
             <h2><b>{{kpi.pendientes ? kpi.pendientes : kpi.atrasadas}}</b></h2>
             <p>{{kpi.pendientes ? "Ordenes Pendientes" : "Ordenes Atrasadas"}}</p>
            </div>

          </div>

        </div>
        
      </div>
      <!--div class="boxRightPorcentaje">
          <div class="porcentaje">
            <p>porcentaje</p>
        </div>
        <div class="contenido">
          <div class="cumplimiento_diario">
             <h5>cumplimiento diario</h5>
          </div>
          <div class="numeros_ordenes">
            <div class="ordenes_entregadas">
              <p>ordenes entregadas</p>
            </div>
            <div class="ordenes_pendientes">
             <p>ordenes pendientes</p>
            </div>

          </div>

        </div>
      </div !-->
    </div>
    <div class="boxOrdenes mt-3">
      <div class="boxLeftOrdenes">
        <h3 class="my-5"><b> Ultimas Ordenes</b></h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">N Orden</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha Entrega</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ordenes,i) in ultimasOrdenes" :key="i">
              <th scope="row">{{ordenes.num_orden}}</th>
              <td>{{ordenes.cliente}}</td>
              <td>{{ordenes.fecha_entrega}}</td>
              <td>{{ordenes.estado}}</td>
              <td><el-button type="primary">Ver Detalles</el-button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="boxRightOrdenes">
        <h3 class="my-5"><b> Ultimas Devoluciones </b></h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">N Orden</th>
              <th scope="col">Cliente</th>
              <th scope="col">Fecha Devolucion</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(devoluciones, i) in ultimasDevoluciones" :key="i">
              <th scope="row">{{ devoluciones.num_orden }}</th>
              <td>{{ devoluciones.cliente }}</td>
              <td>{{ devoluciones.fecha_entrega }}</td>

             <td><el-button type="primary">Ver Detalles</el-button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapState(["ultimasDevoluciones","ultimasOrdenes","kpis"]),
  },
  methods: {
    ...mapActions(["setDashboardUD","setDashboardUO","setDashboardKpis"]),

    porcentajeLeft(Nmayor, Nmenor){
      let Total = parseInt(Nmenor) + parseInt(Nmayor);
     let multi= parseInt(Nmayor)* 100
     return multi / Total 
    },
    porcentajeRight(Nmayor, Nmenor){
      let Total = parseInt(Nmenor) + parseInt(Nmayor);
     let multi= parseInt(Nmenor)* 100
     return Math.round( multi / Total)
    }
  },
  created() {
    this.setDashboardUD();
    this.setDashboardUO();
    this.setDashboardKpis()
    
  },
  
};
</script>
<style lang="scss">
.cajaimg {
  width: 100%;
  height: 250px;
  background-color: #d8d5d5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header {
  height: 350px;
  border: solid 1px #DCDFE6;
  border-radius: 5px;
}
.twoBoxPorcentaje {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.boxLeftPorcentaje {
  border: 1px solid #DCDFE6;
  width: 49%;
  height: 200px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
}
.porcentaje{
  width: 30%;
  height: 100%;
  display: flex;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
}
.contenido{
  width: 70%;
  display: flex;
  flex-direction: column;
}
.cumplimiento_diario{
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
}
.numeros_ordenes{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70%;
}
.ordenes_entregadas{
  width: 50%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.ordenes_pendientes{
  width: 50%;
  padding: 5px;
  display: flex;
  flex-direction: column;
 justify-content: center;
 align-items: center;
}

.boxRightPorcentaje {
  border: 1px solid gray;
  height: 200px;
  width: 49%;
   display: flex;
  flex-direction: row;
}
.boxLeftOrdenes {
  width: 49%;
}
.boxOrdenes {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.boxRightOrdenes {
  width: 49%;
}
.vitrina{
  color: gray;
}
</style>
