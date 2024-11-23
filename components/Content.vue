<template>
    <div>
        <h2>{{ data }}</h2>
    </div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/server')
</script>