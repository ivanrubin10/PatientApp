import { ref } from "vue";
import PatientForm from "./components/PatientForm.vue";
import PatientCard from "./components/PatientCard.vue";
const patients = ref([]);
const addPatient = (newPatient) => {
    patients.value.push(newPatient);
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    // @ts-ignore
    /** @type { [typeof PatientForm, ] } */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PatientForm, new PatientForm({
        ...{ 'onFormSubmit': {} },
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onFormSubmit': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_5;
    const __VLS_6 = {
        onFormSubmit: (__VLS_ctx.addPatient)
    };
    let __VLS_2;
    let __VLS_3;
    var __VLS_4;
    for (const [patient] of __VLS_getVForSourceType((__VLS_ctx.patients))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((patient.id)),
        });
        // @ts-ignore
        /** @type { [typeof PatientCard, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(PatientCard, new PatientCard({
            name: ((patient.name)),
            email: ((patient.email)),
            phone: ((patient.phone)),
            photo: ((patient.photo)),
        }));
        const __VLS_8 = __VLS_7({
            name: ((patient.name)),
            email: ((patient.email)),
            phone: ((patient.phone)),
            photo: ((patient.photo)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
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
            PatientForm: PatientForm,
            PatientCard: PatientCard,
            patients: patients,
            addPatient: addPatient,
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
