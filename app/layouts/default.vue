<template>
	<div class="min-h-screen bg-primary flex flex-col">
		<header class="border-b border-secondary/20">
			<div class="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 class="text-xl font-semibold">TaSKly</h1>
				<ColorModeToggle />
			</div>
		</header>
		<main class="container mx-auto px-4 py-8 grid place-content-center grow-1">
			<slot />
		</main>
	</div>
</template>

<script setup>
// The layout will automatically handle color mode transitions
</script>
