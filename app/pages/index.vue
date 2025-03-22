<script setup>
definePageMeta({
  layout: "default",
});


onBeforeMount(() => {
  navigateTo('/login');
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <ULoadingBar />
  </div>
</template>
