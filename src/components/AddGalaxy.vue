<template>
    <div>
       <div class="container">
           <span>CADASTRO DE GALÁXIA</span>
       </div>

        <div class="container">
            <b-form v-on:submit.prevent="createGalaxy">
                <b-form-group>
                    <b-form-input v-model="name" placeholder="Nome da Galaxia"/>
                    <span v-if="errors.name">{{errors.name}}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="radius" placeholder="Raio"/>
                    <span v-if="errors.radius">{{errors.radius}}</span>
                </b-form-group>
                <b-form-group>
                    <b-form-input v-model="mass" placeholder="Massa"/>
                    <span v-if="errors.mass">{{errors.mass}}</span>
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
    name: 'AddGalaxy',
    props: {
        id: Number
    },
    data () {
        return {
            name: '',
            radius: '',
            mass: '',
            errors: {}
        }
    },
    methods: {
        createGalaxy(){
            axios
                .post('http://universe.localhost/api/galaxies', {name: this.name, radius: this.radius, mass: this.mass})
                .then(() => {
                    this.$router.push({
                        name: 'galaxies'
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
