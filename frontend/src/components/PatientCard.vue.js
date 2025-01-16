import { ref } from "vue";
const __VLS_props = defineProps({
    name: String,
    email: String,
    phone: String,
    photo: String,
});
const showDetails = ref(false);
const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("patient-card") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ((__VLS_ctx.photo)),
        alt: ("Patient document"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.toggleDetails) },
    });
    if (__VLS_ctx.showDetails) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.phone);
    }
    ['patient-card',];
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
            showDetails: showDetails,
            toggleDetails: toggleDetails,
        };
    },
    props: {
        name: String,
        email: String,
        phone: String,
        photo: String,
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        name: String,
        email: String,
        phone: String,
        photo: String,
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
