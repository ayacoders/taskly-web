<template>
	<div class="min-h-screen bg-primary flex flex-col">
		<header class="border-b border-secondary/20">
			<div class="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 class="text-xl font-semibold">TaSKly</h1>
				<span class="flex items-center gap-2">
					<ColorModeToggle class="hover:cursor-pointer"/>
					<ProfileToggle v-if="isDashboard" class="hover:cursor-pointer"/>
				</span>
			</div>
		</header>

		<main class="container mx-auto px-4 py-8 grow-1 flex flex-col">

			<section v-if="isDashboard" class="container mx-auto px-24 py-4">
				<div class="flex justify-between items-center border-b border-secondary/20 pb-4">
					<div>
						<h1 class="text-2xl font-semibold">Tasks</h1>
						<p class="text-sm text-secondary">
							Manage your tasks seamlessly.
						</p>
					</div>

					<UModal 
						title="Add Task"
						description="Add a new task to your list"
					>
						<UButton>Add Task</UButton>

						<template #body class="w-full">
							<TaskForm action="add"/>
						</template>
					</UModal>

					
					<!-- <BaseModal title="Add Task" description="Add a new task to your list" isOpen=true>
						
						<UButton>Add Task</UButton>
						<TaskForm action="add"/>
						
					</BaseModal> -->

				</div>
			</section>

			<div class="container mx-auto px-24 py-4 grow-1">
				<slot />
			</div>

		</main>

	</div>
</template>

<script setup>
import {useRoute} from 'nuxt/app'

const route = useRoute()
const isDashboard = computed(() => route.path === '/dashboard')

</script>
