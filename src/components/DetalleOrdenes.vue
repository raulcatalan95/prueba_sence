<template>
  <div class="detalleordenes">
    <el-tabs type="border-card">
      <el-tab-pane label="General">
        <div class="ordenar">
          <h5>N°Orden</h5>
          <h5>{{ orden.num_orden }}</h5>
        </div>
        <div class="ordenar">
          <h5>Monto Orden</h5>
          <h5>{{ orden.monto }}</h5>
        </div>
        <div class="ordenar">
          <h5>Cant Productos</h5>
          <h5>{{ orden.cant_productos }}</h5>
        </div>
        <div class="ordenar">
          <h5>Fecha Entrega</h5>
          <h5>{{ orden.fecha_entrega.slice(0, 10) }}</h5>
        </div>
        <div class="ordenar">
          <h5>Vendedor</h5>
          <h5>{{ orden.vendedor }}</h5>
        </div>
        <div class="ordenar">
          <h5>Estado</h5>
          <h5>{{ orden.estado }}</h5>
        </div>
        <div class="ordenar">
          <h5>Avance Preparacion</h5>
          <el-progress id="progreso_general" :percentage="70"></el-progress>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Datos Clientes">
        <div class="ordenar">
          <h5>Nombre</h5>
          <h5>{{ cliente.nombre }}</h5>
        </div>
        <div class="ordenar">
          <h5>Rut</h5>
          <h5>{{ cliente.rut_n + "-" + cliente.rut_dv }}</h5>
        </div>
        <div class="ordenar">
          <h5>Direccion Entrega</h5>
          <h5>{{ cliente.direccion_entrega }}</h5>
        </div>
        <div class="ordenar">
          <h5>Contacto</h5>
          <h5>{{ cliente.contacto }}</h5>
        </div>
        <div class="ordenar">
          <h5>Fono</h5>
          <h5>{{ cliente.fono }}</h5>
        </div>
        <div class="ordenar">
          <h5>Email</h5>
          <h5>{{ cliente.email }}</h5>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Productos">
        <el-table :data="productos" style="width: 100%">
          <el-table-column prop="cod_prod" label="Cod Producto">
          </el-table-column>
          <el-table-column prop="descripcion" label="Descripcion">
          </el-table-column>
          <el-table-column prop="precio_unit" label="Precio Unit">
          </el-table-column>
          <el-table-column prop="cant_pedido" label="Cant Pedido">
          </el-table-column>
          <el-table-column prop="cant_pickeado" label="Cant Pickeado">
          </el-table-column>
          <el-table-column label="Cumplimiento">
            <template slot-scope="scope">
              <el-progress
                :percentage="porcentajeProductos(scope.row.cant_pedido,scope.row.cant_pickeado)">
              </el-progress>
            </template>
          </el-table-column>
           <el-table-column >
            <template slot-scope="scope">
              <b-icon
                class="icono"
                :icon="icono(scope.row.cant_pedido, scope.row.cant_pickeado)"
                :style="{
                  color:
                    icono(scope.row.cant_pedido, scope.row.cant_pickeado) == 'check-circle-fill'
                      ? 'green'
                      : '#2F4AD3',
                }"
              ></b-icon>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "detalleOrdenes",
  data() {
    return {
      orden: "",
      cliente: "",
      productos: "",
    };
  },
  computed: {
    ...mapState(["detalleOrden"]),
  },
  methods: {
    ...mapActions(["setDetalleOrden"]),

    porcentajeProductos(Nmayor, Nmenor) {
      let multi = Nmenor * 100;
      return Math.round(multi / Nmayor);
    },
     icono(pedido,pickeado) {
      let verificar = pedido == pickeado ? "check-circle-fill" : "clock-fill";
      return verificar;
    },
  },
  created() {
    this.setDetalleOrden();
  },
  mounted() {
    this.orden = this.detalleOrden.orden;
    this.cliente = this.detalleOrden.cliente;
    this.productos = this.detalleOrden.productos;
  },
};
</script>
<style lang="scss">
.ordenar {
  display: flex;
  width: 40%;
  justify-content: space-between;
  color: #909399;
}
#progreso_general {
  width: 30%;
}
</style>
