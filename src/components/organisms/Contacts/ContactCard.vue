<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";

interface Props {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  loading?: boolean;
}

const props = defineProps<Props>();

const createdAt = computed(() => dayjs(props.createdAt).format("DD/MM/YYYY"));
</script>

<template>
  <section class="contactView__info">
    <div class="info__wrap">
      <p class="info__title">Name:</p>
      <p class="info__value">
        <el-skeleton v-if="loading" :rows="0" animated />
        <template v-else> {{ props.name }} </template>
      </p>
    </div>

    <div class="info__wrap">
      <p class="info__title">email:</p>
      <p class="info__value info__email" :title="props.email">
        <el-skeleton v-if="loading" :rows="0" animated />
        <template v-else> {{ props.email }} </template>
      </p>
    </div>

    <div class="info__wrap">
      <p class="info__title">Phone:</p>
      <p class="info__value">
        <el-skeleton v-if="loading" :rows="0" animated />
        <template v-else> {{ props.phone }} </template>
      </p>
    </div>

    <div class="info__wrap">
      <p class="info__title">Created at:</p>
      <p class="info__value">
        <el-skeleton v-if="loading" :rows="0" animated />
        <template v-else> {{ createdAt }} </template>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "sass:map";
@use "@sass/fonts" as fonts;
@use "@sass/colors" as colors;
@use "@sass/breakpoints" as bp;

.contactView__info,
.info__wrap {
  display: grid;
}

.contactView__info {
  row-gap: 16px;
  border: 1px solid map.get(colors.$neutrals, "border");
  border-radius: 8px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow: hidden;
}

.info {
  &__wrap {
    gap: 16px;
  }

  &__title {
    color: map.get(colors.$neutrals, "darkBlue");
    font: map.get(fonts.$bold, "large");
  }

  &__value {
    color: #495057;
    font: map.get(fonts.$paragraph, "medium");
  }

  &__email {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media screen and (min-width: map.get(bp.$breakpoints, "360")) {
  .info__wrap {
    grid-template-columns: 2fr 10fr;
  }
}
</style>
