<script setup>
const email = ref('');
const password = ref('');

const toast = useToast();
async function onSubmit(form) {
    toast.add({
        title: 'Sample'
    })
}
</script>

<template>
    <div class="py-4 px-8 flex flex-col bg-container rounded-md shadow-sm">
        <h1 class="xs:text-xl md:text-3xl font-semibold">Login</h1>
        <p class="xs:text-sm md:text-base">Keep it all together and you'll be fine</p>
        <UForm state="" class="space-y-4 mt-4" @submit="onSubmit" >
            <UFormField label="Email" name="email">
                <UInput size="lg" class="w-full" />
            </UFormField>

            <UFormField label="Password" name="password">
                <UInput size="lg" type="password" class="w-full"/>
            </UFormField>
            <span class="flex justify-end">
                <UButton type="submit" class="cursor-pointer">
                    Submit
                </UButton>
            </span>
        </UForm>
    </div>
</template>