import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarios: [
      {
        username: "usuario@classicmodels.com",
        password: "abc123",
      },
    ],
    usuarioLogeado: false,
    ultimasDevoluciones: "",
    ultimasOrdenes:"",
    kpis:"",
    oficinas:"",
    estados:"",
    ordenes:"",
    openDetalleOrden: false,
    detalleOrden:"",
  },
  mutations: {
    SET_USUARIO_LOGEADO(state, newuser) {
      state.usuarioLogeado = newuser;
    },
    SET_DASHBOARD_UD(state, newdashboard) {
      state.ultimasDevoluciones = newdashboard;
    },
    SET_DASHBOARD_UO(state, newdashboard) {
      state.ultimasOrdenes = newdashboard;
    },
    SET_DASHBOARD_KPIS(state, newdashboard) {
      state.kpis = newdashboard;
    },
    SET_OFICINAS(state,ofise){
      state.oficinas = ofise;
    },
    SET_ESTADOS(state,estado){
      state.estados = estado;
    },
    SET_ORDENES(state,orden){
      state.ordenes = orden
    },
    SET_DETALLE_ORDEN(state,detalleorden){
      state.detalleOrden = detalleorden
    },
    SET_DETALLE_ORDEN_FALSE(state,estado){
     state.openDetalleOrden = estado
    },
    SET_DETALLE_ORDEN_TRUE(state,estado){
      state.openDetalleOrden = estado
     },
  },
  actions: {
    setOpenDetalleOrden_false({ commit }){
      commit("SET_DETALLE_ORDEN_FALSE",false);
    },
    setOpenDetalleOrden_true({ commit }){
      commit("SET_DETALLE_ORDEN_TRUE",true);
    },
    setDashboardUD({ commit }) {
      axios.get("api/dashboard.json").then(data=>{
        let ultimasdevoluciones =data.data.ultimas_devoluciones
        commit("SET_DASHBOARD_UD", ultimasdevoluciones);
      })
      
    },
    setDashboardUO({ commit }) {
      axios.get("api/dashboard.json").then(data=>{
        let ultimasordenes = data.data.utimas_ordenes
        commit("SET_DASHBOARD_UO", ultimasordenes);
      })
      
    },
    setOficinas({commit}){
      axios.get("api/oficinas.json").then((data) => {
        let ofise = data.data.oficinas
        commit("SET_OFICINAS", ofise);
      })
    },
    setEstados({commit}){
      axios.get("api/estados.json").then((data) => {
        let estado = data.data.estados
        commit("SET_ESTADOS", estado);
      })
    },
    setOrdenes({commit}){
    axios.get("api/ordenes.json").then(data =>{
      let orden = data.data.ordenes
      commit("SET_ORDENES", orden);
    })
    },
    setDetalleOrden({commit}){
      axios.get("api/detalle_orden.json").then(data =>{
        let detalleorden = data.data
        commit("SET_DETALLE_ORDEN", detalleorden);
    })
  },
    setDashboardKpis({ commit }) {
      axios.get("api/dashboard.json").then(data=>{
        let kpis = data.data.kpis
        commit("SET_DASHBOARD_KPIS", kpis);
      })
      
    },

    set_usuarioLogeado({ commit }, newuser) {
      commit("SET_USUARIO_LOGEADO", newuser);
    },
  },
  modules: {},
});
