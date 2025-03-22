<script setup>
definePageMeta({
  layout: "default",
});


onMounted(() => {
  navigateTo('/login');
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <ULoadingBar />
  </div>
</template>
