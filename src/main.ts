import { createApp } from "vue";
import { createPinia } from "pinia";
import { create, NButton } from "naive-ui";

import App from "./App.vue";
import router from "./router";

const naive = create({
  components: [NButton],
});

const app = createApp(App);

app.use(naive);
app.use(router);
app.use(createPinia());

app.mount("#app");
