import { ref } from "vue";
const name = ref("");
const email = ref("");
const phone = ref("");
const file = ref(null);
const errorMessage = ref("");
const successMessage = ref("");
const handleFile = (event) => {
    const target = event.target;
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
    }
    catch (error) {
        errorMessage.value = "Failed to register patient. Please try again.";
        console.error(error);
    }
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: ("patient-form") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("name"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("name"),
        value: ((__VLS_ctx.name)),
        required: (true),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("email"),
        id: ("email"),
        required: (true),
    });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("phone"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("phone"),
        value: ((__VLS_ctx.phone)),
        required: (true),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("photo"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
        ...{ onChange: (__VLS_ctx.handleFile) },
        type: ("file"),
        id: ("photo"),
        accept: (".jpg"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
    });
    ['patient-form',];
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
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            name: name,
            email: email,
            phone: phone,
            handleFile: handleFile,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
