
<template>
  <v-card>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template v-for="thread in filteredThreads" class="thread" :class="{ unread: thread.unread, selected: isSelected(thread) }">
          <router-link :to="`/threads/${thread.id}`">
            <v-subheader v-if="thread.header" :key="thread.header">{{ thread.header }}</v-subheader>
            <v-divider v-else-if="thread.divider" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="thread.title">
              <CheckBox :selected="isSelected(thread)" :onChange="() => toggleSelected(thread)" />
              <v-list-tile-avatar >
                <img :src="thread.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                  <span class="people">
                    <span class="name" :class="{unread: person.unread}" v-for="person, index in thread.participants">
                      {{ person | smartName(thread.messageCount == 1) }}{{ index == thread.participants.length - 1 ? '' : ', ' }}
                    </span>
                    <span v-if="thread.messageCount > 1">({{ thread.messageCount }})</span>
                  </span>
                <v-list-tile-title v-html="thread.lastMessage.subject"></v-list-tile-title>
                <v-list-tile-sub-title v-html="thread.lastMessage.snippet"></v-list-tile-sub-title>
              </v-list-tile-content>
              <time>{{ thread.lastMessage.createdAt | smartDate }}</time>
            </v-list-tile>
          </router-link>
        </template>
      </v-list>
      <v-divider></v-divider>
      <v-btn block flat class="ma-0">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import Fuse from 'fuse.js'
import CheckBox from './check-box'

export default {
  name: 'threads',
  components: {
    CheckBox
  },
  created() {
    this.$store.dispatch('fetchThreads')
  },
  computed: {
    threads() {
      return this.$store.state.threads
    },
    filteredThreads() {
      if (this.query.length === 0) {
        return this.threads
      } else {
        return new Fuse(this.threads, {
          keys: [
            'lastMessage.subject',
            'lastMessage.snippet',
            'participants.firstName',
            'participants.lastName'
          ]
        }).search(this.query)
      }
    },
    selectedThreadIds() {
      return this.$store.state.selectedThreadIds
    },
    query() {
      return this.$store.state.query
    },
  },
  methods: {
    isSelected(thread) {
      return this.selectedThreadIds.indexOf(thread.id) > -1
    },
    toggleSelected(thread) {
      this.$store.commit('THREADS_SELECT_THREAD', thread.id)
    }
  }
}
</script>
