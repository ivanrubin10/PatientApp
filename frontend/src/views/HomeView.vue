<template>
    <div class="home">
        <h1>Patient Management System</h1>
        <PatientList />
    </div>
</template>

<script lang="ts">
import PatientList from '../components/PatientList.vue';

export default {
    name: 'HomeView',
    components: {
        PatientList
    }
};
</script>

<style scoped>
.home {
    padding: 20px;
}

h1 {
    margin-bottom: 30px;
}
</style>