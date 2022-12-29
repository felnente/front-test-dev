import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/contacts",
            name: "contacts",
            component: () => import("./components/Contacts")
        },

        {
            path: "/contact/create",
            name: "contact-create",
            component: () => import("./components/ContactCreate")
        },
        {
            path: "/contact/edit/:id",
            name: "contact-edit",
            component: () => import("./components/ContactEdit")
        },
        {
            path: "/contact/addresses",
            name: "contact-addresses",
            component: () => import("./components/ContactEdit")
        }
    ]
});
