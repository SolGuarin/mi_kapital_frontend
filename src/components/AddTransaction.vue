<template>
  <div class="container">
    <b-button @click="showModal = true" class="add-transaction">Add Transaction</b-button>
    <b-modal v-model="showModal" title="Add Movement">
      <b-form @submit.prevent="submitForm" class="formTransaction">
        <b-form-group 
            id="input-group-1" 
            label="Fecha" 
            label-for="input-1">
            <b-form-datepicker id="input-1" v-model="movementToInsert.date"></b-form-datepicker>
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
            <p>{{ movementToInsert.account_id }}</p>
        </b-form-group>

        <b-form-group class="max-height"
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
                    @click="movementToInsert.category_id = option.id"
                    >
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown> 
            <p>{{ movementToInsert.category_id }}</p>
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
            <p>{{ movementToInsert.type}}</p>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Valor:"
          label-for="input-5"
          description="Ingrese el valor del movimiento"
        >
          <b-form-input id="input-2" v-model="movementToInsert.amount" type="number" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Note:"
          label-for="input-6"
          description="Agregue una nota"
        >
          <b-form-input id="input-1" v-model="movementToInsert.note" required></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Description:"
          label-for="input-7"
          description="Ingrese una descripción"
        >
          <b-form-input id="input-1" v-model="movementToInsert.description" required></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-button type="submit" @click.prevent="submitForm" class="guardar-transaction">Guardar</b-button>
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
            
            accountList: [],
            categoryList: [],
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
            movementToInsert: {
                account_id: '',
                category_id: '',
                amount: null,
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
            const formData = this.movementToInsert;

            try {
                const response = await axios.post('http://127.0.0.1:8000/movements', formData);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },

        getAccounts () {
            axios.get('http://127.0.0.1:8000/accounts', {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                }
            })
            .then((response) => {
                return response["data"]
            })
            .then((data) => {
                this.accountList = data
            })
        },
        
        getCategories () {
            axios.get('http://127.0.0.1:8000/categories', {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                }
            })
            .then((response) => {
                return response["data"]
            })
            .then((data) => {
                this.categoryList = data
            })
        },
    },
    
    mounted () {
        this.getCategories();
        this.getAccounts();
    }

}
</script>

<style scoped>
.formTransaction{
    font-family: Avenir, Helvetica, Arial, sans-serif;;
}
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
.max-height {
    max-height: 30rem;
    overflow: auto; /* Agrega scroll cuando el menú desplegable supere la altura máxima */
}

</style>