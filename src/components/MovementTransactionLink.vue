<template>
  <div class="movement-transaction-link">


    <!-- <label for="dateInput">Date:</label>
  <input id="dateInput" type="date" :value="formattedDate" @input="updateSelectedDate" v-on:input="updateSelectedDate"/> -->
    <p>
      <label for="dateSelect">Date:</label>
      <select id="dateSelect" v-model="selectedDate" @input="updateSelectedDate" v-on:input="updateSelectedDate">
        <option value="">Select a date</option>
        <option v-for="date in predefinedDates" :value="date" :key="date">{{ date }}</option>
      </select>
    </p>

    <p>
      <label for="transactionTypeSelect">Transaction Type:</label>
      <select id="transactionTypeSelect" v-model="selectedTransactionType" @input="updateSelectedTransactionType" v-on:input="updateSelectedTransactionType">
        <option value="">Select a transaction Type</option>
        <option v-for="option in transactionsTypeOptions" :value="option" :key="option"> {{ option }}</option>
      </select>
    </p>

    <div v-if="selectedDate && selectedTransactionType">
      <h2>Movements</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nota</th>
            <th>Cantidad</th>
            <th>Moneda</th>
            <th>Tipo</th>
            <th>Account/From To</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in filteredMovements" :key="movement.id" :class="{ 'selected-row': selectedMovement === movement.id }" @click="handleMovementClick(movement.id)">
            <td>{{ movement.date }}</td>
            <td>{{ movement.note }}</td>
            <td>{{ movement.amount }}</td>
            <td>{{ movement.currency }}</td>
            <td>{{ movement.type }}</td>
            <td v-if="movement.type == 'Transfer'">{{ movement.from_account.name }} ==> {{ movement.to_account.name }}</td>
            <td v-else>{{ movement.account.name }}</td>
          </tr>
          <tr v-if="filteredMovements.length === 0">
            <td colspan="2">No movements for the selected date</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedDate && selectedTransactionType && selectedTransactionType == 'Debit Transaction'">
      <h2>Debit Transactions</h2>
      <table v-if="selectedDate" class="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Descripción</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredDebitTransactions" :key="transaction.id" :class="{ 'selected-row': selectedDebitTransaction === transaction.id }" @click="handleDebitTransactionClick(transaction.id)">
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.description }}</td>
            <td>{{ transaction.value }}</td>
          </tr>
          <tr v-if="filteredDebitTransactions.length === 0">
            <td colspan="2">No debit transactions for the selected date</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedDate && selectedTransactionType && selectedTransactionType == 'Credit Transaction'">
      <h2>Credit Transactions</h2>
      <table v-if="selectedDate" class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Moneda</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredCreditTransactions" :key="transaction.id" :class="{ 'selected-row': selectedCreditTransaction === transaction.id }" @click="handleCreditTransactionClick(transaction.id)">
            <td>{{ transaction.transaction_date }}</td>
            <td>{{ transaction.description }}</td>
            <td>{{ transaction.original_value }}</td>
            <td>{{ transaction.currency }}</td>
          </tr>
          <tr v-if="filteredCreditTransactions.length === 0">
            <td colspan="2">No credit transactions for the selected date</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <b-button class="submit-button-link" @click="LinkTransactionMovement">Submit</b-button>
    
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'MovementTransactionLink',
  props: {
    accessToken: String
  },
  data() {
    return {
      predefinedDates: ['2023-07-15', '2023-07-16', '2023-07-17', '2023-03-02'], // Example of predefined dates
      transactionsTypeOptions: ['Debit Transaction', 'Credit Transaction'],
      selectedDate: null,
      selectedTransactionType: null,
      selectedMovement: null,
      selectedDebitTransaction: null,
      selectedCreditTransaction: null,
      movements: [],
      debit_transactions: [],
      credit_transactions: []
    };
  },
  computed: {
    formattedDate() {
      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}-${month}-${day}`;
      }
      return '';
    },
    filteredMovements() {
      return this.movements.filter((movement) => movement.date === this.selectedDate);
    },
    filteredDebitTransactions() {
      return this.debit_transactions.filter((transaction) => transaction.date === this.selectedDate);
    },
    filteredCreditTransactions() {
      return this.credit_transactions.filter((transaction) => transaction.transaction_date === this.selectedDate);
    }
  },
  methods: {
    getDateOptions(){
      const datesMovement = this.movements.map(i => i['date']);
      const datesDebitTransaction = this.debit_transactions.map(i => i['date']);
      const datesCreditTransaction = this.credit_transactions.map(i => i['date']);

      var concatenatedArray = datesMovement.concat(datesDebitTransaction);
      concatenatedArray = concatenatedArray.concat(datesCreditTransaction);
      
      this.predefinedDates = [...new Set(concatenatedArray)];

    },
    updateSelectedDate(event) {
      this.selectedDate = event.target.value;
      this.fetchMovements();
      this.fetchDebitTransactions();
      this.fetchCreditTransactions();
      this.getDateOptions()
    },
    updateSelectedTransactionType(event) {
      console.log(event.target.value);
    },
    async fetchMovements() {
      try {
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/unmatched_movements', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          },
          params: {
            date: this.selectedDate
          }
        });
        this.movements = response.data;
      } catch (error) {
        console.error('Error fetching movements:', error);
      }
    },
    async fetchDebitTransactions() {
      try {
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/unmatched_debit_transactions', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          },
          params: {
            date: this.selectedDate
          }
        });
        this.debit_transactions = response.data;
      } catch (error) {
        console.error('Error fetching debit transactions:', error);
      }
    },
    async fetchCreditTransactions() {
      try {
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/unmatched_credit_transactions', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          },
          params: {
            date: this.selectedDate
          }
        });
        this.credit_transactions = response.data;
      } catch (error) {
        console.error('Error fetching credit transactions:', error);
      }
    },
    handleMovementClick(id) {
      this.selectedMovement = id;
      console.log('Clicked Movement ID:', id);
      // Perform additional actions with the movement ID and the accessToken prop
    },
    handleDebitTransactionClick(id) {
      this.selectedDebitTransaction = id;
      console.log('Clicked Debit Transaction ID:', id);
      // Perform additional actions with the debit transaction ID and the accessToken prop
    },
    handleCreditTransactionClick(id) {
      this.selectedCreditTransaction = id;
      console.log('Clicked Credit Transaction ID:', id);
      // Perform additional actions with the credit transaction ID and the accessToken prop
    },

    LinkTransactionMovement(){
      console.log(this.selectedTransactionType, this.selectedMovement, this.selectedCreditTransaction, this.selectedDebitTransaction);
      if (this.selectedTransactionType == 'Credit Transaction' & this.selectedMovement !== null & this.selectedCreditTransaction !== null){
        alert('selectedTransactionType => ' + this.selectedTransactionType + ', selectedMovement => ' + this.selectedMovement + ', selectedCreditTransaction = > '+ this.selectedCreditTransaction);
      } else if (this.selectedTransactionType == 'Debit Transaction' & this.selectedMovement !== null & this.selectedDebitTransaction !== null){
        alert('selectedTransactionType => ' + this.selectedTransactionType + ', selectedMovement => ' + this.selectedMovement + ', selectedDebitTransaction = > '+ this.selectedDebitTransaction);
      } else {
        alert('All fields are mandatory');
      }
    }
  },
  mounted() {
    this.fetchMovements();
    this.fetchDebitTransactions();
    this.fetchCreditTransactions();
  }
};
</script>

<style>
.movement-transaction-link {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.table th {
  background-color: #f5f5f5;
}

.selected-row {
  background-color: #e2f0ff;
  cursor: pointer;
}

.submit-button-link {
    width: 15rem;
    height: 3rem;
    background-color: green;
    color: white;
    font-size: 1rem;
    border-radius: 0.5rem;
}
</style>