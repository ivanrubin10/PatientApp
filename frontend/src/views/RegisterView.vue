<template>
    <div>
        <h1>Register Patient</h1>
        <form @submit.prevent="submitForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>

            <label for="phone">Phone:</label>
            <input type="text" id="phone" v-model="form.phone" />
            <p v-if="errors.phone" class="error">{{ errors.phone }}</p>

            <label for="documentPhoto">Document Photo:</label>
            <input type="file" id="documentPhoto" @change="handleFileChange" />
            <p v-if="errors.documentPhoto" class="error">{{ errors.documentPhoto }}</p>

            <button type="submit">Submit</button>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>
    </div>
</template>

<script lang="ts">
import axios, { AxiosError } from 'axios';
import { ref } from 'vue';

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    documentPhoto?: string;
}

interface ErrorResponse {
    errors: Record<string, string>;
}

export default {
    setup() {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const form = ref<{
            name: string;
            email: string;
            phone: string;
            documentPhoto: File | null;
        }>({
            name: '',
            email: '',
            phone: '',
            documentPhoto: null,
        });
        const errors = ref<FormErrors>({});
        const successMessage = ref('');

        const handleFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files) {
                form.value.documentPhoto = target.files[0];
            }
        };

        const submitForm = async () => {
            // Clear previous errors and success message
            errors.value = {};
            successMessage.value = '';

            const formData = new FormData();
            formData.append('name', form.value.name);
            if (form.value.email) {
                formData.append('email', form.value.email);
            }
            if (form.value.phone) {
                formData.append('phone', form.value.phone);
            }
            if (form.value.documentPhoto) {
                formData.append('document_photo', form.value.documentPhoto);
            }

            try {
                const response = await axios.post(`${apiUrl}/register`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                successMessage.value = response.data.message;
                // Clear form after successful submission
                form.value = {
                    name: '',
                    email: '',
                    phone: '',
                    documentPhoto: null,
                };
            } catch (error) {
                // More detailed error logging for debugging
                if (error instanceof Error) {
                    console.debug('Error details:', {
                        message: error.message,
                        name: error.name,
                        response: (error as AxiosError<ErrorResponse>).response?.data
                    });
                }

                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response?.status === 400) {
                    // Handle validation errors
                    errors.value = axiosError.response.data.errors;
                } else {
                    // Handle other errors
                    errors.value = { name: 'An error occurred while registering the patient' };
                    // Log the full error for debugging
                    console.error('Unexpected error:', axiosError.response?.data);
                }
            }
        };
        return { form, errors, successMessage, handleFileChange, submitForm };
    },
};
</script>

<style>
.error {
    color: red;
}

.success {
    color: green;
}
</style>