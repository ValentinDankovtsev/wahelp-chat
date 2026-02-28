import { type Ref, nextTick, watch, type WatchSource } from 'vue'

export function useChatScroll(
  containerRef: Ref<HTMLElement | null>,
  trigger: WatchSource | WatchSource[],
) {
  const scrollToBottom = async () => {
    await nextTick()
    if (containerRef.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight
    }
  }

  watch(trigger, scrollToBottom, { deep: true, immediate: true })

  return { scrollToBottom }
}
