import { mount } from '@vue/test-utils'
import Component from './Button.vue'

describe('Button.vue', () => {
  it('should render', () => {
    const wrapper = mount(Component)
    // const wrapper = mount(Component, { props: { initial: 10 } })
    expect(wrapper.text()).toContain('click me')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should show loading spinner', () => {
    const wrapper = mount(Component, { propsData: { isLoading: true } })

    // const wrapper = mount(Component, { props: { initial: 10 } })
    expect(wrapper.find('[data-testid="loadingSpinner"]')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should be interactive', async() => {
  //   const wrapper = mount(Counter, { props: { initial: 0 } })
  //   expect(wrapper.text()).toContain('0')

  //   expect(wrapper.find('.inc').exists()).toBe(true)

  //   await wrapper.get('button').trigger('click')

  //   expect(wrapper.text()).toContain('1')
  // })
})
