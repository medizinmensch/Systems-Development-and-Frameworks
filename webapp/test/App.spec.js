import { mount } from '@vue/test-utils';
import app from '../src/App.vue';
import {USER, AUTH_TOKEN} from '../src/constants/settings.js'
import "babel-polyfill"

const title = "Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine";
const notLoggedInInfo = "You are not logged in.";
const loggedInInfo = "You are logged in";
const loginFormDivName = "loginForm";
const todoListDivName = "todoList";

describe('App.vue', () => {
  let wrapper = mount(app);

  describe("When App is loaded", () => {
    beforeEach(() => {
      wrapper = mount(app);
    });

    it("renders the login form", () => {
      const loginForm = wrapper.find({name: loginFormDivName});
      expect(loginForm.is("div")).toBe(true);
    });
    it("shows title & loginInfo", () => {
      expect(wrapper.text()).toContain(title);
      expect(wrapper.text()).toContain(notLoggedInInfo)
    });
    it('does not show todo list', () =>{
      expect(wrapper.contains({name: todoListDivName})).toBe(false)
    });

    it('has no local storage attributes', () =>{
      expect(localStorage.getItem(USER)).toBeNull();
      expect(localStorage.getItem(AUTH_TOKEN)).toBeNull;
    });

    describe("when logging in", () => {
      const tokenValue = "token1234";
      const userName = "testuser";
      beforeEach(async () => {
        const mocks = {$apollo: {
          query: jest.fn().mockResolvedValue({data: {todos: []}}),
          mutate: jest.fn().mockResolvedValue({data: {login: {token: tokenValue, user: userName}}})
        }};
        wrapper = mount(app, {mocks});
        // logging in
        const mailInput = wrapper.find('#inputMail');
        mailInput.setValue("testuser@aol.com");
        const passwordInput = wrapper.find('#inputPassword');
        passwordInput.setValue("test123");
        wrapper.find('#loginButton').trigger('click');
        await wrapper.vm.$nextTick();
      });
      it("updated loginInfo", () => {
        expect(wrapper.text()).toContain(loggedInInfo)
      });
      it("attempts to call an apollo query", () => {
        expect(wrapper.vm.$apollo.query).toBeCalled()
      });
      it("shows todoList", () => {
        expect(wrapper.contains('#todoList')).toBe(true)
      });
      it("has values in localStorage", () => {
        expect(localStorage.getItem(USER)).toBe(userName);
        expect(localStorage.getItem(AUTH_TOKEN)).toBe(tokenValue);
      });
    });
  });
});
