<template>
  <div class="container-fluid">
    <div class="panel-heading">
      <h3 class="panel-title">Lista de contatos</h3>
    </div>
    <br>
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
        <table class="table table-striped contacts-table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Aniversário</th>
            <th width="120px">Editar/Endereços</th>
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

          <pagination v-model="page" :records="totalItems" @paginate="load" :per-page="20"></pagination>
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
        page: 1,
        searchTimeout: null,
        totalItems: 0
    }
  },

  components: {
  },

  mounted (){
    this.load()
  },

  methods: {
    load () {
      axios.get('http://localhost:3000/contacts?name=' + this.name + '&page=' + this.page)
      .then((response) => {
        this.contacts = response.data.contacts
        this.totalItems = response.data.meta.totalItems
      })
    },

    filter () {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.load()        
      }, 1000);
    }
  }
}
</script>

<style scoped>
    .btn-create {
        float: right
    }

    .contacts-table 
      a {
        padding: 0    
      }
    
</style>
