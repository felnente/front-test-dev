<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Leadster-teste</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/galaxies" class="nav-link">Galáxias</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/galaxy/create" class="nav-link">Adicionar Galaxia</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/planet/create" class="nav-link">Adicionar Planeta</router-link>
                </li>
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
