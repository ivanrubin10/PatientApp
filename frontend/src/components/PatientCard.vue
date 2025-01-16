<template>
    <div class="patient-card">
        <img :src="photo" alt="Patient document" />
        <h3>{{ name }}</h3>
        <button @click="toggleDetails">Toggle Details</button>
        <div v-if="showDetails">
            <p>Email: {{ email }}</p>
            <p>Phone: {{ phone }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
    name: String,
    email: String,
    phone: String,
    photo: String,
});

const showDetails = ref(false);

const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};
</script>

<style scoped></style>