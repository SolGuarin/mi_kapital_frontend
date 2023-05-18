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
                    :value="option.type"
                    @click="movementToInsert.type = option.type">
                    {{ option.type }}
                </b-dropdown-item>
                
            </b-dropdown> 
            <p>{{ movementToInsert.type}}</p>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Currency:"
          label-for="input-2"
          description="Ingrese la moneda"
        >
        <b-dropdown 
            v-model="movementToInsert.currency"
            text="Selecciona una moneda"
            :state="this.movementToInsertState.currency"
            >
                <b-dropdown-item v-for="option in currency" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.currency = option.name">
                    {{ option.name }}
                </b-dropdown-item>
        </b-dropdown> 
        <b-form-invalid-feedback :state="this.movementToInsertState.currency">
            {{ this.movementToInsertStateMsg.currency }}
        </b-form-invalid-feedback>
            <p>{{ movementToInsert.account_id }}</p>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Account:"
          label-for="input-2"
          description="Ingrese la cuenta"
        >
        <b-dropdown 
            v-model="movementToInsert.account_id"
            text="Selecciona una cuenta"
            :state="this.movementToInsertState.account"
            >
                <b-dropdown-item v-for="option in accountList" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.account_id = option.id">
                    {{ option.name }}
                </b-dropdown-item>
        </b-dropdown> 
        <b-form-invalid-feedback :state="this.movementToInsertState.account">
            {{ this.movementToInsertStateMsg.account }}
        </b-form-invalid-feedback>
            
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
            text="Selecciona una categoria"
            :state="this.movementToInsertState.category"
            >
                <b-dropdown-item v-for="option in filteredCategoryList" 
                    :key="option.id" 
                    :value="option.name"
                    @click="movementToInsert.category_id = option.id"
                    >
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown> 
            <b-form-invalid-feedback :state="this.movementToInsertState.category">
                {{ this.movementToInsertStateMsg.category }}
            </b-form-invalid-feedback>
            <p>{{ movementToInsert.category_id }}</p>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Valor:"
          label-for="input-5"
          description="Ingrese el valor del movimiento"
        >
          <b-form-input id="input-2" v-model="movementToInsert.amount" type="number" :state="this.movementToInsertState.amount"  required></b-form-input>
            <b-form-invalid-feedback :state="this.movementToInsertState.amount">
                {{ this.movementToInsertStateMsg.amount }}
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Note:"
          label-for="input-6"
          description="Agregue una nota"
        >
          <b-form-input id="input-1" v-model="movementToInsert.note" :state="this.movementToInsertState.note" required></b-form-input>
          <b-form-invalid-feedback :state="this.movementToInsertState.note">
                {{ this.movementToInsertStateMsg.note }}
            </b-form-invalid-feedback>
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
            currency : [
                {
                    id: 1,
                    name: "COP"
                },{
                    id: 2,
                    name: "USD"
                }
            ],
            typeList: [
                {
                    "id": 1,
                    "type": 'Expenses'
                },
                {
                    "id": 2,
                    "type": 'Income'
                }
            ],
            showModal: false,
             
            movementToInsert: {
                account_id: '',
                category_id: '',
                amount: null,
                note: '',
                description: '',
                from_account_id: null,
                to_account_id: null,
                type: 'Expenses',
                currency: '',
                date: new Date().toISOString().slice(0, 10),
            },
            movementToInsertState: {
                currency: null,
                account: null,
                category: null,
                amount: null,
                note: null
                
            },
            movementToInsertStateMsg: {
                currency: null,
                account: null,
                category: null,
                amount: null,
                note: null
                
            }
            
        }
    },
    methods: {
        async submitForm () {
            const formData = this.movementToInsert;
            // if (this.movementToInsert.type == 'Income' || this.movementToInsert.type == 'Expenses' ){
            //     // Validar campos correspondientes
            //     console.log("holi");
            // }else{}


            this.validateAmount();
            this.validateCategory();
            this.validateNote();
            this.validateAccount();
            this.validateCurrency();
        

            if (this.movementToInsertState.amount && this.movementToInsertState.category && this.movementToInsertState.note && this.movementToInsertState.account && this.movementToInsertState.currency){
                const response = await axios.post('http://127.0.0.1:8000/movements', formData);
                console.log(formData)
                
                if (response.status == 201){
                    console.log("se insertoooooooooooo con un 201");

                } else{
                    console.log("no funcionooooo :()");

                }
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

        validateAmount() {
            console.log("this ::", this.movementToInsert.amount);
            if (!this.movementToInsert.amount){
                this.movementToInsertStateMsg.amount = "El valor es obligatorio";
                this.movementToInsertState.amount = false;
            } else if (this.movementToInsert.amount <= 0){
                this.movementToInsertStateMsg.amount = "El valor debe ser mayor a 0";
                this.movementToInsertState.amount = false;
            } 
            else {
                this.movementToInsertState.amount = true;
                this.movementToInsertState.amount = true;
            }
        },

        validateCategory(){
            if (!this.movementToInsert.category_id){
                this.movementToInsertState.category = false;
                this.movementToInsertStateMsg.category = "Debes seleccionar una categoría";
            }else{
                this.movementToInsertState.category = true;
            }

            console.log(this.movementToInsertState)
            console.log(!this.movementToInsert.category)
        },

        validateNote(){
            if (!this.movementToInsert.note){
                this.movementToInsertState.note = false;
                this.movementToInsertStateMsg.note = "Debes ingresar una nota";
            }else{
                this.movementToInsertState.note = true;
            }
        },

        validateAccount(){
            if (!this.movementToInsert.account_id){
                this.movementToInsertState.account = false;
                this.movementToInsertStateMsg.account = "Debes seleccionar una cuenta";
            }else{
                this.movementToInsertState.account = true;
            }
        },

        validateCurrency() {
            if (!this.movementToInsert.currency){
                this.movementToInsertState.currency = false;
                this.movementToInsertStateMsg.currency = "Debes seleccionar una cuenta";
            }else{
                this.movementToInsertState.currency = true;
            }
        }
    },
    
    mounted () {
        this.getCategories();
        this.getAccounts();
    },
    computed: {
        filteredCategoryList() {
            return this.categoryList.filter(option => option.type === this.movementToInsert.type);
        }
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