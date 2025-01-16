<template>
  <div class="home">
    <header class="header">
      <h1>Patient Management System</h1>
      <p class="subtitle">Manage your patients efficiently and securely</p>
    </header>
    <main class="main-content">
      <PatientList />
    </main>
  </div>
</template>

<script setup lang="ts">
import PatientList from '../components/PatientList.vue';
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.95);
  margin-top: var(--spacing-sm);
}

.main-content {
  background: var(--surface-color);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .home {
    padding: var(--spacing-md);
  }

  .header {
    padding: var(--spacing-lg);
  }

  h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>