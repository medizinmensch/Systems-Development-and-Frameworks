import {mount} from '@vue/test-utils';
import todo from '../src/components/todo.vue';
import "babel-polyfill"

const testUserName = "testUser";
const exampleItem = {id: "0", text: "first todo", user: {name: testUserName, id: "0"}, editMode: false};
const propsData = {todo: exampleItem};

let wrapper;

describe('todo item', () => {
    beforeEach(() => {
        wrapper = mount(todo, {propsData});
    });
    it('shows text of todo item', () => {
        expect(wrapper.contains('#todoText')).toBe(true);
        expect(wrapper.find('#todoText').text()).toBe(exampleItem.text);
    });
    it('shows user name in todo', () => {
        expect(wrapper.find('#username').text()).toBe(testUserName)
    });
    it('has an edit button', () => {
        expect(wrapper.contains('#buttonEdit')).toBe(true);
        expect(wrapper.find('#buttonEdit').text()).toBe("Edit");
    });
    it('has a delete button', () => {
        expect(wrapper.contains('#buttonDelete')).toBe(true);
        expect(wrapper.find('#buttonDelete').text()).toBe("Delete");
    });

    it('does not show the save button immediately', () => {
        expect(wrapper.contains('#buttonSave')).toBe(false);
    });
    it('does not show the edit input immediately', () => {
        expect(wrapper.contains('#todoTextEdited')).toBe(false);
    });

    describe('layout', () => {
        it('has rows', () => {
            expect(wrapper.html()).toContain('class="row mx-lg-n5 jest-list-item"');
        });
        it('has columns', () => {
            expect(wrapper.html()).toContain('class="col-1 py-md-3 border bg-light"');
        });
    });


    describe('when the edit button is pressed', () => {
        beforeEach( () => {
            wrapper = mount(todo, {propsData});
            wrapper.find('#buttonEdit').trigger('click');
        });
        it('emits a ToggleEditMode event', () => {
            expect(wrapper.emitted('toggleEditMode'));
        });
        // would be cool if they would work... however html does not change? maybe need to wait/update wrapper?
    });

    describe('when the delete button is pressed', () => {
        beforeEach(() => {
            wrapper = mount(todo, {propsData});
            wrapper.find('#buttonDelete').trigger('click');
        });
        it('emits a DeleteEntry event', () => {
            expect(wrapper.emitted('deleteTodo'));
        });
    });
});
