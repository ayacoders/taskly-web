<script setup>
import { registerSchema } from '~/utils/validation'

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})


const config = useRuntimeConfig()
const toast = useToast()

async function onSubmit(event) {
  try {
    const validatedData = registerSchema.parse(state)
    
    const res = await $fetch(`${config.public.apiBase}/api/register`, {
      method: 'post',
      body: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password        
      }
    });

   if (res.token) {
        toast.add({
        title: 'Success',
        description: 'Registration successful',
        color: 'success',
        data: validatedData
      })
    }
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


async function handleEmailVerif() {
  try {
    const res = await $fetch(`${config.public.apiBase}/api/email/send-verification-link`, {
      method: 'post',
      body: state.email
    })

    toast.add({
      title: res.message
    })

    navigateTo('/login')
  } catch (err) {
    toast.add({
      title: "Failed to Verify Email"
    })
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
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" size="lg" class="w-full" />
      </UFormField>

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
        <UModal title="Verify Email">
          <UButton type="submit" class="bg-accent text-white hover:bg-accent-dark">
            Register
          </UButton>

          <template #body>
            Would you like to verify your email first?
          </template>

          <template #footer>
            <UButton type="submit" class="bg-accent text-white hover:bg-accent-dark" @click="handleEmailVerif">
              Yes
            </UButton>
            <NuxtLink to="/dashboard">
              <UButton type="submit" class="bg-accent text-white hover:bg-accent-dark">
                No
              </UButton>
            </NuxtLink>
          </template>
        </UModal>
      </div>
    </UForm>
  </div>
</template> 