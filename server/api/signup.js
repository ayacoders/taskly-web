export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig()

    const response = await $fetch(`${config.public.apiBase}/api/health`);
    
    console.log(response)

    return response

})