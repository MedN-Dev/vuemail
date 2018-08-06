<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <TopHeader />
        <v-content>
          <!-- Page Header -->
          <div class="page-wrapper">
            <SubHeader />
            <TopNav />
            <router-view></router-view>
          </div>
          <Compose />
          <Flash />
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">mednabouli.com Design &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
      </v-app>
    </template>

  </div>
</template>

<script>
import '../scss/app.scss'
import eventBus from '../event_bus'
import TopHeader from './topheader'
import TopNav from './topnav'
import SubHeader from './subheader'
import Flash from './flash'
import Compose from './compose'

export default {
  name: 'app',
  components: {
    TopHeader,
    TopNav,
    SubHeader,
    Flash,
    Compose
  },
  created() {
    document.documentElement.addEventListener('click', () => {
      eventBus.$emit('BODY_CLICK')
    }, false)

    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 27) {
        eventBus.$emit('KEYUP_ESCAPE')
      }
    }, false)
  }
}
</script>
