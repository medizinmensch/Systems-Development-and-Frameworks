import { mount } from '@vue/test-utils';
import app from '../src/App.vue';
import {USER, AUTH_TOKEN} from '../src/constants/settings.js'

const title = "Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine";
const notLoggedInInfo = "You are not logged in.";
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

    // dont test logging in because its not testing only components?
    //describe("when logging in", async () => {
    //  beforeEach(async () => {
    //    wrapper = mount(app);
    //    // logging in
    //    const mailInput = wrapper.find('#inputMail');
    //    mailInput.setValue("admin@aol.com");
    //    const passwordInput = wrapper.find('#inputPassword');
    //    passwordInput.setValue("admin123");
    //    wrapper.find('#loginButton').trigger('click');
    //    await wrapper.vm.$nextTick();
    //  });
    //  it("updated loginInfo", () => {
    //    console.log(wrapper.text());
    //    expect(wrapper.text()).toContain(loggedInInfo)
    //  });
    //  it("shows todoList", () => {
//
    //  });
    //});
  });
});
