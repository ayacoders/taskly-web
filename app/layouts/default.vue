<template>
	<div class="min-h-screen bg-primary flex flex-col">

		<HeaderSection :is-dashboard="isDashboard" />

		<main v-if="isDashboard" class="container mx-auto px-4 py-8 grow-1">
			<slot />
		</main>

		<main v-else class="container mx-auto px-4 py-8 grow-1 grid place-items-center">
			<slot />
		</main>

	</div>
</template>

<script setup>
import { useRoute } from 'nuxt/app'

const route = useRoute()
const isDashboard = computed(() => route.path === '/dashboard')

</script>
