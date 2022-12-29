<template>
  <contact-form :contact="{}"></contact-form>
</template>

<script>
  import ContactForm from '../components/ContactForm'

  export default {
    name: 'ContactCreate',

    components: {
      ContactForm
    }
  }
</script>
