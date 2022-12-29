<template>
    <div>
        <div class="cab">
            <section>
                <h2>{{galaxy.name}}</h2>
                <p>raio: {{galaxy.radius}} massa: {{galaxy.mass}}</p>
            </section>
        </div>

        <div class="table">
            <caption>Planetas</caption>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Planeta</th>
                        <th>N° Luas</th>
                        <th>Diâmetro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="planet in galaxy.planets" :key="planet.id">
                        <td>{{planet.planet}}</td>
                        <td>{{planet.moons}}</td>
                        <td>{{planet.diameter}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Galaxy',
    props: {
        id: Number
    },
    data () {
        return {
            galaxy: {}
        }
    },
    mounted (){
        axios
            .get('http://universe.localhost/api/galaxies/'+this.$route.params.id)
            .then(response => (this.galaxy = response.data))
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h2{
    text-align: center;
}

p {
    text-align: center;
    color: #6c757d;
}

.cab section {
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 5px;
}

</style>
