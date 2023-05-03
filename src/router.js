import Vue from "vue";
import VueRouter from "vue-router";
import AddTransactionForm from './components/AddTransactionForm.vue'


Vue.use(VueRouter);
const routes = [
    {
    path: '/add-transaction-form',
    component: AddTransactionForm
    },
];
        
  const router = new VueRouter({
    mode: "history",
    routes,
  });
  
  export default router;
