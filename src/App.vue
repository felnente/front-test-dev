<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Leadster-teste</router-link>
            <div class="navbar-nav mr-auto">
                
            </div>
        </nav>

        <div class="container mt-4">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>
