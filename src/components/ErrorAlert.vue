<template>
  <v-alert
    color="error"
    icon="$error"
    title="ERROR!"
  >
    <span v-html="error"></span>
  </v-alert>
  <br />
</template>

<script>
  export default {
    name: 'ErrorAlert',
    props: ['error']
  }
</script>