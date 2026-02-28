<script setup lang="ts">
import type { Message } from '@/types'
import { formatTime, formatMessageText } from '@/utils/formatters'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="message-bubble" :class="message.type">
    <div
      class="message-text"
      style="white-space: pre-wrap"
      v-html="formatMessageText(message.text)"
    ></div>
    <div class="message-meta">
      <span class="time">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-bubble {
  max-width: 65%;
  padding: 6px 7px 8px 9px;
  border-radius: 7.5px;
  position: relative;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  font-size: 14.2px;
  line-height: 19px;
  word-wrap: break-word;

  &.outgoing {
    background-color: #d9fdd3;
    align-self: flex-end;
    border-top-right-radius: 0;
  }

  &.incoming {
    background-color: #ffffff;
    align-self: flex-start;
    border-top-left-radius: 0;
  }

  .message-text {
    margin-bottom: 15px;
  }

  .message-meta {
    position: absolute;
    bottom: 4px;
    right: 7px;
    display: flex;
    align-items: center;

    .time {
      font-size: 11px;
      color: #667781;
    }
  }
}
</style>
