<template>
  <div id="app">
    <b-container class="container-1">
      <b-row class="header">

        <b-col cols="2" class="d-flex justify-content-center align-items-center img">
          <img src="https://img.myloview.es/cuadros/menu-icon-isolated-on-white-background-web-menu-icon-400-196004480.jpg" alt="" class="menu">
        </b-col>

        <b-col cols="1=" class="d-flex justify-content-center align-items-center img-cash">
          <img src="https://img.freepik.com/vector-premium/bolsa-dinero-llena-dolares-moneda-oro-ilustracion-vectorial-dibujos-animados_401949-7.jpg?w=2000" alt="" class="cash">
        </b-col>

        <b-col cols="5" class="text-cahs">
          <h5>Efectivo</h5>
          <p>{{ cash }}</p>
        </b-col>

        <b-col class="d-flex justify-content-end align-items-center">
            <AddTransaction/>
        </b-col>
      </b-row>

      <b-row class="body">

        <b-col cols="2" class="items">
          <button v-for="(item, i) in itemsoptions" :key="i" class="items-options">
            <img v-bind:src="item.image" alt="" class="img-movement">
            <p>{{ item.tittle }}</p>
          </button>
        </b-col>

        <b-col class="view-movements">

        </b-col>
      </b-row>

    </b-container>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AddTransaction from './components/AddTransaction.vue';


export default {
  name: 'App',
  components: {
    HelloWorld,
    AddTransaction,
    },
  data() {
    return {
      cash: "COL $3,975,000",
      itemsoptions: [{
        image: 'https://media.istockphoto.com/id/1250594655/es/vector/icono-vectorial-de-factura-factura-de-trazo-editable-ficha-lineal-de-factura-para-su-uso-en.jpg?s=612x612&w=0&k=20&c=xUHbg71mAdw9_IkdxddL5eTo1Dp8UOnVVP1LrgYrjVk=',
        tittle: 'Movimientos'
      },
      {
        image: 'https://static.vecteezy.com/system/resources/previews/002/206/090/non_2x/money-transaction-icon-free-vector.jpg',
        tittle: 'Transacciones'
      },
      {
        image: 'https://static.vecteezy.com/system/resources/previews/002/509/476/non_2x/statistics-report-coin-business-cash-money-line-design-free-vector.jpg',
        tittle: 'estadísticas'
      },
      {
        image: 'https://c8.alamy.com/compes/2c6xj2t/facturas-para-pagar-vector-simple-ahogado-hombre-en-deuda-con-cheque-de-pago-stickman-no-cara-clipart-dibujos-animados-dibujado-a-mano-boceto-de-fideos-ilustracion-grafica-2c6xj2t.jpg',
        tittle: 'Deudas'
      },
      {
        image: 'https://c8.alamy.com/compes/2ct01kn/icono-de-linea-negra-para-inversores-consultoria-financiera-inversion-y-ahorro-crowdfunding-invertir-dinero-en-un-nuevo-proyecto-firme-para-la-pagina-web-la-aplicacion-ui-ux-2ct01kn.jpg',
        tittle: 'Inversiones'
      },
      {
        image: 'https://us.123rf.com/450wm/sabuhinovruzov/sabuhinovruzov1812/sabuhinovruzov181200116/112874406-icono-de-l%C3%ADnea-de-lista-y-l%C3%A1piz-portapapeles-con-ilustraci%C3%B3n-de-vector-de-pluma-aislado-en-blanco.jpg?ver=6',
        tittle: 'Reportes'
      }]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container-1{
  height: 100vh;
  width: 100vw;
}
.header{
  height: 15vh;
  background-color: lightgray;
}
.menu{
  width: 3rem;
  height: 3rem;
}
.cash{
  width: 5rem;
  height: 5rem;
}
.cash{
  border-radius: 5rem;
}
.text-cahs{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.body{
  height: 85vh;
}
.items{
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
}
.items-options{
  width: 5rem;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 0;
  background-color: lightgray;
}
.img-movement{
    width: 3rem;
    height: 3rem;
}
.view-movements{
  background-color: rgb(150, 154, 159);
}
</style>
