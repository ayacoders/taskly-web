<script setup>

defineProps({
    action: {
        type: String,
        required: true,
    },
    task: {
        type: Object,
        required: false,
    },
})

const toast = useToast()

const priorityItems = ref(['Low', 'Medium', 'High'])

const state = reactive({
    title: '',
    description: '',
    due_date: '',
    priority: '',
})


const handleSubmit = () => {
    try {
        taskSchema.parse(state);

        toast.add({
            title: 'Success',
            description: 'Task created successfully',
            color: 'success',
        })
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <UForm :schema="taskSchema" :state="state" @submit="handleSubmit" class="w-full space-y-4">

        <UFormField label="Title" name="title" class="w-full">
            <UInput v-model="state.title" class="w-full" />
        </UFormField>

        <UFormField label="Description" name="description" class="w-full">
            <UTextarea v-model="state.description" class="w-full" />
        </UFormField>

        <UFormField label="Due Date" name="due_date" class="w-full">
            <UInput v-model="state.due_date" type="datetime-local" class="w-full" />
        </UFormField>

        <UFormField label="Priority" name="priority" class="w-full">
            <USelect 
                v-model="state.priority" 
                :items="priorityItems" 
                class="w-full"
            />
        </UFormField>

        <div class="flex justify-end">
            <UButton type="submit">
                {{ action === 'add' ? 'Add Task' : 'Save Changes' }}
            </UButton>
        </div>
    </UForm>
</template>


