<template>
  <div class="Login">
    <div class="FormLogin p-5">
      <h4 class="mb-5">Login Usuarios</h4>

      <h5>Email</h5>
      <b-input-group>
        <b-form-input type="email" v-model="email"></b-form-input>
      </b-input-group>

      <h5>Contraseña</h5>
      <b-input-group>
        <b-form-input type="password" v-model="password"></b-form-input>
      </b-input-group>
      <el-button type="primary" class=" botonIngreso mt-4" @click="ingresar()"
        >Ingresar</el-button
      >
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from "vuex"
export default {
  name: "Login",
  data() {
    return {
      email: "usuario@classicmodels.com",
      password: "",
    };
  },
  computed: {
    ...mapState(["usuarios", "usuarioLogeado"]),
  },
  methods: {
    ingresar() {
    if(this.email == this.usuarios[0].username && this.password == this.usuarios[0].password){
   axios.post("http://157.230.190.251/api/v1/cmodels/users/login").then(res =>{
       console.log(res.data)
        this.$store.dispatch("set_usuarioLogeado", res.data)

        this.$router.push('/home');
   })
     
     
    } else{
    alert("El usuario no existe verifique que el correo y la contraseña esten correctos")
    }   
    },
  },
};
</script>

<style lang="scss">
.Login {
  height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.FormLogin {
  width: 30%;
  border: 1px rgb(207, 204, 204) solid;

  border-radius: 10px;
}

.botonIngreso {
  width: 100%;
}
</style>
