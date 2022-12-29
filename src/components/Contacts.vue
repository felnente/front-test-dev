<template>
  <div class="container-fluid">
    <form class="row search">
      <div class="form-group col-md-12">
        <input class="form-control" v-on:keyup="filter" id="search" v-model="name" ref="search" placeholder="Busca"/>
      </div>
    </form>
    <router-link to="/contact/create" class="nav-link btn-create">
      <button class="btn btn-primary">
        Adicionar Contato
      </button>
    </router-link>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Aniversário</th>
            <th width="120px">Editar</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{contact.name}}</td>
            <td>{{contact.email}}</td>
            <td>{{contact.cpf}}</td>
            <td>{{contact.birth}}</td>
            <td>
              <router-link :to="{ path: '/contact/edit/'+ contact.id}" class="nav-link btn-create">
                <button class="btn btn-primary">
                    <i class="fa-solid fa-user-pen"></i>
                </button>
              </router-link>
            </td>
          </tr>
          </tbody>
          </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Contacts',
  data () {
    return {
        contacts: {},
        name: '',
        searchTimeout: null
    }
  },
  mounted (){
    this.load()
  },

  methods: {
    load () {
      axios.get('http://localhost:3000/contacts?name=' + this.name)
      .then((response) => {
        this.contacts = response.data.contacts
      })
    },

    filter () {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.load()        
      }, 1000);
    },

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

<style scoped>
    .btn-create {
        float: right
    }
</style>
