<script setup>
definePageMeta({
    layout: 'default'
})

import { test_data } from '../data/dummy';
import { useTaskFiltersStore } from '../stores/taskFilters'

const tasks = ref(test_data)
const taskFilters = useTaskFiltersStore()
const isMasonryLayout = ref(false)

const updateTask = (updatedTask) => {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
        tasks.value[index] = updatedTask
    }
}

const filteredTasks = computed(() => {
    return taskFilters.filterTasks(tasks.value)
})

const toggleLayout = () => {
    isMasonryLayout.value = !isMasonryLayout.value
}
</script>

<template>
    <div class="flex flex-col grow-1">
        <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-secondary/20 pb-4 gap-4">
                <div>
                    <h1 class="text-2xl font-semibold">Tasks</h1>
                    <p class="text-sm text-secondary">
                        Manage your tasks seamlessly.
                    </p>
                </div>
                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <UButton  
                        variant="soft" 
                        :icon="isMasonryLayout ? 'i-heroicons-squares-2x2' : 'i-heroicons-bars-3'"
                        @click="toggleLayout"
                    >
                        {{ isMasonryLayout ? 'List View' : 'Grid View' }}
                    </UButton>
                    <UButton 
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
                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <span class="text-sm text-secondary whitespace-nowrap">Priority:</span>
                    <USelectMenu 
                        v-model="taskFilters.priorityFilter" 
                        :items="taskFilters.priorityOptions"
                        class="w-full sm:w-32"
                    />
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <span class="text-sm text-secondary whitespace-nowrap">Status:</span>
                    <USelectMenu 
                        v-model="taskFilters.statusFilter" 
                        :items="taskFilters.statusOptions"
                        class="w-full sm:w-32"
                    />
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <span class="text-sm text-secondary whitespace-nowrap">Due Date:</span>
                    <USelectMenu 
                        v-model="taskFilters.dueDateFilter" 
                        :items="taskFilters.dueDateOptions"
                        class="w-full sm:w-32"
                    />
                </div>
            </div>
        </section>

        <!-- Task List -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div v-if="filteredTasks.length === 0" class="text-center py-8 text-secondary">
                No tasks found matching your filters
            </div>
            <div v-else 
                :class="[
                    isMasonryLayout ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-start' : 'flex flex-col gap-4'
                ]"
            >
                <div v-for="task in filteredTasks" 
                    :key="task.id"
                    class="task-item h-full"
                >
                    <TaskItem 
                        :task="task" 
                        @update:task="updateTask"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.task-item {
    transition: all 0.3s ease;
    height: 100%;
}

.task-item:hover {
    transform: translateX(4px);
}

/* Fade in animation for empty state */
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Task list transitions */
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.3s ease;
}

.task-list-enter-from,
.task-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>

