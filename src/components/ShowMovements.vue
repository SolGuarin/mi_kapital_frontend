<template>
    <div>
        <b-modal v-model="showModal" title="Movements"></b-modal>
    </div>
</template>

<script>

export default {
    data () {
        return {
            movements: [
                {
                    "id": 2,
                    "account_id": 1,
                    "category_id": 2,
                    "amount": 20000,
                    "note": "Palos de queso y pastel de pollo",
                    "description": "En la cafeteria al frente de la Coogranada, empezó a llover y nos quedamos comiendo ahí sol y yo",
                    "from_account_id": null,
                    "to_account_id": null,
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
                    },
                    "from_account": null
                }
            ]
        }
    }
}
</script>

<style>
</style>