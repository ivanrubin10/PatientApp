<template>
    <div class="patient-list">
        <h2>Registered Patients</h2>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <table v-if="patients.length">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Document</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in patients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.email }}</td>
                        <td>{{ patient.phone }}</td>
                        <td>{{ patient.document_photo }}</td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No patients registered yet.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Patient {
    id: number;
    name: string;
    email: string;
    phone: string;
    document_photo: string;
}

export default {
    name: 'PatientList',
    setup() {
        const patients = ref<Patient[]>([]);
        const loading = ref(true);
        const error = ref<string | null>(null);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${apiUrl}/patients`);
                patients.value = response.data;
                loading.value = false;
            } catch (err) {
                error.value = 'Error fetching patients';
                loading.value = false;
                console.error('Error fetching patients:', err);
            }
        };

        onMounted(fetchPatients);

        return {
            patients,
            loading,
            error
        };
    }
};
</script>

<style scoped>
.patient-list {
    margin: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f5f5f5;
    font-weight: bold;
}

tr:hover {
    background-color: #f9f9f9;
}

.error {
    color: red;
    margin-top: 20px;
}
</style> 