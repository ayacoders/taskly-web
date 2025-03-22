<template>
  <UButton
    :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
    color="gray"
    variant="ghost"
    @click="toggleColorMode"
  />
</template>

<script setup>
const colorMode = useColorMode()

onMounted(() => {
  if (colorMode.value === 'system') {
    colorMode.preference = 'light'
  }
})

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 