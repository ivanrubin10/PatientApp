<template>
  <div class="patient-card" :class="{ expanded }">
    <div class="card-content">
      <div class="document-preview">
        <img 
          :src="getImageUrl"
          :alt="`${patient.name}'s document`"
          @error="handleImageError"
        />
      </div>
      <h3>{{ patient.name }}</h3>
    </div>

    <div class="button-container">
      <button class="expand-button" :class="{ expanded }" @click.stop="toggleExpand">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <div class="card-details" v-show="expanded">
      <div class="details">
        <p>
          <i class="fa-solid fa-at"></i>
          {{ patient.email }}
        </p>
        <p>
          <i class="fa-solid fa-mobile"></i>
          {{ formatPhone(patient.phone) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Patient {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  document_photo: string;
  isLocal?: boolean;
}

const props = defineProps<{
  patient: Patient
}>();

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const imageError = ref(false);
const expanded = ref(false);

const getImageUrl = computed(() => {
  if (props.patient.isLocal) {
    return props.patient.document_photo;
  }
  return `${apiUrl}/uploads/${props.patient.document_photo}`;
});

const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  
  if (digits.length > 10) {
    const countryCode = digits.slice(0, digits.length - 10);
    const rest = digits.slice(-10);
    return `+${countryCode} (${rest.slice(0,3)}) ${rest.slice(3,6)}-${rest.slice(6)}`;
  }
  
  return phone;
};

const handleImageError = () => {
  imageError.value = true;
};

const toggleExpand = () => {
  expanded.value = !expanded.value;
};
</script>