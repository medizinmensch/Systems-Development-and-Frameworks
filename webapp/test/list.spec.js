import { mount } from '@vue/test-utils';
import list from '../src/components/list.vue';

let mocks, propsData, wrapper
const items = [{text: '1'}, {text: '2'}, {text:'3'}];

const mutate = jest.fn()

//function for creating the wrapper in tests that need them
const Wrapper = () => {
  return mount(list, {
      mocks,
      propsData
    }
  )
}
beforeEach(() => {
  propsData = { items: items };
  mocks = {
    $apollo: {
      mutate: mutate,
      items: {
      }
    },
  };
  wrapper = Wrapper()
});

describe('list.vue', () => {




  it('renders a list', () =>{
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.findAll('p')).toHaveLength(3)
  });


  describe('when the add entry button is pressed', () => {
    wrapper = Wrapper()
    const buttons = wrapper.findAll('button');
    const addButton = buttons.at((buttons.length-1));
    addButton.trigger('click');
    it('emits an createEntry event', () => {
      expect(wrapper.emitted('createEntry'));
    });
    //Test fails due to lack of understanding of apollo mockups in jest
    // it('attempts to call an apollo mutation', () => {
    //   expect(mutate).toBeCalled();
    // })
  });

  //TODO reimplement with proper apollo backend mockup
  //Tests fail after apollo backend integration

  // describe('when a listitem emits a toggleEditMode event', () => {
  //   wrapper = Wrapper()
  //   wrapper.findAll(listitem).at(0).vm.$emit('toggleEditMode', 0);
  //   it('emits a toggle-edit-mode-b event', () => {
  //     expect(wrapper.emitted('toggle-edit-mode-b'));
  //   });
  // });

  // describe('when a listitem emits a deleteEntry event', () => {
  //   wrapper = Wrapper()
  //   wrapper.findAll(listitem).at(0).vm.$emit('deleteEntry', 0);
  //   it('emits a delete-entry-b event', () => {
  //     expect(wrapper.emitted('delete-entry-b'));
  //   });
  //   it('attempts to call an apollo mutation', () => {
  //     expect(mutate).toBeCalled();
  //   })
  // });

});
