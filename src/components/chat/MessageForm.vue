<script setup lang="ts">
import { ref, nextTick } from 'vue'

const emit = defineEmits<{
  (e: 'send', text: string): void
}>()

const messageInput = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const resizeTextarea = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
  }
}

const handleSend = () => {
  if (!messageInput.value.trim()) return
  emit('send', messageInput.value)
  messageInput.value = ''

  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

const applyFormat = (type: 'bold' | 'italic') => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = messageInput.value

  const symbol = type === 'bold' ? '*' : '_'
  const selectedText = text.substring(start, end)

  const newText = text.substring(0, start) + symbol + selectedText + symbol + text.substring(end)

  messageInput.value = newText

  nextTick(() => {
    textarea.focus()
    const newCursorPos = end + symbol.length * 2
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    resizeTextarea()
  })
}
</script>

<template>
  <div class="message-input">
    <div class="formatting-toolbar">
      <button @click.prevent="applyFormat('bold')" title="Жирный" class="format-btn">
        <b>B</b>
      </button>
      <button @click.prevent="applyFormat('italic')" title="Курсив" class="format-btn">
        <i>I</i>
      </button>
    </div>

    <form class="input-form" @submit.prevent="handleSend">
      <div class="input-wrapper">
        <textarea
          ref="textareaRef"
          v-model="messageInput"
          placeholder="Введите сообщение"
          @keydown="handleKeydown"
          @input="resizeTextarea"
          rows="1"
        ></textarea>
      </div>
      <button type="submit" class="send-btn" :disabled="!messageInput.trim()">➤</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.message-input {
  background: #f0f2f5;
  border-top: 1px solid #d1d7db;
  padding: 5px 16px 10px;
  flex-shrink: 0;

  .formatting-toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;

    .format-btn {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 2px 10px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: #f5f6f6;
      }
    }
  }

  .input-form {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .input-wrapper {
    flex: 1;
    display: flex;
    background: #fff;
    border-radius: 8px;
    padding: 9px 12px;
    border: 1px solid #fff;

    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      font-family: inherit;
      font-size: 15px;
      max-height: 120px;
      padding: 0;
      margin: 0;
      line-height: 20px;
    }
  }

  .send-btn {
    border: none;
    background: none;
    color: #54656f;
    font-size: 24px;
    cursor: pointer;
    padding: 0 10px;
    margin-bottom: 5px;

    &:disabled {
      color: #aebac1;
      cursor: default;
    }

    &:not(:disabled) {
      color: #00a884;
    }
  }
}
</style>
