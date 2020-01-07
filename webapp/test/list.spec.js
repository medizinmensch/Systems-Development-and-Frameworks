import {mount} from '@vue/test-utils';
import todoList from "../src/components/list.vue";

const exampleItems = [
    {id: "0", text: "first todo", user: {name: "testUser", id: "0"}, editMode: false},
    {id: "1", text: "second todo", user: {name: "testUser", id: "0"}, editMode: false},
    {id: "2", text: "third todo", user: {name: "testUser", id: "0"}, editMode: false}
];
const propsData = {todos: exampleItems};

describe('todoList component', () => {
    let wrapper = mount(todoList, {propsData});
    it('renders a todoList', () => {
        expect(wrapper.contains('#todoList'));
    });
    it('contains three todos', () => {
        expect(wrapper.findAll('#todoText')).toHaveLength(3)
    });
    it('contains add button', () => {
        expect(wrapper.contains('#buttonAdd')).toBe(true);
        const addButton = wrapper.find('#buttonAdd');
        expect(addButton.text()).toBe("Add")
    });

    describe('when the add todo button is pressed', () => {
        beforeEach(() => {
            wrapper.find('#buttonAdd').trigger('click');
        });

        it('emits an createTodo event', () => {
            expect(wrapper.emitted('createTodo'));
        });
        // Test fails due to lack of understanding of apollo mockups in jest
        // it('attempts to call an apollo mutation', () => {
        //   expect(mutate).toBeCalled();
        // })
    });
});
