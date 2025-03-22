<script setup>
import { loginSchema } from '~/utils/validation'

const state = reactive({
  email: '',
  password: ''
})

const toast = useToast()

async function onSubmit(event) {
  try {
    const validatedData = loginSchema.parse(state)

    toast.add({
      title: 'Success',
      description: 'Login successful',
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
    <h1 class="xs:text-xl md:text-3xl font-semibold">Login</h1>
    <p class="xs:text-sm md:text-base">Keep it all together and you'll be fine</p>
    <span class="text-sm text-secondary mt-2">
          Don't have an account?
          <NuxtLink to="/register" class="text-secondary underline">
            Register
          </NuxtLink>
        </span>
    <UForm :schema="loginSchema" :state="state" class="space-y-4 mt-4 md:w-96" @submit.prevent="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" size="lg" class="w-full" />
      </UFormField>
      <div>
        <UFormField label="Password" name="password">
          <UInput v-model="state.password" size="lg" type="password" class="w-full"/>
        </UFormField>

        <NuxtLink to="/reset" class="text-secondary text-sm underline">
          Forgot your password?
        </NuxtLink>

      </div>

      <div class="flex justify-end items-center">
        <UButton type="submit" class="bg-accent text-white hover:bg-accent-dark hover:cursor-pointer">
          Login
        </UButton>
      </div>
    </UForm>
  </div>
</template>