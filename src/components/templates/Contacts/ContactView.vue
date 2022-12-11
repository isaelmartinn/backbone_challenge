<script setup lang="ts">
const emit = defineEmits<{
  (e: "on-click-go-back"): void;
}>();
</script>

<template>
  <main class="contactView">
    <el-page-header @back="emit('on-click-go-back')">
      <template #content>
        <h1>View contact</h1>
      </template>
    </el-page-header>

    <section class="contactView__info">
      <div class="info__wrap">
        <p class="info__title">Name:</p>
        <p class="info__value">Kelley23456 Macejkovic2</p>
      </div>

      <div class="info__wrap">
        <p class="info__title">email:</p>
        <p class="info__value">Jacynthe_Heaney390@yahoo.com</p>
      </div>

      <div class="info__wrap">
        <p class="info__title">Phone:</p>
        <p class="info__value">3597916594</p>
      </div>

      <div class="info__wrap">
        <p class="info__title">Created at:</p>
        <p class="info__value">2022-05-22</p>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;
@use "@sass/colors" as colors;

.contactView,
.contactView__info,
.info__wrap {
  display: grid;
}

.contactView {
  width: min(100%, 800px);
  margin: 50px auto 0 auto;
  row-gap: 30px;
}

.contactView__info {
  row-gap: 16px;
  border: 1px solid map.get(colors.$neutrals, "border");
  border-radius: 8px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.info {
  &__wrap {
    grid-template-columns: 2fr 10fr;
    align-items: st;
  }

  &__title {
    color: map.get(colors.$neutrals, "darkBlue");
    font: map.get(fonts.$bold, "large");
  }

  &__value {
    color: #495057;
    font: map.get(fonts.$paragraph, "medium");
  }
}

h1 {
  font: map.get(fonts.$paragraph, "medium");
}
</style>
