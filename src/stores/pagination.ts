import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => ({
    currentPage: 1,
  }),

  getters: {
    getCurrentPage(): number {
      return this.currentPage;
    },
  },

  actions: {
    setCurrentPage(currentPage: number = 1) {
      this.currentPage = currentPage;
    },
  },
});
