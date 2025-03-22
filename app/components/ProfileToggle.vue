<template>
    <UDropdownMenu :items="items">
        <UButton variant="primary" icon="i-heroicons-user" class="hover:cursor-pointer"/>
    </UDropdownMenu>
</template>

<script setup>
const items = [
    {
        label: 'Logout',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        to: '/login' // TODO: Add logout route
    },
    {
        label: 'Reset Password',
        icon: 'i-heroicons-arrow-path',
        to: '/reset'
    }
]
</script>
