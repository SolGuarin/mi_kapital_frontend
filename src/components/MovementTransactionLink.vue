<template>
  <div class="movement-transaction-link">
    <label for="dateInput">Date:</label>
    <input id="dateInput" type="date" :value="formattedDate" @input="updateSelectedDate" v-on:input="updateSelectedDate"/>

    <h2>Movements</h2>
    <table v-if="selectedDate" class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Note</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movement in filteredMovements" :key="movement.id" :class="{ 'selected-row': selectedMovement === movement.id }" @click="handleMovementClick(movement.id)">
          <td>{{ movement.date }}</td>
          <td>{{ movement.note }}</td>
          <td>{{ movement.amount }}</td>
        </tr>
        <tr v-if="filteredMovements.length === 0">
          <td colspan="2">No movements for the selected date</td>
        </tr>
      </tbody>
    </table>

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

    <h2>Credit Transactions</h2>
    <table v-if="selectedDate" class="table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Descripción</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in filteredCreditTransactions" :key="transaction.id" :class="{ 'selected-row': selectedCreditTransaction === transaction.id }" @click="handleCreditTransactionClick(transaction.id)">
          <td>{{ transaction.transaction_date }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.original_value }}</td>
        </tr>
        <tr v-if="filteredCreditTransactions.length === 0">
          <td colspan="2">No credit transactions for the selected date</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No date selected</p>
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
      selectedDate: null,
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
      console.log("This movementn", this.movements.filter((movement) => movement.date === this.selectedDate));
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
    updateSelectedDate(event) {
      this.selectedDate = event.target.value;
      this.fetchMovements();
      this.fetchDebitTransactions();
      this.fetchCreditTransactions();
    },
    async fetchMovements() {
      try {
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/movements', {
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
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/debit_transactions', {
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
        const response = await axios.get('http://ec2-35-171-243-24.compute-1.amazonaws.com:8000/credit_transactions', {
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
</style>