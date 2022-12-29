<template>
  <div class="container-fluid">
    <router-link :to="{ path: '/'}" class="nav-link btn-create">
      <span><i class="fa-solid fa-arrow-left"> Voltar</i></span>
    </router-link>
    <div class="col-md-6 col-lg-4">
      <div class="panel-heading">
        <h3 class="panel-title">Cadastro de contatos</h3>
      </div>
    </div>
    <div class="col-md-12 col-lg-12">
      <form v-on:submit.prevent="submit">
        <div class="panel-body">          
            <div class="row">
              <div class="col-md-6 col-lg-6">
                <div class="form-group">
                  <label class="form-group" for="name">Nome</label>
                  <input class="form-control" type="text" v-model="contact.name" placeholder="Nome" name="name" id="name">
                  <span class="text-danger">{{ errors.hasOwnProperty('name') ? errors.name[0] : '' }}</span>
                </div>
              </div>
              <div class="col-md-6 col-lg-6">
                <div class="form-group">                
                  <label class="form-group" for="email">E-mail</label>
                  <input class="form-control" type="text" v-model="contact.email" placeholder="e-mail" name="email" id="email">
                  <span class="text-danger">{{ errors.hasOwnProperty('email') ? errors.email[0] : '' }}</span>
                </div>
              </div>
            </div>

            <div class="row"> 
              <div class="col-md-6 col-lg-6">
                <div class="form-group">                
                  <label class="form-group" for="cpf">CPF</label>
                  <input class="form-control" type="text" v-model="contact.cpf" placeholder="CPF" name="cpf" id="cpf">
                  <span class="text-danger">{{ errors.hasOwnProperty('cpf') ? errors.cpf[0] : '' }}</span>
                </div>
              </div>     
              <div class="col-md-6 col-lg-6">        
                <div class="form-group">
                  <label class="form-group" for="birth">Aniversário</label>
                  <date-picker
                    v-model ="birth"
                    format="DD/MM/YYYY"
                    v-mask="'##/##/####'"
                    id="birth"
                  >
                  </date-picker>
                  <span class="text-danger">{{ errors.hasOwnProperty('birth') ? errors.birth[0] : '' }}</span>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <button type="submit" class="btn btn-primary">{{ contact.hasOwnProperty('id') ? 'Editar' : 'Cadastrar' }}</button>        
            </div>   
        </div>
      </form>

      <div v-if="contact.id">
        <br>
        <h4>Endereços</h4>
        <form v-on:submit.prevent="submitAddress">
          <div class="row"> 
            <div class="col-md-4 col-lg-4">
              <div class="form-group">                
                <label class="form-group" for="cep">CEP</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.cep" 
                  placeholder="CEP" 
                  name="cep" 
                  id="cep"
                  maxlength="8"
                  v-on:keyup="searchZipCode"
                >
                <span id="cep-id" class="text-danger">{{ errors.hasOwnProperty('cep') ? errors.cep[0] : '' }}</span>
              </div>
            </div>     
            <div class="col-md-6 col-lg-6">        
              <div class="form-group">
                <label class="form-group" for="street">Rua</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.street" 
                  placeholder="Rua" 
                  name="street" 
                  id="street"
                  :disabled="loadCep"
                >
                <span class="text-danger">{{ errors.hasOwnProperty('street') ? errors.street[0] : '' }}</span>
              </div>
            </div>
            <div class="col-md-2 col-lg-2">        
              <div class="form-group">
                <label class="form-group" for="number">Number</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.number" 
                  placeholder="N°" 
                  name="number" 
                  id="number"
                  :disabled="loadCep"
                >
                <span class="text-danger">{{ errors.hasOwnProperty('number') ? errors.number[0] : '' }}</span>
              </div>
            </div>
          </div>

          <div class="row"> 
            <div class="col-md-4 col-lg-4">
              <div class="form-group">                
                <label class="form-group" for="district">Bairro</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.district" 
                  placeholder="Bairro" 
                  name="district" 
                  id="district"
                  :disabled="loadCep"
                >
                <span class="text-danger">{{ errors.hasOwnProperty('district') ? errors.district[0] : '' }}</span>
              </div>
            </div>     
            <div class="col-md-4 col-lg-4">        
              <div class="form-group">
                <label class="form-group" for="city">Cidade</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.city" 
                  placeholder="Cidade" 
                  name="city" 
                  id="city"
                  :disabled="loadCep"
                >
                <span class="text-danger">{{ errors.hasOwnProperty('city') ? errors.city[0] : '' }}</span>
              </div>
            </div>
            <div class="col-md-4 col-lg-4">        
              <div class="form-group">
                <label class="form-group" for="state">Estado</label>
                <input 
                  class="form-control" 
                  type="text" 
                  v-model="address.state" 
                  placeholder="N°" 
                  name="state" 
                  id="state"
                  :disabled="loadCep"
                >
                <span class="text-danger">{{ errors.hasOwnProperty('state') ? errors.state[0] : '' }}</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Cadastrar</button>        
          </div> 
        </form>

        <br>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
            <table class="table table-striped contacts-table">
              <thead>
              <tr>
                <th>CEP</th>
                <th>Rua</th>
                <th>Numero</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Exluir</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="addre in contact.address" :key="addre.id">
              <td>{{addre.cep}}</td>
              <td>{{addre.street}}</td>
              <td>{{addre.number}}</td>
              <td>{{addre.district}}</td>
              <td>{{addre.city}}</td>
              <td>{{addre.state}}</td>
              <td>
                <button
                  class="btn btn-danger"
                  v-on:click="destroy(addre.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>      
    </div>
  </div>    
