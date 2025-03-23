<template>
    <UDropdownMenu arrow :items="items">
        <UButton variant="primary" icon="i-heroicons-user" class="hover:cursor-pointer"/> 
    </UDropdownMenu>
</template>

<script setup>

const config = useRuntimeConfig()
const token = ref("");

const items = ref([
    {
        label: 'Logout',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        to: '/login',
        onSelect(e){
            e.preventDefault()
            handleLogout()
        }
    },
    {
        label: 'Reset Password',
        icon: 'i-heroicons-arrow-path',
        to: '/dashboard/reset'
    }
])

if (process.client) {
    token.value = localStorage.getItem('token')
}

const handleLogout = () => {
    localStorage.removeItem('token')
    const { data } = useFetch(`${config.public.apiBase}/api/logout`, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        }
    });
}
</script>
