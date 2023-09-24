<template>
  <div class="container">
    <b-button @click="showModal = true" class="add-transaction">Add Transaction</b-button>
    <b-modal v-model="showModal" title="Add Movement" hide-footer>
      <b-form @submit.prevent="submitForm" class="formTransaction">
        <b-form-group 
            id="input-group-1" 
            label="Fecha" 
            label-for="input-1">
            <b-form-datepicker id="input-1" v-model="movementToInsert.date"></b-form-datepicker>

            <b-form-invalid-feedback :state="this.movementToInsertState.date">
                {{ this.movementToInsertStateMsg.date }}
            </b-form-invalid-feedback>

        </b-form-group>

        <b-form-group id="input-group-4" label="Ingrese el tipo de movimiento" label-for="input-4">
            <select v-model="movementToInsert.type" :class="{'is-invalid': this.movementToInsertState.type}">
                <option value="" disabled>Selecciona una opción</option>
                <option v-for="option in typeList" :key="option.id" :value="option.type">
                {{ option.type }}
                </option>
            </select>

            <b-form-invalid-feedback :state="this.movementToInsertState.type">
                {{ this.movementToInsertStateMsg.type }}
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-2" label="Ingrese la moneda" label-for="input-2">
            <select v-model="movementToInsert.currency" :class="{'is-invalid': this.movementToInsertState.currency}">
                <option value="" disabled>Selecciona una moneda</option>
                <option v-for="option in currency" :key="option.id" :value="option.name">
                {{ option.name }}
                </option>
            </select>

            <b-form-invalid-feedback :state="this.movementToInsertState.currency">
                {{ this.movementToInsertStateMsg.currency }}
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
        id="input-group-2"
        label="Ingrese la cuenta:"
        label-for="input-2"
        v-if="movementToInsert.type === 'Expenses' || movementToInsert.type === 'Income'"
        >
            <select
                v-model="movementToInsert.account_id" 
                :class="{'is-invalid': this.movementToInsertState.account}"
            >
                <option value="" disabled>Selecciona una cuenta</option>
                <option
                v-for="option in accountList"
                :key="option.id"
                :value="option.id"
                >
                {{ option.name }}
                </option>
            </select>

            <b-form-invalid-feedback :state="this.movementToInsertState.account">
                {{ this.movementToInsertStateMsg.account }}
            </b-form-invalid-feedback>

        </b-form-group>


        <b-form-group
            class="max-height"
            id="input-group-3"
            label="Category:"
            label-for="input-3"
            description="Ingrese la categoría"
            v-if="movementToInsert.type === 'Expenses' || movementToInsert.type === 'Income'"
        >
            <select
                v-model="movementToInsert.category_id"
                :class="{'is-invalid': this.movementToInsertState.category}"
            >
                <option value="" disabled>Selecciona una categoría</option>
                <option
                v-for="option in filteredCategoryList"
                :key="option.id"
                :value="option.id"
                >
                {{ option.name }}
                </option>
            </select>

            <b-form-invalid-feedback :state="this.movementToInsertState.category">
                {{ this.movementToInsertStateMsg.category }}
            </b-form-invalid-feedback>


        </b-form-group>


        <b-form-group
            id="input-group-2"
            label="From Account:"
            label-for="input-2"
            description="Ingrese la cuenta"
            :state="this.movementToInsertState.from_account_id"
            v-if="movementToInsert.type === 'Transfer'"
        >
        <select v-model="movementToInsert.from_account_id">
            <option value="" disabled>Selecciona una cuenta</option>
            <option v-for="option in accountList" :key="option.id" :value="option.id">
            {{ option.name }}
            </option>
        </select>

        <b-form-invalid-feedback :state="this.movementToInsertState.from_account_id">
            {{ this.movementToInsertStateMsg.from_account_id }}
        </b-form-invalid-feedback>
        </b-form-group>

            <b-form-group
                id="input-group-2"
                label="To Account:"
                label-for="input-2"
                description="Ingrese la cuenta"
                :state="this.movementToInsertState.to_account_id"
                v-if="movementToInsert.type === 'Transfer'"
            >
            <select v-model="movementToInsert.to_account_id">
                <option value="" disabled>Selecciona una cuenta</option>
                <option v-for="option in accountList" :key="option.id" :value="option.id">
                {{ option.name }}
                </option>
            </select>

            <b-form-invalid-feedback :state="this.movementToInsertState.to_account_id">
                {{ this.movementToInsertStateMsg.to_account_id }}
            </b-form-invalid-feedback>

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
    props: {
        accessToken: String
    },
    data() {
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
                },
                {
                    "id": 3,
                    "type": 'Transfer'
                }
            ],
            showModal: false,
            movementToInsert: {
                account_id: null,
                category_id: null,
                amount: null,
                note: '',
                description: '',
                from_account_id: null,
                to_account_id: null,
                type: 'Expenses',
                currency: '',
                date: null//new Date().toISOString().slice(0, 10),
            },
            movementToInsertState: {
                date: null,
                type: null,
                currency: null,
                account: null,
                category: null,
                amount: null,
                note: null,
                from_account_id: null,
                to_account_id: null  
            },
            movementToInsertStateMsg: {
                type: null,
                currency: null,
                account: null,
                category: null,
                amount: null,
                note: null,
                from_account_id: null,
                to_account_id: null
            }
            
        }
    },
    methods: {
        async submitForm () {
            const formData = this.movementToInsert;
            this.validateDate();
            this.validateAmount();
            this.validateCategory();
            this.validateNote();
            this.validateAccount();
            this.validateCurrency();
            this.validateType();
            this.validateFromAccount();
            this.validateToAccount();

            if (
                this.movementToInsertState.date &&
                this.movementToInsertState.amount && 
                this.movementToInsertState.category && 
                this.movementToInsertState.note && 
                this.movementToInsertState.account &&
                this.movementToInsertState.currency && 
                this.movementToInsertState.type &&
                (this.movementToInsert.type === "Expenses" || this.movementToInsert.type === "Income")
            ){

                this.movementToInsert.from_account_id = null;
                this.movementToInsert.to_account_id = null;


                const response = await axios.post('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/movements', formData, {headers: {'Authorization': `Bearer ${this.accessToken}`}});
                console.log(formData)
                
                if (response.status == 201){
                    alert('Guardado');
                    this.cleanForm();
                    this.showModal = false;

                } else{
                    alert('no funcionooooo :()');
                }
            } else if (
                this.movementToInsertState.date &&
                this.movementToInsertState.amount && 
                this.movementToInsertState.note && 
                this.movementToInsertState.currency && 
                this.movementToInsertState.type && 
                this.movementToInsertState.from_account_id && 
                this.movementToInsertState.to_account_id &&
                this.movementToInsert.type === "Transfer"
            ){

                this.movementToInsert.account_id = null;
                this.movementToInsert.category_id = null;


                const config = {headers: {'Authorization': `Bearer ${this.accessToken}`}};

                const response = await axios.post('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/movements', formData, config);
                
                if (response.status == 201){
                    alert('Guardado');
                    this.cleanForm();
                    this.showModal = false;
                } else{
                    alert('no funcionooooo');
                }
            }
        },

        cleanForm() {
            this.movementToInsert = {
                account_id: null,
                category_id: null,
                amount: null,
                note: '',
                description: '',
                from_account_id: null,
                to_account_id: null,
                type: 'Expenses',
                currency: '',
                date: null// new Date().toISOString().slice(0, 10),
            }

            // this.movementToInsert.type = null;
            // this.movementToInsert.currency = null;
            // this.movementToInsert.account = null;
            // this.movementToInsert.category = null;
            // this.movementToInsert.amount = null;
            // this.movementToInsert.note = null;
            // this.movementToInsert.from_account_id = null;
            // this.movementToInsert.to_account_id = null;
        },

        getAccounts () {
            axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/accounts', {
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
                this.accountList = data
            })
        },
        
        getCategories () {

            axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/categories', {
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
                this.categoryList = data
            })
        },

        validateDate(){
            console.log("OOE validatendo date");
            if (this.movementToInsert.date === null) {
                this.movementToInsertState.date = false;
                this.movementToInsertStateMsg.date = "La fecha es obligatoria";
            }else{
                this.movementToInsertState.date = true;
            }
        },

        validateAmount() {

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
        },

        validateType() {
            if (!this.movementToInsert.type){
                this.movementToInsertState.type = false;
                this.movementToInsertStateMsg.type = "Debes seleccionar el tipo del movimiento";
            }else{
                this.movementToInsertState.type = true;
            }
        },

        validateFromAccount(){
            if (!this.movementToInsert.from_account_id){
                this.movementToInsertState.from_account_id = false;
                this.movementToInsertStateMsg.from_account_id = "Debes ingresar una cuenta";
            }else{
                this.movementToInsertState.from_account_id = true;
            }
        },

        validateToAccount(){
            if (!this.movementToInsert.to_account_id){
                this.movementToInsertState.to_account_id = false;
                this.movementToInsertStateMsg.to_account_id = "Debes ingresar una cuenta";
            } else if (this.movementToInsert.from_account_id === this.movementToInsert.to_account_id){
                this.movementToInsertState.to_account_id = false;
                this.movementToInsertStateMsg.to_account_id = "Debes ingresar una cuenta diferente a la cuenta de origen";
            }else{
                this.movementToInsertState.to_account_id = true;
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