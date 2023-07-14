<template>
  <div class="search">
    <span class="p-input-icon-left">
    <i class="pi pi-search"/>
    <InputText v-model="inputValue" placeholder="Search"/>
</span>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';

const inputValue = ref<string>()
//const {searchValue} = storeToRefs(useMain())

</script>
<style scoped lang="less">
.search {
  .br(100px);
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #fff;

  span {
    display: block;
    margin: 0 8px 0 0;
  }

  .input {
    width: 90%;
  }
}
</style>