</template>

<script>
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker'
  import $ from 'jquery'

  export default {
    name: 'contact-form',
    props: ['contact'],
    components: {
      DatePicker
    },

    data () {
      return {
        birth: '',
        address: {},
        errors: {},
        searchTimeout: null,
        loadCep: true
      }
    },

    mounted () {
      if (Object.prototype.hasOwnProperty.call(this.contact, 'id')) {
        this.birth = new Date(this.contact.birth + ' 12:00:00')
      }      
    },

    methods: {
      create () {
        this.FormData()
        axios.post('http://localhost:3000/contacts', this.contact)
          .then(() => {
            this.$router.push({
              name: 'contacts'
            })
          })
          .catch((error) => {
            this.errors = error.response.data
          })
      },
      edit () {
        this.FormData()
        axios.put('http://localhost:3000/contacts/' + this.contact.id, this.contact)
          .then(() => {
            this.$router.push({
              name: 'contacts'
            })
          })
          .catch((error) => {
            this.errors = error.response.data
          })
      },
      submit () {
        if (!Object.prototype.hasOwnProperty.call(this.contact, 'id')) {
          this.create()
        } else {
          this.edit()
        }
      },
      FormData() {
        if (this.birth) {
          this.contact.birth = (this.birth.getFullYear() + "-" + ("0" + (this.birth.getMonth() + 1)).slice(-2) + "-" + ("0" + this.birth.getDate()).slice(-2))
        }
      },
      submitAddress () {
        this.address.contact_id = this.contact.id
        axios.post('http://localhost:3000/addresses', this.address)
          .then(() => {
            this.loadContact()
            this.address = {}
          })
          .catch((error) => {
            this.errors = {}
            this.errors = error.response.data
          })
      },
      destroy (id) {
        console.log('aaaa')
        axios.delete('http://localhost:3000/addresses/' + id)
          .then(() => {
            this.loadContact()
          })
      },
      loadContact () {
        axios.get('http://localhost:3000/contacts/' + this.contact.id)
          .then((response) => {
            this.contact = response.data
          })
      },
      searchZipCode () {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          if (this.address.cep.length === 8) {
            this.loadAddress()
            axios.get('https://viacep.com.br/ws/' + this.address.cep + '/json/')
              .then((response) => {
                if (response.data.erro === true) {
                  this.errors = {cep: ['cep inválido']}
                } else {
                  this.loadCep = false
                  this.address.street = response.data.logradouro
                  this.address.district = response.data.bairro
                  this.address.city = response.data.localidade
                  this.address.state = response.data.uf
                  this.errors = {}
                  $('#cep-id').removeClass('text-danger')
                }
              })
          } else {
            this.loadCep = true
          }
        }, 200)
      },
      loadAddress () {
        this.address.street = ''
        this.address.district = ''
        this.address.city = ''
        this.address.state = ''
      }      
    }
  }
</script>

<style scoped>
  .mx-datepicker {
    display: block;
    width: 100%
  }
</style>