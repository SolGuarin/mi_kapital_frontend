<template>
  <div id="app">
    <b-container  fluid class="container-1">
      <b-row class="header">

        <b-col cols="2" class="d-flex justify-content-center align-items-center img">
          <img src="https://img.myloview.es/cuadros/menu-icon-isolated-on-white-background-web-menu-icon-400-196004480.jpg" alt="" class="menu">
        </b-col>

        <b-col cols="1" class="d-flex justify-content-center align-items-center img-cash">
          <img src="https://img.freepik.com/vector-premium/bolsa-dinero-llena-dolares-moneda-oro-ilustracion-vectorial-dibujos-animados_401949-7.jpg?w=2000" alt="" class="cash">
        </b-col>

        <b-col cols="2" class="text-cahs">
          <h5>Efectivo</h5>
          <p>{{ cash }}</p>
        </b-col>

        <b-col>
          <div v-if="!accessToken" class="div-form d-flex justify-content-center align-items-center">
            <form @submit.prevent="login" class="d-flex justify-content-center align-items-center">
              <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" />
              </div>
              
              <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" />
              </div>

              <button class="mt-4" type="submit">Login</button>
              
            </form>
          </div>
        </b-col>

        <b-col class="d-flex justify-content-end align-items-center">
            <AddTransaction :accessToken="accessToken" :key="AddTransactionKey"/>
        </b-col>
      </b-row>

      <b-row class="body">

        <b-col cols="2" class="items">
          
          <ShowMovements :accessToken="accessToken" :key="ShowMovementsKey"/>
          <ShowDebitTransactions :accessToken="accessToken" :key="ShowDebitTransactionsKey"/>

          <button class="items-options">
            <img v-bind:src="transactions.image" alt="" class="img-movement">
            <p>{{ transactions.tittle }}</p>
          </button>

          <button class="items-options">
            <img v-bind:src="statistics.image" alt="" class="img-movement">
            <p>{{ statistics.tittle }}</p>
          </button>

          <button class="items-options">
            <img v-bind:src="debts.image" alt="" class="img-movement">
            <p>{{ debts.tittle }}</p>
          </button>

          <button class="items-options">
            <img v-bind:src="investments.image" alt="" class="img-movement">
            <p>{{ investments.tittle }}</p>
          </button>

          <button class="items-options">
            <img v-bind:src="reports.image" alt="" class="img-movement">
            <p>{{ reports.tittle }}</p>
          </button>
        </b-col>

        <b-col class="view-movements d-flex justify-content-center align-items-center" >

          <MovementTransactionLink :accessToken="accessToken" @click="refreshComponent" :key="MovementTransactionLinkKey"/>

          <!-- <div ref="supersetContainer" id="supersetContainer"> </div>
          <iframe src="http://localhost:8088/superset/dashboard/29/?token=6b81297f-099d-4e6c-b838-7e045495c923" width="100%" height="600"></iframe> -->

        <!-- </b-col>
          <button onclick="embedDashboard()">Embeber Dashboard</button>
        <b-col> -->

        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import AddTransaction from './components/AddTransaction.vue';
import ShowMovements from './components/ShowMovements.vue';
import ShowDebitTransactions from './components/ShowDebitTransactions.vue';
import MovementTransactionLink from './components/MovementTransactionLink.vue';
import axios from 'axios'


export default {
  name: 'App',
  components: {
    AddTransaction,
    ShowMovements,
    ShowDebitTransactions,
    MovementTransactionLink
},
  data() {
    return {
      username: "",
      password: "",
      AddTransactionKey: 0,
      ShowMovementsKey: 0,
      MovementTransactionLinkKey: 0,

      cash: "COL $3,975,000",
      
      transactions: {
        image: 'https://static.vecteezy.com/system/resources/previews/002/206/090/non_2x/money-transaction-icon-free-vector.jpg',
        tittle: 'Transacciones'
      },
      statistics: {
        image: 'https://static.vecteezy.com/system/resources/previews/002/509/476/non_2x/statistics-report-coin-business-cash-money-line-design-free-vector.jpg',
        tittle: 'Estadísticas'
      },
      debts: {
        image: 'https://c8.alamy.com/compes/2c6xj2t/facturas-para-pagar-vector-simple-ahogado-hombre-en-deuda-con-cheque-de-pago-stickman-no-cara-clipart-dibujos-animados-dibujado-a-mano-boceto-de-fideos-ilustracion-grafica-2c6xj2t.jpg',
        tittle: 'Deudas'
      },
      investments: {
        image: 'https://c8.alamy.com/compes/2ct01kn/icono-de-linea-negra-para-inversores-consultoria-financiera-inversion-y-ahorro-crowdfunding-invertir-dinero-en-un-nuevo-proyecto-firme-para-la-pagina-web-la-aplicacion-ui-ux-2ct01kn.jpg',
        tittle: 'Inversiones'
      },
      reports: {
        image: 'https://us.123rf.com/450wm/sabuhinovruzov/sabuhinovruzov1812/sabuhinovruzov181200116/112874406-icono-de-l%C3%ADnea-de-lista-y-l%C3%A1piz-portapapeles-con-ilustraci%C3%B3n-de-vector-de-pluma-aislado-en-blanco.jpg?ver=6',
        tittle: 'Reportes'
      },
      accessToken: null
    }
  },
  methods: {
    login() {
      const url = 'http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/token';
      const payload = {
        grant_type: '',
        username: this.username,
        password: this.password
      };
      axios.post(url, new URLSearchParams(payload).toString(), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      })
      .then(response => {
        const token = response.data.access_token;
        this.accessToken = token;
        this.forceRerender()
        // Store the token in local storage or state management
        console.log('oe');
      })
      .catch(error => {
        console.error(error);
        // Handle any error that occurs during the login process
      });

      // Perform login logic here using the username and password values
    },
    refreshComponent (){
      this.MovementTransactionLinkKey += 1; 
    },
    forceRerender() {
      this.AddTransactionKey += 1;  
      this.ShowMovementsKey += 1;
      this.ShowDebitTransactionsKey += 1;
      this.MovementTransactionLinkKey += 1;
    }
  }
}
</script>

<style>
html, body{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.div-form {
  height: 15vh;
}
</style>
