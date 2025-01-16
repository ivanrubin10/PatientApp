import axios from 'axios';
import { ref } from 'vue';
export default (await import('vue')).defineComponent({
    setup() {
        const apiUrl = import.meta.env.VITE_API_URL;
        const form = ref({
            name: '',
            email: '',
            phone: '',
            documentPhoto: null,
        });
        const errors = ref({});
        const successMessage = ref('');
        const handleFileChange = (event) => {
            const target = event.target;
            if (target.files) {
                form.value.documentPhoto = target.files[0];
            }
        };
        const submitForm = async () => {
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
                const response = await axios.post(`${apiUrl}/register`, formData);
                successMessage.value = response.data.message;
            }
            catch (error) {
                const axiosError = error;
                errors.value = axiosError.response?.data.errors || { general: 'Error submitting form' };
            }
        };
        return { form, errors, successMessage, handleFileChange, submitForm };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.submitForm) },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("name"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("name"),
        value: ((__VLS_ctx.form.name)),
    });
    if (__VLS_ctx.errors.name) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("error") },
        });
        (__VLS_ctx.errors.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("email"),
        id: ("email"),
    });
    (__VLS_ctx.form.email);
    if (__VLS_ctx.errors.email) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("error") },
        });
        (__VLS_ctx.errors.email);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("phone"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("phone"),
        value: ((__VLS_ctx.form.phone)),
    });
    if (__VLS_ctx.errors.phone) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("error") },
        });
        (__VLS_ctx.errors.phone);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("documentPhoto"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleFileChange) },
        type: ("file"),
        id: ("documentPhoto"),
    });
    if (__VLS_ctx.errors.documentPhoto) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("error") },
        });
        (__VLS_ctx.errors.documentPhoto);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
    });
    if (__VLS_ctx.successMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("success") },
        });
        (__VLS_ctx.successMessage);
    }
    ['error', 'error', 'error', 'error', 'success',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
