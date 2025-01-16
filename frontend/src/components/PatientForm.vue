<template>
    <form @submit.prevent="handleSubmit" class="patient-form">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required />
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
        </div>
        <div>
            <label for="phone">Phone</label>
            <input type="text" id="phone" v-model="phone" required />
        </div>
        <div>
            <label for="photo">Document Photo</label>
            <input type="file" id="photo" @change="handleFile" accept=".jpg" />
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const phone = ref("");
const file = ref<File | null>(null);
const errorMessage = ref("");
const successMessage = ref("");

const handleFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    file.value = target.files ? target.files[0] : null;
};

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  
  if (!name.value || !email.value || !phone.value || !file.value) {
    errorMessage.value = "All fields are required.";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("photo", file.value);

    const response = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || "Something went wrong.";
      return;
    }

    successMessage.value = "Patient registered successfully!";
    name.value = email.value = phone.value = "";
    file.value = null;
  } catch (error) {
    errorMessage.value = "Failed to register patient. Please try again.";
    console.error(error);
  }
};
</script>

<style scoped>
</style>