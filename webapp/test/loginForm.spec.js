//shows login label
//has two buttons
//has input fields


import {mount} from "@vue/test-utils";
import loginForm from "../src/components/loginForm.vue";

describe('loginForm.vue', () => {
    let wrapper = mount(loginForm);
    it("shows login label", () => {
        expect(wrapper.text()).toContain("Login")
    });
    it("has login & logout button", () => {
        expect(wrapper.contains('#loginButton')).toBe(true);
        expect(wrapper.contains('#logoutButton')).toBe(true);
    });
    it("has input fields", () => {
        expect(wrapper.contains('#inputMail')).toBe(true);
        expect(wrapper.contains('#inputPassword')).toBe(true);
    });

    // emit click event, trigger apollo mutate
});
