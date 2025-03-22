<template>
  <!-- <USwitch
    unchecked-icon="i-heroicons-moon"
    checked-icon="i-heroicons-sun"
    color="gray"
    variant="outline"
    size="xl"
    @click="toggleColorMode"
  /> -->
  <UButton 
    :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" 
    variant="ghost" 
    size="xl" 
    @click="toggleColorMode"
    class="hover:cursor-pointer duration-300"
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