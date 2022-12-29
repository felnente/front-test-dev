<template>
    <div>
        <div class="container">
            <span>CADASTRO DE PLANETA</span>
        </div>
        <div class="container">
            <b-form v-on:submit.prevent="createPlanet">
                <b-form-group>
                    <b-form-select v-model="galaxy_id">
                        <b-form-select-option value="0">Escolha uma galáxia</b-form-select-option>
                        <b-form-select-option v-for="galaxy in galaxies" :key="galaxy.id" :value="galaxy.id">{{ galaxy.name }}</b-form-select-option>
                    </b-form-select>
                    <span v-if="errors.galaxy_id">{{errors.galaxy_id}}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="planet" placeholder="Nome do Planeta" />
                    <span v-if="errors.planet">{{errors.planet}}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="moons" placeholder="Quantidade de Luas"/>
                    <span v-if="errors.moons">{{errors.moons}}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="diameter" placeholder="Diâmetro"/>
                    <span v-if="errors.diameter">{{errors.diameter}}</span>
                </b-form-group>
                <b-form-group>
                    <b-button type="submit">Cadastrar</b-button>
                </b-form-group>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddPlanet',
    data () {
        return {
            planet: '',
            moons: '',
            diameter: '',
            galaxies: {},
            galaxy_id: 0,
            errors: {}
        }
    },
    mounted (){
        axios
            .get('http://universe.localhost/api/galaxies')
            .then(response => (this.galaxies = response.data))
    },
    methods: {
        createPlanet () {
            axios
                .post('http://universe.localhost/api/planets',
                    {
                        planet: this.planet,
                        moons: this.moons,
                        diameter: this.diameter,
                        galaxy_id: this.galaxy_id
                    })
                .then((response) => {
                    let id = response.data.galaxy_id
                    this.$router.push({
                        name: 'galaxy',
                        params: {
                            id
                        }
                    });
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
