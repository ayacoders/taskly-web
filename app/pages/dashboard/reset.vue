<script setup>
import { resetSchema } from '~/utils/validation'

definePageMeta({
    layout: 'dashboard'
})

const state = reactive({
    password: '',
    password_confirmation: ''
})

const toast = useToast()

const onSubmit = () => {
    try {
        resetSchema.parse(state)

        toast.add({
            title: 'Password reset successfully',
            description: 'Please login to continue',
            color: 'success'
        })

        navigateTo('/login')
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div class="container mx-auto px-4 py-8 mt-40 grid place-items-center">
        <div class="py-4 px-8 flex flex-col bg-container rounded-md shadow-xl">
            <h1 class="xs:text-xl md:text-3xl font-semibold">Reset Password</h1>
            <p class="xs:text-sm md:text-base">Enter your new password</p>

            <UForm :schema="resetSchema" :state="state" class="space-y-4 mt-4 md:w-96" @submit.prevent="onSubmit">
                <UFormField label="Password" name="password">
                    <UInput v-model="state.password" size="lg" type="password" class="w-full" />
                </UFormField>
                <UFormField label="Password Confirmation" name="password_confirmation">
                    <UInput v-model="state.password_confirmation" size="lg" type="password" class="w-full"/>
                </UFormField>

                <div class="flex justify-end items-center">
                    <UButton type="submit" class="bg-accent text-white hover:bg-accent-dark hover:cursor-pointer">
                        Reset Password
                    </UButton>
                </div>
            </UForm>

        </div>
    </div>
    
</template>

