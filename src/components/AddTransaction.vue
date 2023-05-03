<template>
  <div>
    <b-button @click="showModal = true" class="add-transaction">Add Transaction</b-button>
    <b-modal v-model="showModal" title="Add Movement">
      <b-form @submit.prevent="submitForm">
        <b-form-group 
            id="input-group-1" 
            label="Fecha" 
            label-for="input-1">
            <b-form-datepicker id="input-1" v-model="date"></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Account:"
          label-for="input-2"
          description="Ingrese la cuenta"
        >
            <b-dropdown 
            v-model="movementToInsert.account_id"
            text="Selecciona una opción">
                <b-dropdown-item v-for="option in accountList" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.account_id = option.id">
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown> 
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Category:"
          label-for="input-3"
          description="Ingrese la categoría"
        >
        <b-dropdown 
            v-model="movementToInsert.category_id"
            text="Selecciona una opción">
                <b-dropdown-item v-for="option in categoryList" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.category_id = option.id">
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown> 
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Type:"
          label-for="input-4"
          description="Ingrese el tipo de movimiento"
        >
        <b-dropdown 
            v-model="movementToInsert.type"
            text="Selecciona una opción">
                <b-dropdown-item v-for="option in typeList" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.type = option.name">
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown> 
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Valor:"
          label-for="input-5"
          description="Ingrese el valor del movimiento"
        >
          <b-form-input id="input-2" v-model="amount" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Note:"
          label-for="input-6"
          description="Agregue una nota"
        >
          <b-form-input id="input-1" v-model="note" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Description:"
          label-for="input-7"
          description="Ingrese una descripción"
        >
          <b-form-input id="input-1" v-model="description" required></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" class="guardar-transaction">Guardar</b-button>
          <b-button @click="showModal = false">Cancelar</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>

</template>

<script>
import axios from 'axios'
import { BButton, BModal, BForm, BFormGroup, BFormInput } from 'bootstrap-vue';

export default{
    name: "AddTransaction",
    components:{
        BButton,
        BModal,
        BForm,
        BFormGroup,
        BFormInput,

    },
    data(){
        return{
            accountList: [
            {
                "id": 1,
                "name": "Bancolombia",
                "type": "Debito",
                "note": "cuenta de ahorros"
            },
            {
                "id": 6,
                "name": "MasterCard",
                "type": "Credito",
                "note": "Nada"
            },
            {
                "id": 3,
                "name": "Bancolombia",
                "type": "Credito",
                "note": "Corriente"
            }
            ],
            categoryList: [
            {
                "id": 1,
                "name": "ahsnd,",
                "type": "ajdknjks"
            },
            {
                "id": 2,
                "name": "Food",
                "type": "Expenses"
            },
            {
                "id": 5,
                "name": "Interest",
                "type": "Income"
            }
            ],
            typeList: [
                {
                    "id": 1,
                    "name": 'Expenses'
                },
                {
                    "id": 2,
                    "name": 'Income'
                }
            ],
            showModal: false,
            date: new Date().toISOString().slice(0, 10),
            account: '',
            amount: '',
            note: '',
            description: '',
            movementToInsert: {
                account_id: '',
                category_id: '',
                amount: '',
                note: '',
                description: '',
                from_account_id: null,
                to_account_id: null,
                type: '',
                date: ''
            }

        }
    },
    methods: {
        async submitForm () {
            const formData = {
                account_id: this.movementToInsert.account_id,
                category_id: this.movementToInsert.category_id,
                amount: this.movementToInsert.amount,
                note: this.movementToInsert.note,
                description: this.movementToInsert.description,
                from_account_id: this.movementToInsert.from_account_id,
                to_account_id: this.movementToInsert.to_account_id,
                type: this.movementToInsert.type,
                date: this.movementToInsert.date
            };

            try {
                const response = await axios.post('http://127.0.0.1:8000/movements', formData)
                console.log(response.data);
            } catch(error){
                console.log(error);
            }
        }
    }

}
</script>

<style scoped>
.add-transaction{
    width: 15rem;
    height: 3rem;
    background-color: green;
    color: white;
    font-size: 1rem;
    border-radius: 0.5rem;
}
.guardar-transaction{
    background-color: green;
    margin-right: 0.5rem;
}
</style>