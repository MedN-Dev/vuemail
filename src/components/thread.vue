<template>
  <v-card v-if="thread">
    <v-card-text>
      <div class="post--item">
        <div class="post--title">
          <h3 class="title">{{ thread.messages[0].subject }}</h3>
        </div>
        <ul class="messages">
          <li v-for="message, index in thread.messages" class="message" :class="{ active : message.active }" @click="toggleActive(message)">
            <div class="thread-tools">
              <time>
                {{ message.createdAt | smartDate }}
                ({{ message.createdAt | timeAgo }})
              </time>
              <div class="split-btn" v-if="message.active">
                <a href class="btn"><Icon name="reply" /></a>
                <DropDown>
                  <Icon name="arrow_drop_down" />
                  <ul class="align-right">
                    <li><a href>Reply</a></li>
                    <li><a href>Reply all</a></li>
                    <li><a href>Forward</a></li>
                  </ul>
                </DropDown>
              </div>
            </div>
            <v-avatar
              size="46"
            >
              <img :src="message.from.avatarUrl" alt="alt">
            </v-avatar>
            <div class="from">
              <span class="name">{{ message.from | smartName }}</span>
              <span class="email" v-if="message.active">&lt;{{ message.from.email }}&gt;</span>
            </div>
            <div class="to" v-if="message.active">to
              <span v-for="person, index in message.to">{{ person | smartName(false) }}{{ index == message.to.length - 1 ? '': ', ' }}</span>
            </div>
            <div class="body" v-html="message.active ? message.body : message.snippet"></div>
          </li>
        </ul>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-toolbar card color="white">
      <div class="reply">
        <v-avatar
          size="46"
        >
          <img :src="currentUser.avatarUrl" alt="alt">
        </v-avatar>
        <div class="reply-box">
          <p>Click here to <a href>Reply</a>, <a href>Reply to all</a> or <a href>Forward</a></p>
        </div>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
import DropDown from './drop-down'
import Icon from './icon'

export default {
  name: 'thread',
  components: {
    DropDown,
    Icon
  },
  created() {
    this.$store.dispatch('fetchThread', this.$route.params.id)
  },
  computed: {
    currentUser() {
      return window.currentUser
    },
    thread() {
      const thread = this.$store.state.thread
      if (thread) {
        thread.messages[thread.messages.length - 1].active = true
      }

      return thread
    }
  },
  methods: {
    toggleActive(message) {
      this.$set(message, 'active', !message.active)
    }
  }
}
</script>
