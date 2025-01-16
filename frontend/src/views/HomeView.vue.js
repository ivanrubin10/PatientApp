import { ref, onMounted } from 'vue';
import axios from 'axios';
export default (await import('vue')).defineComponent({
    setup() {
        const patients = ref([]);
        const expandedPatient = ref(null);
        const apiUrl = import.meta.env.VITE_API_URL;
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${apiUrl}/patients`);
                patients.value = response.data;
            }
            catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        const toggleDetails = (patient) => {
            expandedPatient.value = expandedPatient.value && expandedPatient.value.id === patient.id ? null : patient;
        };
        onMounted(() => {
            fetchPatients();
        });
        return { patients, expandedPatient, toggleDetails, apiUrl };
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
    if (__VLS_ctx.patients.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
    for (const [patient] of __VLS_getVForSourceType((__VLS_ctx.patients))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((patient.id)),
            ...{ class: ("card") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (patient.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((`${__VLS_ctx.apiUrl}/uploads/${patient.documentPhoto}`)),
            alt: ("Document Photo"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleDetails(patient);
                } },
        });
        if (__VLS_ctx.expandedPatient && __VLS_ctx.expandedPatient.id === patient.id) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (patient.email);
        }
    }
    ['card',];
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
