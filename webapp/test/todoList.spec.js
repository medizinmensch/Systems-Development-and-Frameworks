import {mount} from '@vue/test-utils';
import todoList from "../src/components/todoList.vue";
import "babel-polyfill"
import {getExampleTodos, getCreateTodoMock, getUpdateTodoMock, getDeleteTodoMock} from './testHelper.js'

const testUser = "testUser";
let amountOfTodos = 3;
let propsData = {todos: getExampleTodos(3, testUser)};

let mocks;
let wrapper;

describe('rendering a todoList component', () => {
    propsData = {todos: getExampleTodos(3, testUser)};
    wrapper = mount(todoList, {propsData});
    it('shows the todoList', () => {
        expect(wrapper.contains('#todoList'));
    });
    it('contains right length of todos', () => {
        expect(wrapper.findAll('#todoText')).toHaveLength(amountOfTodos)
    });
    it('contains add button', () => {
        expect(wrapper.contains('#buttonAdd')).toBe(true);
        const addButton = wrapper.find('#buttonAdd');
        expect(addButton.text()).toBe("Add")
    });

    describe('when the add todo button is pressed', () => {
        amountOfTodos = 3;
        beforeEach(() => {
            propsData = {todos: getExampleTodos(amountOfTodos, testUser)};
            mocks = getCreateTodoMock(testUser);
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonAdd').trigger('click');
        });
        it('emits an createTodo event', () => {
            expect(wrapper.emitted('createTodo'));
        });
        it('attempts to call an apollo mutation', () => {
            expect(wrapper.vm.$apollo.mutate).toBeCalled()
        });
        describe('rerender the component', () => {
            beforeEach(() => {
                wrapper.vm.$nextTick();
                wrapper = mount(todoList, {mocks, propsData});
            });
            it('contains todos +1', () => {
                expect(wrapper.findAll('#todoText')).toHaveLength(amountOfTodos+1)
            });
        });
    });

    describe('when a deleteTodo event was emitted', () => {
        amountOfTodos = 3;
        beforeEach(() => {
            propsData = {todos: getExampleTodos(amountOfTodos, testUser)};
            mocks = getDeleteTodoMock();
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonDelete').trigger('click');
        });
        it('attempts to call an apollo mutation', () => {
            expect(wrapper.vm.$apollo.mutate).toBeCalled()
        });
        describe('rerender the component', () => {
            beforeEach(() => {
                wrapper.vm.$nextTick();
            });
            it('contains todos -1', () => {
                console.log(wrapper.text())
                expect(wrapper.findAll('#todoText')).toHaveLength(amountOfTodos-1)
            });
        });
    });

    describe('when the edit button was triggered', () => {
        beforeEach(async () => {
            mocks = getUpdateTodoMock();
            const todo = {id: "0", text: "first todo", user: {name: testUser, id: "0"}, editMode: false};
            propsData = {todos: [todo]};
            wrapper = mount(todoList, {mocks, propsData});
            wrapper.find('#buttonEdit').trigger('click');
            await wrapper.vm.$nextTick();
            wrapper = mount(todoList, {mocks, propsData}); // remounting is neccessary to update child component...
        });
        it('shows input field', () => {
            expect(wrapper.contains('#todoTextEdited')).toBe(true)
        });
        it('shows save button', () => {
            expect(wrapper.contains('#buttonSave')).toBe(true)
        });
        it('shows no edit button', () => {
            expect(wrapper.contains('#buttonEdit')).toBe(false)
        });
        it('shows no label', () => {
            expect(wrapper.contains('#todoText')).toBe(false)
        });
        describe('when triggering save button', () => {
            // should save todo and update in db
            beforeEach(async () => {
                mocks = getUpdateTodoMock();
                wrapper.find('#buttonSave').trigger('click');
            });
            it('attempts to call an apollo mutation', () => {
                expect(wrapper.vm.$apollo.mutate).toBeCalled()
            });
            describe('updates todo item component', () => {
                beforeEach( async () => {
                    await wrapper.vm.$nextTick();
                    wrapper = mount(todoList, {mocks, propsData});
                });
                it('shows edit button again', () => {
                    expect(wrapper.contains('#buttonEdit')).toBe(true)
                });
                it('shows no save button', () => {
                    expect(wrapper.contains('#buttonSave')).toBe(false)
                });
                it('shows text label again', () => {
                    expect(wrapper.contains('#todoText')).toBe(true)
                });
                it('shows no input field', () => {
                    expect(wrapper.contains('#todoTextEdited')).toBe(false)
                });
            });
        });
    });
});



