<template>
    <div class="login-view">
        <router-view />
    </div>
</template>

<script setup lang="ts">
// không cần import gì, vì <router-view /> sẽ tự render theo route con
</script>

<style scoped>
.login-view {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
}
</style>