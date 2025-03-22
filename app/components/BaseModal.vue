<!-- This component aint working -->

<template>
    <UModal v-model="isOpen"
        :title="title"
        :description="description"
        :overlay=true
    >
        <!-- ????? -->
        <!-- <template #body>
            <slot />
        </template> -->

        <slot />
    </UModal>
</template>

<script setup>
const isOpen = ref(false)

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

</script>
