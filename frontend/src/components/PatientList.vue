<template>
    <div class="patient-list">
        <div class="list-header">
            <div class="header-left">
                <h2>Patient List</h2>
                <span class="patient-count" v-if="!loading">
                    {{ filteredPatients.length }} patients
                </span>
            </div>
            <div class="header-right">
                <div class="search-bar" v-if="filteredPatients.length > 0">
                    <i class="fas fa-search"></i>
                    <input 
                        type="text" 
                        v-model="searchQuery" 
                        placeholder="Search patients..."
                    >
                </div>
                <router-link to="/register" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Add Patient
                </router-link>
            </div>
        </div>

        <div v-if="loading" class="empty-state">
            <div class="empty-state-content">
                <i class="fas fa-spinner fa-spin"></i>
                <h3>Loading patients...</h3>
            </div>
        </div>

        <div v-else>
            <div class="patients-grid">
                <div v-if="showDemoCard" class="patient-card demo-card">
                    <div class="demo-badge">
                        <i class="fas fa-star"></i>
                        Demo
                    </div>

                    <div class="card-content">
                        <div class="document-preview">
                            <img 
                                src="../assets/SampleID.jpg"
                                alt="Demo patient document"
                            />
                        </div>
                        <h3>John Doe (Demo)</h3>
                    </div>

                    <div class="button-container">
                        <button class="expand-button" :class="{ expanded: demoExpanded }" @click.stop="toggleDemoExpand">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>

                    <div class="card-details" v-show="demoExpanded">
                        <div class="details">
                            <p>
                                <i class="fa-solid fa-at"></i>
                                john.doe@example.com
                            </p>
                            <p>
                                <i class="fa-solid fa-mobile"></i>
                                (555) 123-4567
                            </p>
                        </div>
                    </div>

                    <button class="remove-demo" @click.stop="removeDemoCard">
                        <i class="fas fa-times"></i>
                        Remove Demo
                    </button>
                </div>

                <PatientCard 
                    v-for="patient in filteredPatients" 
                    :key="patient.id" 
                    :patient="patient"
                />
            </div>

            <div v-if="filteredPatients.length === 0 && !showDemoCard" class="empty-state">
                <div class="empty-state-content">
                    <i class="fas fa-users-slash"></i>
                    <h3>No patients found</h3>
                    <p v-if="searchQuery">
                        No results for "{{ searchQuery }}". Try a different search.
                    </p>
                    <p v-else>
                        Get started by adding your first patient.
                    </p>
                    <router-link to="/register" class="btn btn-primary">
                        <i class="fas fa-user-plus"></i>
                        Register New Patient
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import PatientCard from './PatientCard.vue';

interface Patient {
    id?: number | string;
    name: string;
    email: string;
    phone: string;
    document_photo: string;
    isLocal?: boolean;
}

const patients = ref<Patient[]>([]);
const localPatients = ref<Patient[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const searchQuery = ref('');
const showDemoCard = ref(true);
const demoExpanded = ref(false);

const fetchPatients = async () => {
    try {
        const response = await axios.get(`${apiUrl}/patients`);
        patients.value = response.data;

        const storedPatients = localStorage.getItem('patients');
        if (storedPatients) {
            localPatients.value = JSON.parse(storedPatients);
        }

        loading.value = false;
    } catch (err) {
        error.value = 'Error fetching patients';
        loading.value = false;
        console.error('Error fetching patients:', err);
    }
};

onMounted(fetchPatients);

const allPatients = computed(() => {
    return [
        ...patients.value,
        ...localPatients.value.map((p, index) => ({
            ...p,
            id: `local_${index}`
        }))
    ];
});

const filteredPatients = computed(() => {
    return allPatients.value.filter(patient => {
        return patient.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const toggleDemoExpand = () => {
    demoExpanded.value = !demoExpanded.value;
};

const removeDemoCard = () => {
    showDemoCard.value = false;
};
</script>

<style scoped>
.patient-list {
    /* margin removed - inside main */
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--border-color);
}

.header-left {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-md);
}

.patient-count {
    color: var(--text-light);
    font-size: var(--font-size-sm);
}

.header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

h2 {
    font-family: var(--font-heading);
    font-size: var(--font-size-2xl);
    color: var(--text-color);
    margin: 0;
    font-weight: 600;
}

.search-bar {
    position: relative;
    width: 300px;
}

.search-bar i {
    position: absolute;
    left: var(--spacing-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-lighter);
}

.search-bar input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-xl);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base);
    transition: all 0.3s ease;
    color: var(--text-color);
    background-color: white;
}

.search-bar input:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.search-bar input::placeholder {
    color: var(--text-lighter);
}

.patients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.empty-state {
    padding: var(--spacing-xl) 0;
    text-align: center;
}

.empty-state-content {
    max-width: 400px;
    margin: 0 auto;
}

.empty-state i {
    font-size: 3rem;
    color: var(--text-lighter);
    margin-bottom: var(--spacing-md);
}

.empty-state h3 {
    color: var(--text-color);
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-sm);
}

.empty-state p {
    color: var(--text-light);
    margin-bottom: var(--spacing-lg);
}

.empty-state.error i {
    color: var(--error-color);
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--gradient-primary);
    color: white;
    border-radius: var(--border-radius-md);
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn-primary i {
    font-size: var(--font-size-base);
}

@media (max-width: 768px) {
    .list-header {
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .header-right {
        width: 100%;
        flex-direction: column;
    }

    .search-bar {
        width: 100%;
    }

    .btn-primary {
        width: 100%;
        justify-content: center;
    }
}

.demo-card {
    border: 2px solid var(--primary-color);
    background: linear-gradient(to right bottom, var(--surface-color), rgba(37, 99, 235, 0.05));
}

.demo-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--primary-color);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    box-shadow: var(--shadow-sm);
    z-index: 1;
}

.demo-badge i {
    font-size: var(--font-size-sm);
    color: #FFD700;
}

.remove-demo {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--error-color);
    color: white;
    border: none;
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transition: all 0.3s ease;
    opacity: 0;
    z-index: 1;
}

.demo-card:hover .remove-demo {
    opacity: 1;
}

.remove-demo:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
    background: #c62828;
}
</style> 