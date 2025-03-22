<script setup>
definePageMeta({
    layout: 'default'
})

import { test_data } from '../data/dummy';
import { useTaskFiltersStore } from '../stores/taskFilters'

const tasks = ref(test_data)
const taskFilters = useTaskFiltersStore()

const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
        tasks.value[index] = updatedTask
    }
}

const filteredTasks = computed(() => {
    return taskFilters.filterTasks(tasks.value)
})

</script>

<template>
    <div class="flex flex-col grow-1">
        <section class="container mx-auto px-24 py-4">
            <div class="flex justify-between items-center border-b border-secondary/20 pb-4">
                <div>
                    <h1 class="text-2xl font-semibold">Tasks</h1>
                    <p class="text-sm text-secondary">
                        Manage your tasks seamlessly.
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <UButton 
                        color="gray" 
                        variant="soft" 
                        @click="taskFilters.resetFilters"
                    >
                        Reset Filters
                    </UButton>
                    <UModal 
                        title="Add Task"
                        description="Add a new task to your list"
                    >
                        <UButton>Add Task</UButton>
                        <template #body class="w-full">
                            <TaskForm action="add"/>
                        </template>
                    </UModal>
                </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4 mt-6">
                <div class="flex items-center gap-2">
                    <span class="text-sm text-secondary">Priority:</span>
                    <USelectMenu 
                        v-model="taskFilters.priorityFilter" 
                        :items="taskFilters.priorityOptions"
                        class="w-32"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <span class="text-sm text-secondary">Status:</span>
                    <USelectMenu 
                        v-model="taskFilters.statusFilter" 
                        :items="taskFilters.statusOptions"
                        class="w-32"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <span class="text-sm text-secondary">Due Date:</span>
                    <USelectMenu 
                        v-model="taskFilters.dueDateFilter" 
                        :items="taskFilters.dueDateOptions"
                        class="w-32"
                    />
                </div>
            </div>
        </section>

        <!-- Task List -->
        <div class="container mx-auto px-24 py-4">
            <div v-if="filteredTasks.length === 0" class="text-center py-8 text-secondary">
                No tasks found matching your filters
            </div>
            <div v-else class="flex flex-col gap-4">
                <div v-for="task in filteredTasks" :key="task.id">
                    <TaskItem 
                        :task="task" 
                        @update:task="updateTask"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

