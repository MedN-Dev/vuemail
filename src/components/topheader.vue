<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        @input="search"
        >
      </v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>

      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img :src="currentUser.avatarUrl" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
      </v-menu>
  </v-toolbar>
</template>


<script>
export default {
  name: 'topheader',
  data() {
    return {
      currentUser: window.currentUser
    }
  },
  methods: {
    search(event) {
      this.$store.dispatch('search', event.target.value)
    }
  }
}
</script>
