<template>
  <div class="ordenes px-5">
    <div class="detallesOrdenes" v-show="openDetalleOrden">
      <p class="mt-3">Home >> Monitor de Ordenes >> Detalle Orden</p>
      <h4 class="mt-2">
        <b>Orden #{{ detalleOrden.orden.num_orden }}</b>
      </h4>
      <DetalleOrdenes></DetalleOrdenes>
    </div>
    <div class="principal" v-show="openDetalleOrden == false">
      <p class="mt-3">Home >> Monitor de ordenes</p>
      <h4 class="mt-2"><b>Monitor de Ordenes</b></h4>

      <div class="tablaSelectores my-5 p-3">
        <div class="oficinas">
          <label for="">Oficina</label><br />
          <el-select v-model="valueOrden" placeholder="Seleccione...">
            <el-option
              v-for="item in oficinas"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>

        <div class="estados">
          <label for="">Estados</label><br />
          <el-select v-model="valueEstado" placeholder="Seleccione...">
            <el-option
              v-for="item in estados"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </div>

        <div class="calendar">
          <label for="">Fecha de Entrega</label><br />
          <el-date-picker
            v-model="valueCalendar"
            type="daterange"
            range-separator=""
            start-placeholder="Fecha inicio"
            end-placeholder="Fecha fin"
          >
          </el-date-picker>
        </div>
        <div class="botonTabla">
          <el-button type="primary">Buscar</el-button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°Orden</th>
            <th scope="col">Cliente</th>
            <th scope="col">Monto Orden</th>
            <th scope="col">Cant Productos</th>
            <th scope="col">Fecha Entrega</th>
            <th scope="col">Avance Preparacion</th>
            <th scope="col">Estado</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orden, i) in ordenes" :key="i">
            <th scope="row">{{ orden.num_orden }}</th>
            <td>{{ orden.cliente }}</td>
            <td>{{ orden.monto }}</td>
            <td>{{ orden.cant_productos }}</td>
            <td>{{ fechaformat(orden.fecha_entrega) }}</td>
            <td>
              <el-progress
                :percentage="orden.avance_preparacion * 100"
              ></el-progress>
            </td>
            <td>{{ orden.estado }}</td>
            <td>
              <b-icon
                class="icono"
                :icon="icono(orden.avance_preparacion)"
                :style="{
                  color:
                    icono(orden.avance_preparacion) == 'check-circle-fill'
                      ? 'green'
                      : '#2F4AD3',
                }"
              ></b-icon>
            </td>
            <td>
              <el-button type="primary" @click="cambiarEstado()"
                >Ver Detalles</el-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import DetalleOrdenes from "@/components/DetalleOrdenes.vue";
export default {
  name: "Ordenes",
  components: {
    DetalleOrdenes,
  },
  data() {
    return {
      valueCalendar: "",
      valueEstado: "",
      valueOrden: "",
    };
  },
  computed: {
    ...mapState([
      "oficinas",
      "estados",
      "ordenes",
      "openDetalleOrden",
      "detalleOrden",
    ]),
  },
  methods: {
    ...mapActions([
      "setOficinas",
      "setEstados",
      "setOrdenes",
      "setDetalleOrden",
      "setOpenDetalleOrden_false",
      "setOpenDetalleOrden_true",
    ]),

    icono(preparacion) {
      let verificar = preparacion == 1 ? "check-circle-fill" : "clock-fill";
      return verificar;
    },

    cambiarEstado() {
      this.setOpenDetalleOrden_true();
    },

    fechaformat(fechaEntrega) {
      fechaEntrega = fechaEntrega.slice(0, 10);
      return fechaEntrega;
    },
  },
  created() {
    this.setOficinas();
    this.setEstados();
    this.setOrdenes();
    this.setDetalleOrden();
  },
};
</script>

<style lang="scss">
.tablaSelectores {
  width: 100%;
  height: 110px;
  border: solid 2px #dcdfe6;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
}
label {
  color: #939599;
}
.el-input__suffix {
}
.el-select .el-input .el-select__caret {
  font-weight: 900 !important;
  font-size: 20px !important;
  color: #409eff !important;
}
.botonTabla {
  align-self: flex-end;
  margin-bottom: 6px;
}
</style>
