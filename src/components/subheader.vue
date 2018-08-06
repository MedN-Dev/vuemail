<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <DropDown v-if="$route.name == 'inbox'">
        <CheckBox :onChange="() => bulkToggle()" :selected="allSelected" :someSelected="someSelected" />
        <Icon name="arrow_drop_down" />
        <ul>
          <li><a @click="selectAll">All</a></li>
          <li><a @click="selectNone">None</a></li>
          <li><a @click="selectRead">Read</a></li>
          <li><a @click="selectUnread">Unread</a></li>
        </ul>
      </DropDown>
      <v-toolbar-title><h4>Project</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="paging" v-if="page">
        <strong>{{ page.from }}-{{ page.to }}</strong>
        of
        <strong>{{ page.count }}</strong>
        <div class="split-btn">
          <a href title="Previous"><Icon name="keyboard_arrow_left" /></a>
          <a href title="Next"><Icon name="keyboard_arrow_right" /></a>
        </div>
      </div>
      <router-link to="/" v-if="$route.name != 'inbox'" title="Back to Inbox">
        <Icon name="backspace" />
      </router-link>

      <div v-if="$route.name == 'thread' || someSelected">
        <a href title="Archive"><Icon name="archive" /></a>
        <a href title="Report Spam"><Icon name="spam" /></a>
        <a href title="Delete"><Icon name="delete" /></a>
      </div>
      <a href v-if="$route.name == 'inbox' && this.noneSelected"><Icon name="refresh" /></a>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>

</v-card>
</template>

<style lang="scss" scoped>
@import '../scss/common';

.sub-header {
  padding: 8px 30px 8px 200px;
  border-bottom: 1px solid #e5e5e5;
  height: 30px;
}
.app-name {
  margin: 0 0 0 -170px;
  line-height: 32px;
  color: $red;
  float: left;
}
.paging {
  float: right;
  line-height: 32px;
  .split-btn {
    float: right;
    margin: 0 0 0 10px;
    line-height: 1.2;
  }
  .btn {
    .icon { opacity: .5 }
    &:hover .icon {
      opacity: .9;
    }
  }
  .inactive {
    cursor: default;
    .icon { opacity: .3 }
    &:hover .icon {
      opacity: .3;
    }
  }
}
</style>

<script>
import DropDown from './drop-down'
import Icon from './icon'
import CheckBox from './check-box'

import store from '../store'

export default {
  name: 'subheader',
  components: {
    DropDown,
    Icon,
    CheckBox
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    selectedThreadIds() {
      return this.$store.state.selectedThreadIds
    },
    page() {
      return this.$store.state.page
    },
    someSelected() {
      return this.selectedThreadIds.length > 0
    },
    noneSelected() {
      return this.selectedThreadIds.length == 0
    },
    allSelected() {
      return this.selectedThreadIds.length > 0 && this.selectedThreadIds.length == this.threads.length
    }
  },
  methods: {
    selectAll() {
      this.$store.commit('THREADS_SELECT_ALL')
    },
    selectNone() {
      this.$store.commit('THREADS_SELECT_NONE')
    },
    selectUnread() {
      this.$store.commit('THREADS_SELECT_UNREAD')
    },
    selectRead() {
      this.$store.commit('THREADS_SELECT_READ')
    },
    bulkToggle() {
      if (this.noneSelected) {
        this.selectAll()
      } else {
        this.selectNone()
      }
    }
  }
}
</script>
