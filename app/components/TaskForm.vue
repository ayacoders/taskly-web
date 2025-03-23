<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
const config = useRuntimeConfig()
const token = ref(null)

const props = defineProps({
    action: {
        type: String,
        required: true,
    },
    task: {
        type: Object,
        required: false,
    },
})

const emit = defineEmits(['submit'])

const toast = useToast()
const priorityItems = ref(['Low', 'Medium', 'High'])

const state = reactive({
    title: '',
    description: '',
    due_date: '',
    priority: '',
})

if (props.task) {
    state.title = props.task.title
    state.description = props.task.description
    state.due_date = props.task.due_date
    state.priority = props.task.priority
}


const handleSubmit = async (token) => {
    try {
        token.value = localStorage.getItem('token') || ''
        const taskValidated = taskSchema.parse(state)
        let method = "post"
        let url = "/api/tasks"

        if (props.action !== "add") {
            method = 'put'
            url = `/api/tasks/${props.task.id}`
            console.log("id: ", props.task.id)
        } 

        const { data } = useFetch(`${config.public.apiBase}${url}`, {
            method,
            body: JSON.stringify({
                ...taskValidated, 
                priority: taskValidated.priority.toLowerCase()
            }),
            headers: {
                Authorization: `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            }
        });

        if(data.error) {
            toast.add({
                title: `${props.action === 'add' ? 'Create' : 'Update'} task failed`,
                description: `Failed to ${props.action === 'add' ? 'create' : 'update'} task`,
                color: 'error',
            })
        } 
        
        if(props.action === 'add'){
            console.log("data", JSON.stringify(data.value, null, 2))
            taskStore.addTask({
                ...state, 
                id: data.value.id
            })
        } else {
            taskStore.updateTask(
                {   
                    ...state, 
                    id: props.task.id
                }
            )
        }
        
        toast.add({
            title: 'Success',
            description: `Task ${props.action === 'add' ? 'created' : 'updated'} successfully`,
            color: 'success',
        })

        if(props.action === 'add'){
            emit('submit')
        }
        
        Object.assign(state, {
            title: '',
            description: '',
            due_date: '',
            priority: '',
        })
    } catch (error) {
        console.error(error)
        toast.add({
            title: 'Error',
            description: error.message,
            color: 'error',
        })
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


