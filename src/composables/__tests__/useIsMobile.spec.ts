import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIsMobile } from '../useIsMobile'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

describe('useIsMobile', () => {
  const TestComponent = defineComponent({
    template: '<div></div>',
    setup() {
      return useIsMobile()
    },
  })

  let originalInnerWidth: number

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    vi.restoreAllMocks()
  })

  it('initializes correctly based on window width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.vm.isMobile).toBe(true)

    wrapper.unmount()
  })

  it('updates when window is resized', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.vm.isMobile).toBe(false)

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    })

    window.dispatchEvent(new Event('resize'))
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isMobile).toBe(true)

    wrapper.unmount()
  })

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const wrapper = mount(TestComponent)
    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
