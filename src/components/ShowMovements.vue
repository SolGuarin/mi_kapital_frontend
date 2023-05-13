<template>
    <div>
        <b-button @click="showModal = true" class="items-options">
            <img v-bind:src="movements.image" alt="" class="img-movement">
            <p class="title">{{ movements.tittle }}</p>
        </b-button>

        <b-modal size="xl" class="modalMovements" v-model="showModal" title="Movements" header-bg-variant="success" >
            <table responsive>
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
                    <tr>
                        <td>{{ movimientos[0].date }}</td>
                        <td>{{ movimientos[0].amount }}</td>
                        <td>{{ movimientos[0].type }}</td>
                        <td>{{ movimientos[0].category.name }}</td>
                        <td>{{ movimientos[0].note }}</td>
                        <td>{{ movimientos[0].description }}</td>  
                    </tr>
                    
                </tbody>
            </table>
        </b-modal>
    </div>
</template>

<script>

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
            movimientos: [
                {
                    "amount": 20000,
                    "note": "Palos de queso y pastel de pollo",
                    "description": "En la cafeteria al frente de la Coogranada, empezó a llover y nos quedamos comiendo ahí sol y yo",
                    "type": "Expenses",
                    "date": "2022-12-17",
                    "account": {
                        "id": 1,
                        "name": "Bancolombia",
                        "type": "Debito",
                        "note": "cuenta de ahorros"
                    },
                    "category": {
                        "id": 2,
                        "name": "Food",
                        "type": "Expenses"
                    }
                }
            ]
        }
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
    padding-right: 3rem;
}
.my-modal-header{
    background-color: green;
}

</style>