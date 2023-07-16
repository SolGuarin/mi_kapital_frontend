<template>
    <div>
        <b-button @click="showModal = true" class="items-options">
            <img v-bind:src="movements.image" alt="" class="img-movement">
            <p class="title">{{ movements.tittle }}</p>
        </b-button>

        <b-modal size="xl" class="modalDebitTrasnsactions" v-model="showModal" title="Debit Transactions" header-bg-variant="success" centered>
            <b-container class="text-center"> 
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Valor</th>
                        <th>Referencia</th>
                        <th>Origen</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in debitTransationList" :key="i">
                        <td>{{ item.id }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.value }}</td>
                        <td>{{ item.reference }}</td>
                        <td>{{ item.origin }}</td>
                        <td>{{ item.description }}</td>  
                    </tr>
                </tbody>
            </table>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ShowDebitTransactions',
    props: {
        accessToken: String
    },
    data () {
        return {
            movements: {
                image: 'https://media.istockphoto.com/id/1250594655/es/vector/icono-vectorial-de-factura-factura-de-trazo-editable-ficha-lineal-de-factura-para-su-uso-en.jpg?s=612x612&w=0&k=20&c=xUHbg71mAdw9_IkdxddL5eTo1Dp8UOnVVP1LrgYrjVk=',
                tittle: 'Debit Transactions'
            },
            showModal: false,
            debitTransationList: [],
        }
    }, 

    methods: {
        getDebitTransactions(){

            axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/debit_transactions', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
            .then((response) => {
                return response["data"]
            })
            .then((data) => {
                this.debitTransationList = data
            })
        }
    },
    mounted(){
        this.getDebitTransactions()
    }
}
</script>

<style scoped>
.items-options{
  width: 7rem;
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
.title{
    color: black;
}
th{
    padding-right: 2rem;
}
.my-modal-header{
    background-color: green;
}

th, td {
  text-align: center;
  padding: 0.7rem;
}

th {
  background-color: #f2f2f2;
}


</style>