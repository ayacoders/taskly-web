<script setup>
import { ColorModeToggle, ProfileToggle } from '#components'

defineProps({
    isDashboard: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <header class="border-b border-secondary/20">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 @click="navigateTo('/dashboard')" class="text-xl font-semibold">TaSKly</h1>
            <span class="flex items-center gap-2">
                <ColorModeToggle class="hover:cursor-pointer"/>
                <ProfileToggle v-if="isDashboard" class="hover:cursor-pointer"/>
            </span>
        </div>
    </header>
</template>
