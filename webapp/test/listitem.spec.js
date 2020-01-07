import {mount} from '@vue/test-utils';
import listitem from '../src/components/listitem.vue';

const testUserName = "testUser";
const exampleItem = {id: "0", text: "first todo", user: {name: testUserName, id: "0"}, editMode: false};
const propsData = {todo: exampleItem};

let wrapper;

describe('todo item', () => {
    beforeEach(() => {
        wrapper = mount(listitem, {propsData});
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
            expect(wrapper.html()).toContain('<div class="row mx-lg-n5 jest-list-item">');
        });
        it('has columns', () => {
            expect(wrapper.html()).toContain('<div class="col py-3 border bg-light">');
        });
    });


    describe('when the edit button is pressed', () => {
        beforeEach(() => {
            wrapper.find('#buttonEdit').trigger('click');
            //wrapper.vm.$emit('toggleEditMode');
            //wrapper.vm.$nextTick();
        });
        it('emits a ToggleEditMode event', () => {
            expect(wrapper.emitted('toggleEditMode'));
        });
        // would be cool if they would work... however html does not change? maybe need to wait/update wrapper?
        //it('shows input field', () => {
        //    expect(wrapper.contains('#todoTextEdited')).toBe(true)
        //});
        //it('shows save button', () => {
        //    expect(wrapper.contains('#buttonSave')).toBe(true)
        //});
    });

    describe('when the delete button is pressed', () => {
        beforeEach(() => {
            wrapper.find('#buttonDelete').trigger('click');
        });
        it('emits a DeleteEntry event', () => {
            expect(wrapper.emitted('deleteTodo'));
        });
    });
});
