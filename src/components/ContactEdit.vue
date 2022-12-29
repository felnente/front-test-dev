<template>
  <contact-form v-if="contact" :contact="contact"></contact-form>
</template>

<script>
  import ContactForm from '../components/ContactForm'
  import axios from 'axios'

  export default {
    name: 'contact-edit',

    data () {
      return {
        contact: false
      }
    },

    components: {
      ContactForm
    },

    mounted () {
      axios.get('http://localhost:3000/contacts/' + this.$route.params.id)
        .then((response) => {
          this.contact = response.data
        })
    }
  }
</script>
