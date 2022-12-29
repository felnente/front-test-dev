<template>
  <div class="container-fluid">
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
    </div>

  </div>    
</template>

<script>
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker';

  export default {
    name: 'contact-form',
    props: ['contact'],
    components: {
      DatePicker
    },

    data () {
      return {
        birth: '',
        errors: {}
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
            this.errors = error.response.data.errors
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
            this.errors = error.response.data.errors
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