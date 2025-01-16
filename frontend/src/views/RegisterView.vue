<template>
  <div class="register-container">
    <div class="register-card">
      <header class="register-header">
        <h1>Register New Patient</h1>
        <p class="subtitle">Enter patient information below</p>
      </header>

      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-group" :class="{ 'error': errors.name }">
          <label for="name">Full Name</label>
          <input 
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Enter patient's full name"
            @input="validateField('name')"
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group" :class="{ 'error': errors.email }">
          <label for="email">Gmail Address</label>
          <input 
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Enter Gmail address"
            @input="validateField('email')"
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group phone-group" :class="{ 'error': errors.phone }">
          <label for="phone">Phone Number</label>
          <div class="phone-inputs">
            <input 
              id="countryCode"
              v-model="formData.countryCode"
              type="text"
              placeholder="+1"
              class="country-code"
              @input="validateField('phone')"
            >
            <input 
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              class="phone-number"
              @input="validateField('phone')"
            >
          </div>
          <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
        </div>

        <div class="form-group" :class="{ 'error': errors.document }">
          <label for="document">Document Photo (JPG only)</label>
          <div 
            class="file-upload"
            @drop.prevent="handleFileDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            :class="{ 'dragging': dragOver, 'has-file': fileName }"
          >
            <input 
              id="document"
              type="file"
              @change="handleFileChange"
              accept=".jpg,.jpeg"
              class="file-input"
            >
            <div class="file-label">
              <i class="fas fa-cloud-upload-alt"></i>
              <span>{{ fileName || 'Drag & drop or click to upload' }}</span>
            </div>
          </div>
          <span class="error-message" v-if="errors.document">{{ errors.document }}</span>
        </div>

        <div class="form-actions">
          <router-link to="/" class="btn btn-secondary">Cancel</router-link>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i> Registering...
            </span>
            <span v-else>Register Patient</span>
          </button>
        </div>
      </form>

      <div v-if="Object.keys(errors).length > 0" class="alert error">
        <ul>
          <li v-for="(error, field) in errors" :key="field">
            {{ error }}
          </li>
        </ul>
      </div>

      <div v-if="successMessage" class="alert success">
        {{ successMessage }}
      </div>
    </div>
  </div>

  <!-- Status Modal -->
  <Transition name="fade">
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div :class="['modal-content', modalType]">
          <i :class="modalIcon"></i>
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <ul v-if="modalType === 'error' && Object.keys(errors).length > 1">
            <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
          </ul>
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  countryCode: '',
  phoneNumber: ''
});

const errors = ref<Record<string, string>>({});
const successMessage = ref('');
const selectedFile = ref<File | null>(null);
const isSubmitting = ref(false);
const fileName = ref('');
const dragOver = ref(false);
const showModal = ref(false);
const modalType = ref<'success' | 'error'>('success');

const closeModal = () => {
    showModal.value = false;
};

const validateName = (name: string) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

const validateEmail = (email: string) => {
  return email.endsWith('@gmail.com');
};

const validatePhone = () => {
  const codeRegex = /^\+\d{1,3}$/;
  const numberRegex = /^\d{10}$/;
  return codeRegex.test(formData.value.countryCode) && 
         numberRegex.test(formData.value.phoneNumber);
};

const validationErrors = computed(() => {
  const errors: Record<string, string> = {};
  
  if (!formData.value.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.value.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.value.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.value.email)) {
    errors.email = 'Please enter a valid email (only @gmail.com allowed)';
  }

  if (!formData.value.countryCode.trim()) {
    errors.countryCode = 'Country code is required';
  } else if (!validatePhone()) {
    errors.countryCode = 'Please enter a valid country code';
  }

  if (!formData.value.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validatePhone()) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  if (!selectedFile.value) {
    errors.document = 'Document photo is required';
  } else {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.value.size > maxSize) {
      errors.document = 'File size must be less than 5MB';
    }
    if (!selectedFile.value.type.startsWith('image/')) {
      errors.document = 'File must be an image';
    }
  }

  if (!validateName(formData.value.name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  return errors;
});

const isValid = computed(() => Object.keys(validationErrors.value).length === 0);

const isJpgImage = (file: File): boolean => {
  return file.type === 'image/jpeg' || file.type === 'image/jpg';
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (isJpgImage(file)) {
      selectedFile.value = file;
      fileName.value = file.name;
      delete errors.value.document;
    } else {
      selectedFile.value = null;
      fileName.value = '';
      errors.value.document = 'Only JPG files are allowed';
      // Reset input
      (event.target as HTMLInputElement).value = '';
    }
  }
};

const handleFileDrop = (event: DragEvent) => {
  dragOver.value = false;
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    const file = files[0];
    if (isJpgImage(file)) {
      selectedFile.value = file;
      fileName.value = file.name;
      delete errors.value.document;
    } else {
      selectedFile.value = null;
      fileName.value = '';
      errors.value.document = 'Only JPG files are allowed';
    }
  }
};

