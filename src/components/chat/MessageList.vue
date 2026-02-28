<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Message } from '@/types'
import MessageBubble from './MessageBubble.vue'
import { useChatScroll } from '@/composables/useChatScroll'

const props = defineProps<{
  messages: Message[]
  isSwitchingChat: boolean
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const scrollTrigger = computed(() => [props.messages.length, props.messages])

useChatScroll(messagesContainer, scrollTrigger)
</script>

<template>
  <div class="message-list" ref="messagesContainer">
    <TransitionGroup :name="isSwitchingChat ? '' : 'message'">
      <div v-for="msg in messages" :key="msg.id" class="message-row" :class="msg.type">
        <MessageBubble :message="msg" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px 5%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #efeae2;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  opacity: 0.95;
}

.message-row {
  display: flex;
  flex-direction: column;
  width: 100%;

  &.outgoing {
    align-items: flex-end;
  }

  &.incoming {
    align-items: flex-start;
  }
}

.message-enter-active {
  transition: all 0.3s ease-out;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
