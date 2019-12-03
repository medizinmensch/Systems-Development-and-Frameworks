import { mount } from '@vue/test-utils';
import app from '../src/App.vue';
import list from '../src/components/list.vue'

describe('App.vue', () => {

  let wrapper = mount(app);
  beforeEach(() => {
    wrapper = mount(app);
  });

  it('renders the todo app', () =>{
    expect(wrapper.contains('div')).toBe(true);
  });

  describe('when the toggleEditModeb function is called', () => {
    //TODO reimplement with backend mockup
    //Test fails after apollo backend integration
    // it('opens an input field in a listitem component', () => {
    //     const editButton = wrapper.findAll('button').at(2);
    //     editButton.trigger('click');
    //     expect(wrapper.html()).toContain('input');
    // });
  });
});
