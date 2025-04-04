import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] // Create a copy of test_data
    }),

    actions: {
        // Create a new task
        addTask(task) {
            this.tasks.push(task)
            return task
        },

        // Read a single task by ID
        getTaskById(taskId) {
            return this.tasks.find(task => task.id === taskId)
        },

        // Update a task
        updateTask(updatedTask) {
            const index = this.tasks.findIndex(task => task.id === updatedTask.id)
            if (index !== -1) {
                this.tasks[index] = {
                    ...updatedTask,
                }
                return true
            }
            return false
        },

        // Delete a task
        deleteTask(taskId) {
            const index = this.tasks.findIndex(task => task.id === taskId)
            if (index !== -1) {
                this.tasks.splice(index, 1)
                return true
            }
            return false
        },

        // Toggle task status
        toggleTaskStatus(taskId) {
            const task = this.getTaskById(taskId)
            if (task) {
                task.status = !task.status
                task.updated_at = new Date().toISOString()
                return true
            }
            return false
        },

        // Bulk operations
        deleteCompletedTasks() {
            this.tasks = this.tasks.filter(task => !task.status)
        },

        // Reset to original data
        resetTasks(newTask) {
            this.tasks = [...newTask]
        }
    },

    getters: {
        // Get all tasks
        getAllTasks: (state) => state.tasks,

        // Get completed tasks
        getCompletedTasks: (state) => state.tasks.filter(task => task.status),

        // Get pending tasks
        getPendingTasks: (state) => state.tasks.filter(task => !task.status),

        // Get tasks count
        getTasksCount: (state) => ({
            total: state.tasks.length,
            completed: state.tasks.filter(task => task.status).length,
            pending: state.tasks.filter(task => !task.status).length
        })
    }
})

