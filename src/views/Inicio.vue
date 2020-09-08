<template>
  <div>
    <b-navbar class="nav" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Company</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="ml-4" :to="{ name: 'home'}">Home</b-nav-item>
          <b-nav-item class="ml-4" @click="cambiarestado()" :to="{ name: 'ordenes'}">Ordenes</b-nav-item>
          <b-nav-item href="#" disabled class="ml-4">Inventario</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right class="mr-3">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>
 
 <script>
 import {mapState, mapActions} from "vuex"
 export default {
   computed:{

   },
     methods: {
       ...mapActions(["setOpenDetalleOrden_false"]),
         logout(){
             this.$router.push('/login');

         },
      cambiarestado(){
this.setOpenDetalleOrden_false();
      }
      
     },
 }
 </script>

<style lang="scss">

    
</style>