interface Patient {
  name: string;
  email: string;
  phone: string;
  document_photo: string;
}

const saveToLocalStorage = async (patient: Omit<Patient, 'document_photo'> & { document_photo: File }) => {
  // Convert image to data URL before saving
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(patient.document_photo);
  });

  const patients = JSON.parse(localStorage.getItem('patients') || '[]') as Patient[];
  patients.push({
    ...patient,
    document_photo: dataUrl
  });
  localStorage.setItem('patients', JSON.stringify(patients));
};

const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {};
  
  // Check validation before submitting
  if (!isValid.value) {
    errors.value = validationErrors.value;
    return;
  }

  try {
    isSubmitting.value = true;
    const form = new FormData();
    form.append('name', formData.value.name);
    form.append('email', formData.value.email);
    form.append('phone', `${formData.value.countryCode}${formData.value.phoneNumber}`);
    
    if (selectedFile.value) {
      form.append('document_photo', selectedFile.value);
      
      await saveToLocalStorage({
        name: formData.value.name,
        email: formData.value.email,
        phone: `${formData.value.countryCode}${formData.value.phoneNumber}`,
        document_photo: selectedFile.value
      });
    }

    const response = await axios.post(`${apiUrl}/register`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    successMessage.value = response.data.message || 'Patient registered successfully!';
    formData.value = {
      name: '',
      email: '',
      countryCode: '',
      phoneNumber: ''
    };
    selectedFile.value = null;
    
    setTimeout(() => {
      router.push('/');
    }, 2000);

    showSuccessModal();

  } catch (error) {
    const axiosError = error as AxiosError<{errors: Record<string, string>}>;
    if (axiosError.response?.data?.errors) {
      errors.value = axiosError.response.data.errors;
    } else {
      errors.value = { general: 'An error occurred while registering the patient' };
    }
    // Don't clear errors when showing modal
    showErrorModal();
  } finally {
    isSubmitting.value = false;
  }
};

const validateField = (field: string) => {
  const fieldErrors = validationErrors.value[field];
  if (fieldErrors) {
    errors.value[field] = fieldErrors;
  } else {
    delete errors.value[field];
  }
};

const modalIcon = computed(() => modalType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle');
const modalTitle = computed(() => modalType.value === 'success' ? 'Success!' : 'Error');
const modalMessage = computed(() => modalType.value === 'success' ? 'Patient registered successfully!' : 'Failed to register patient');

const showSuccessModal = () => {
    modalType.value = 'success';
    showModal.value = true;
};

const showErrorModal = () => {
    modalType.value = 'error';
    showModal.value = true;
};

defineExpose({
  formData,
  errors,
  successMessage,
  selectedFile,
  isSubmitting,
  fileName,
  dragOver,
  showModal,
  modalType,
  modalIcon,
  modalTitle,
  modalMessage,
  isValid,
  validationErrors,
  handleSubmit,
  handleFileChange,
  handleFileDrop,
  validateField,
  validateName,
  validateEmail,
  validatePhone,
  closeModal,
  showSuccessModal,
  showErrorModal,
  saveToLocalStorage
});
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  padding: calc(var(--spacing-xl) * 2) var(--spacing-xl);
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.register-card {
  width: 100%;
  max-width: 600px;
  background: var(--surface-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.register-header {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-xl);
  text-align: center;
}

.register-header h1 {
  font-family: var(--font-heading);
  font-size: 2rem;
  margin-bottom: var(--spacing-xs);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.register-form {
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
  background: var(--surface-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--text-color);
  font-weight: 500;
  font-size: var(--font-size-base);
}

input {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  color: var(--text-color);
  background-color: white;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.file-upload {
  position: relative;
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all 0.3s ease;
}

.file-upload:hover {
  border-color: var(--secondary-color);
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-light);
  transition: all 0.3s ease;
}

.file-label.has-file {
  color: var(--primary-color);
}

.file-label.has-file i {
  color: var(--primary-color);
}

.file-label i {
  font-size: 2rem;
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

.form-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.btn {
  flex: 1;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary {
  background-color: var(--background-color);
  color: var(--text-color);
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  margin: 0 var(--spacing-xl) var(--spacing-xl);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  text-align: left;
}

.alert.success {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--success-color);
  border: 1px solid var(--success-color);
}

.alert.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

.alert ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alert li {
  margin-bottom: var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.alert li:before {
  content: "•";
  color: currentColor;
}

.alert li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .register-container {
    padding: var(--spacing-md);
  }

  .form-actions {
    flex-direction: column;
  }
}

.error-message {
  color: var(--error-color);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
  animation: slideDown 0.3s ease;
}

.phone-inputs {
  display: flex;
  gap: var(--spacing-sm);
}

.country-code {
  width: 80px;
}

.phone-number {
  flex: 1;
}

.file-upload.dragging {
  border-color: var(--primary-color);
  background-color: rgba(37, 99, 235, 0.05);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s ease;
}

/* Animations */
@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>