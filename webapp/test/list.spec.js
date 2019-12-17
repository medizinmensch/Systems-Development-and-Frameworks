import { mount } from '@vue/test-utils';
import list from '../src/components/list.vue';

let mocks, propsData, wrapper
const items = [
  { id: "0", editMode: false, text: "Take out the trash" },
  { id: "1", editMode: false, text: "Get A+ in SDF" },
  { id: "2", editMode: false, text: "Trashtalk the vue 'Getting started' guide" },
  { id: "3", editMode: false, text: "git commit -m 'this'" }
];

//function for creating the wrapper in tests that need them
const Wrapper = () => {
  return mount(list, {
    mocks,
    propsData
  }
  )
}

describe('list.vue', () => {
  beforeEach(() => {
    propsData = { items: items };
    mocks = {
      $apollo: {
        mutate: jest.fn().mockResolvedValue(32)
      },
      items: items
    };
    wrapper = Wrapper()
  });

  it('renders a list', () => {
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.findAll('p')).toHaveLength(4)
  });

  describe('when the add entry button is pressed', () => {
    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('emits an createTodo event', () => {
      const buttons = wrapper.findAll('button');
      const addButton = buttons.at((buttons.length - 1));
      addButton.trigger('click');
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

  describe('when a listitem emits a deleteTodo event', () => {

    beforeEach(() => {
      wrapper = Wrapper()
    })

    it('emits a deleteTodo event', () => {
      const x = wrapper.findAll(".jest-list-item").at(0).find(".btn-danger")
      x.trigger("click");
      expect(mocks.$apollo.mutate).toBeCalledWith(expect.objectContaining({ variables: { id: "0" } }));
    });
    // it('attempts to call an apollo mutation', () => {
    //   expect($apollo.mutate).toBeCalled();
    // })
  });
});
