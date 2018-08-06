<template>
  <v-navigation-drawer
    id="appDrawer"
    fixed
    app
    width="260"
    >
    <v-toolbar color="primary darken-1" dark>
      <span class="logo"><img src="/static/logo.png"></span>
    </v-toolbar>
      <v-list dense expand>
        <v-btn @click.stop="compose">
          COMPOSE
        </v-btn>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
import eventBus from '../event_bus'

export default {
  name: 'topnav',
  methods: {
    compose() {
      eventBus.$emit('COMPOSE_OPEN')
    }
  }
}
</script>
