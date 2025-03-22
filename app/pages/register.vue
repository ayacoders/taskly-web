<script setup>
import { registerSchema } from '~/utils/validation'

const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const toast = useToast()

async function onSubmit(event) {
  try {
    const validatedData = registerSchema.parse(state)

    toast.add({
      title: 'Success',
      description: 'Registration successful',
      color: 'success',
      data: validatedData
    })

    navigateTo('/dashboard')
  } catch (error) {
    if (error.errors) {
      error.errors.forEach((err) => {
        toast.add({
          title: 'Validation Error',
          description: err.message,
          color: 'error'
        })
      })
    }
  }
}
</script>

<template>
  <div class="py-4 px-8 flex flex-col bg-container rounded-md shadow-xl">
    <h1 class="xs:text-xl md:text-3xl font-semibold">Register</h1>
    <p class="xs:text-sm md:text-base">Create your account to get started</p>

    <span class="text-sm text-secondary mt-2">
        Already have an account?
        <NuxtLink to="/login" class="text-secondary underline">
          Login
        </NuxtLink>
      </span>

    <UForm :schema="registerSchema" :state="state" class="space-y-4 mt-4 md:w-96" @submit.prevent="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" size="lg" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" size="lg" type="password" class="w-full"/>
      </UFormField>

      <UFormField label="Confirm Password" name="confirmPassword">
        <UInput v-model="state.confirmPassword" size="lg" type="password" class="w-full"/>
      </UFormField>

      <div class="flex justify-end items-center">
        <UButton type="submit" class="bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer">
          Register
        </UButton>
      </div>
    </UForm>
  </div>
</template> 