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
    it('opens an input field in a listitem component', () => {
        const editButton = wrapper.findAll('button').at(2);
        editButton.trigger('click');
        expect(wrapper.html()).toContain('input');
    });
  });

  describe('when the deleteEntryb function is called', () => {
    let listItemWrapper;
    beforeEach(() => {
      listItemWrapper = wrapper.find(list);
      wrapper.find(list).find('#buttonDelete').trigger('click')
    });
    it('decreases the amount of items in the list', () => {
      expect((listItemWrapper.props().items.length)).toBe(3);
    });
    it('removes the item with the specified id', () => {
      expect(listItemWrapper.props().items).not.toContain('"id": 0');
    });
  });

  describe('when a the addEntry function is called', () => {
    let listItemWrapper;
    beforeEach(() => {
      listItemWrapper = wrapper.find(list);
      //console.log(wrapper.find('addEntry'));
      wrapper.vm.addEntry();
    });

    it('increases the amount of items in the list', () => {
      expect(listItemWrapper.props().items).toHaveLength(5); //previous test has decreased it
    });
    it('increments the maxId property', () => {
      expect(wrapper.vm.maxId).toBe(4); //is not decreased when entries are removed
    });
    it('opens an input field in the listitem component', () => {
        expect(wrapper.html()).toContain('input');
    });
  });
});
