import { mount } from '@vue/test-utils';
import loginForm from '../src/components/loginForm.vue';

describe('loginForm.vue', () => {
    const wrapper = mount(loginForm, {
        propsData: {
            input: {
                email: "admin@aol.com",
                password: "admin123"
            },
        }
    });
    const submitButton = wrapper.findAll('button').at(0);
    const apollo = {
        mutate: jest.fn().mockResolvedValueOnce({
            data: {
                login: "some-token"
            }
        })
    }

    describe('when the edit button is pressed', () => {
        submitButton.trigger('click');
        it('emits a ToggleEditMode event', () => {
            expect(wrapper.emitted('login'));
        });

        it('apollo client is triggered', () => {
            expect(apollo.mutate).toHaveBeenCalledTimes(1)
        });
    });
});
