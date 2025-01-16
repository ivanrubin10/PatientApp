<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <i class="fas fa-hospital-user"></i>
        <span>Patient Manager</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <i class="fas fa-home"></i>
          Home
        </router-link>
        <router-link to="/register" class="nav-link">
          <i class="fas fa-user-plus"></i>
          Register Patient
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  background-color: var(--navbar-bg);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
}

.logo i {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: var(--navbar-hover);
  color: var(--primary-color);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style> 