<template>
    <div>
        <b-button @click="showModal = true" class="items-options">
            <img v-bind:src="movements.image" alt="" class="img-movement">
            <p class="title">{{ movements.tittle }}</p>
        </b-button>

        <b-modal size="xl" class="modalMovements" v-model="showModal" title="Movements" header-bg-variant="success" centered>
            <b-container class="text-center"> 
            <table>
                <thead>
                    <tr>
                    <th>Fecha</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Nota</th>
                    <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in movementList" :key="i">
                        <td>{{ item.date }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.type }}</td>
                        <td v-if="item.type === 'Expenses' || item.type === 'Income'">{{ item.category.name }}</td>
                        <td>{{ item.note }}</td>
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
    name: 'ShowMovements',
    
    data () {
        return {
            hola: "hola",
            movements: {
            image: 'https://media.istockphoto.com/id/1250594655/es/vector/icono-vectorial-de-factura-factura-de-trazo-editable-ficha-lineal-de-factura-para-su-uso-en.jpg?s=612x612&w=0&k=20&c=xUHbg71mAdw9_IkdxddL5eTo1Dp8UOnVVP1LrgYrjVk=',
            tittle: 'Movimientos'
            },
            showModal: false,
            movementList: [],
        }
    }, 

    methods: {
        getMovements(){
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNjg4NTI2MDgyfQ.iuABJSNO_JEvi51QV3nmb6QKlrnosyw5qBsiu5IpFHI';

            axios.get('http://127.0.0.1:8000/movements', {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                return response["data"]
            })
            .then((data) => {
                this.movementList = data
            })
        }
    },
    mounted(){
        this.getMovements()
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