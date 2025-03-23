<script setup>
const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:task'])
const taskStore = useTaskStore()
const config = useRuntimeConfig()
const toast = useToast()
const token = ref("");

if (process.client) {
    token.value = localStorage.getItem('token')
}

const toggleStatus = () => {
    const { data } = useFetch(`${config.public.apiBase}/api/tasks/${props.task.id}`, {
            method: 'put',
            body: JSON.stringify({
                ...props.task, 
                status: !props.task.status,
                priority: props.task.priority.toLowerCase()
            }),
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            }
    });

    emit('update:task', {
        ...props.task,
        status: !props.task.status
    })
}

const handleDelete = () => {

    const { data } = useFetch(`${config.public.apiBase}/api/tasks/${props.task.id}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json'
        }
    });

    if(data.error) {
        toast.add({
            title: `Delete task failed`,
            description: `Failed to Delete task`,
            color: 'error',
        })
    } 

    taskStore.deleteTask(props.task.id)

    toast.add({
        title: 'Success',
        description: `Task Deleted successfully`,
        color: 'success',
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
                    Due: {{ new Date(task.due_date).toLocaleString('en-US', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }) }}
                </p>
                <div class="flex gap-2">
                    <UModal 
                        title="Update Task"
                        description="Update your task"
                    >
                        <UButton 
                            color="gray" 
                            variant="soft" 
                            icon="i-heroicons-pencil-square" 
                            size="sm"
                        />
                        
                        <template #body>
                            <TaskForm action="update" :task="props.task" />
                        </template>
                    </UModal>

                    <UButton 
                        @click="handleDelete"
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
