import {mount} from '@vue/test-utils';
import todoList from "../src/components/todoList.vue";
const uuidv1 = require('uuid/v1');

const testUser = "testUser";

const exampleItems = [
    {id: "0", text: "first todo", user: {name: testUser, id: "0"}, editMode: false},
    {id: "1", text: "second todo", user: {name: testUser, id: "0"}, editMode: false},
    {id: "2", text: "third todo", user: {name: testUser, id: "0"}, editMode: false}
];
const propsData = {todos: exampleItems};

let mocks;

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
            mocks = {$apollo: {mutate: jest.fn().mockResolvedValue({data: {createTodo: {id: uuidv1(), text: "mocked Todo", user: {name: testUser}}}})}};
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonAdd').trigger('click');
        });

        it('emits an createTodo event', () => {
            expect(wrapper.emitted('createTodo'));
        });
        it('attempts to call an apollo mutation', () => {
            expect(wrapper.vm.$apollo.mutate).toBeCalled()
        });
    });

    describe('when a deleteTodo event was emitted', () => {
        beforeEach(() => {
            mocks = {$apollo: {mutate: jest.fn().mockResolvedValue({data: {deleteTodo: true}})}};
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonDelete').trigger('click');
        });
        it('attempts to call an apollo mutation', () => {
            expect(wrapper.vm.$apollo.mutate).toBeCalled()
        })
    });

    describe('when a toggleEditMode event was emitted', () => {
        beforeEach(() => {
            mocks = {$apollo: {mutate: jest.fn().mockResolvedValue({data: {updateTodo: {}}})}};
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonDelete').trigger('click');
        });
        it('attempts to call an apollo mutation', () => {
            expect(wrapper.vm.$apollo.mutate).toBeCalled()
        })
    });
});
