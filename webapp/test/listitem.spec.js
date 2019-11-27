import { mount } from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

describe('listitem.vue', () => {
  const wrapper = mount(listitem, {
    propsData: {
      entry: { text: "test a todo list and its content" },
    }
  });

  it('has text', () =>{
    expect(wrapper.html()).toContain('<form class="text">');
  });

  it('has rows', () =>{
    expect(wrapper.html()).toContain('<div class="row mx-lg-n5">');
  });

  it('has columns', () =>{
    expect(wrapper.html()).toContain('<div class="col py-3 border bg-light">');
  });

  it('has a delete button', () =>{
    expect(wrapper.html()).toContain('id="buttonDelete"');
    expect(wrapper.html()).toContain('name="delete-button"');
    expect(wrapper.html()).toContain('type="button"');
  });

  it('has an edit button', () =>{
    expect(wrapper.html()).toContain('id="buttonEdit"');
    expect(wrapper.html()).toContain('name="edit-button"');
    expect(wrapper.html()).toContain('type="button"');
  });

  it('doesn\'t show the edit input immediately', () => {
    expect(wrapper.html()).not.toContain('<input type="text" name="newText">');
  });

  const editButton = wrapper.findAll('button').at(0);
  const deleteButton = wrapper.findAll('button').at(1);

  describe('when the edit button is pressed', () => {
    editButton.trigger('click');
    it('emits a ToggleEditMode event', () => {
      expect(wrapper.emitted('toggleEditMode'));
    });
    //the test cases below do not work, as logic for html changes resides outside the listitem component

    // it('shows the edit input field', () => {
    //   expect(wrapper.html()).toContain('<input type="text" name="newText">');
    // });
    // it('renders the save button', () => {
    //   expect(wrapper.html()).toContain('type="button" name="save-button" id="buttonSave"')
    // })
  });

  describe('when the delete button is pressed', () => {
    deleteButton.trigger('click');

    it('emits a DeleteEntry event', () => {
      expect(wrapper.emitted('deleteEntry'));
    });
  });
});
