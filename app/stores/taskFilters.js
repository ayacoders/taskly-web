import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskFiltersStore = defineStore('taskFilters', () => {
    // Filter states
    const priorityFilter = ref('All')
    const statusFilter = ref('All')
    const dueDateFilter = ref('All')

    // Filter options
    const priorityOptions = ref(['All', 'High', 'Medium', 'Low'])
    const statusOptions = ref(['All', 'Completed', 'Pending'])
    const dueDateOptions = ref(['All', 'Today', 'This Week', 'This Month', 'Overdue'])

    // Actions
    function setPriorityFilter(value) {
        priorityFilter.value = value
    }

    function setStatusFilter(value) {
        statusFilter.value = value
    }

    function setDueDateFilter(value) {
        dueDateFilter.value = value
    }

    function resetFilters() {
        priorityFilter.value = 'All'
        statusFilter.value = 'All'
        dueDateFilter.value = 'All'
    }

    // Computed
    function filterTasks(tasks) {
        return tasks.filter(task => {
            // Priority filter
            const priorityMatch = priorityFilter.value === 'All' || 
                task.priority.toLowerCase() === priorityFilter.value.toLowerCase()
            
            // Status filter
            const statusMatch = statusFilter.value === 'All' || 
                (statusFilter.value === 'Completed' && task.status === true) ||
                (statusFilter.value === 'Pending' && task.status === false)
            
            // Due date filter
            const dueDateMatch = dueDateFilter.value === 'All' || (() => {
                const taskDate = new Date(task.due_date)
                const today = new Date()
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
                
                switch(dueDateFilter.value) {
                    case 'Today':
                        return taskDate.toDateString() === today.toDateString()
                    case 'This Week':
                        return taskDate <= weekFromNow
                    case 'This Month':
                        return taskDate <= monthFromNow
                    case 'Overdue':
                        return taskDate < today && task.status === false
                    default:
                        return true
                }
            })()

            return priorityMatch && statusMatch && dueDateMatch
        })
    }

    return {

        priorityFilter,
        statusFilter,
        dueDateFilter,
        priorityOptions,
        statusOptions,
        dueDateOptions,

      
        setPriorityFilter,
        setStatusFilter,
        setDueDateFilter,
        resetFilters,


        filterTasks
    }
}) 