<template>
  <div>
    <Error v-if="isError"></Error>
    <div v-else class="container">
      <suspense>
        <router-view v-slot="{ Component }">
          <component :is="Component"/>
        </router-view>
      </suspense>
      <Navigation></Navigation>
    </div>
  </div>
</template>
<script setup lang="ts">
const {isError} = storeToRefs(useMain())

</script>
<style lang="less">

</style>
