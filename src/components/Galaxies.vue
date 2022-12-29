<template>
    <div class="container-fluid">
        <div><h3>CONTROLE DE EXPANSÃO 3CPLUS</h3></div>
        <div class="row mouse">
            <div class="col-md-3 divGalaxy" v-for="contact in contacts" :key="contact.id" @click="onPostClick(contact.id)">
                <section>
                    <span><b>{{contact.name}}</b></span>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Contacts',
    data () {
        return {
            contacts: {}
        }
    },
    mounted (){
        axios
            .get('http://localhost:3000/contacts')
            .then((response) => {
                console.log(response.data)
                this.contacts = response.data
            }
            )
    },

    methods: {
        onPostClick(id) {
            this.$router.push({
                name: 'galaxy',
                params: {
                    id
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.divGalaxy {
    padding:10px 10px 10px 10px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1px;
    min-height: 150px;
    color: white;
}

h3 {
    text-align: center;
}

.divGalaxy span {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 18px;
}
.mouse div:hover {
    cursor: pointer;
    opacity: 0.5;
}

.divGalaxy::after {
    content: "";
    background: url("../../public/images/galaxia.jpeg");
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
}
</style>
