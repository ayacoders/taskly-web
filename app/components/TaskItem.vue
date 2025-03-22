<script setup>
const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:task'])

const toggleStatus = () => {
    emit('update:task', {
        ...props.task,
        status: !props.task.status
    })
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all duration-300 h-full flex flex-col">
        <!-- Header -->
        <div class="p-3 sm:p-4 flex-shrink-0">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <UCheckbox 
                        :model-value="task.status" 
                        @update:model-value="toggleStatus"
                    />
                    <h3 class="text-base sm:text-lg font-medium truncate" :class="{ 'line-through text-gray-400': task.status }">
                        {{ task.title }}
                    </h3>
                </div>
                <span 
                    class="px-2 py-1 text-xs font-medium rounded-full w-fit"
                    :class="{
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': task.priority.toLowerCase() === 'high',
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': task.priority.toLowerCase() === 'medium',
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': task.priority.toLowerCase() === 'low'
                    }"
                >
                    {{ task.priority.toUpperCase() }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-3 sm:p-4 flex-grow">
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-3">{{ task.description }}</p>
        </div>

        <!-- Footer -->
        <div class="p-3 sm:p-4 flex-shrink-0">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Due: {{ new Date(task.due_date).toLocaleString() }}
                </p>
                <div class="flex gap-2">
                    <UButton 
                        color="gray" 
                        variant="soft" 
                        icon="i-heroicons-pencil-square" 
                        size="sm"
                    />
                    <UButton 
                        color="red" 
                        variant="soft" 
                        icon="i-heroicons-trash" 
                        size="sm"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
