import { describe, it, expect } from 'vitest'
import { useChatScroll } from '../useChatScroll'
import { ref, nextTick, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

describe('useChatScroll', () => {
  it('scrolls to bottom when trigger changes', async () => {
    const TestComponent = defineComponent({
      template: '<div ref="container"></div>',
      setup() {
        const container = ref<HTMLElement | null>(null)
        const messages = ref<string[]>([])

        useChatScroll(container, messages)

        return { container, messages }
      },
    })

    const wrapper = mount(TestComponent)

    const containerElement = wrapper.find('div').element as HTMLElement
    Object.defineProperty(containerElement, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(containerElement, 'scrollTop', { value: 0, writable: true })

    wrapper.vm.messages.push('New message')
    await nextTick()
    await nextTick()

    expect(containerElement.scrollTop).toBe(1000)
  })
})
