<template>
  <div class="list">
    <div class="list-item" v-for="item in data" :key="item.id">
      <div class="list-item-info">
        <div class="info-item">Дата {{item.Date}}</div>
        <div class="info-item">Оборудование {{item.Device}}</div>
        <div class="info-item">Важность <Tag severity="success" :value="item.Priority"></Tag></div>
        <div class="info-item">Сообщение {{item.Message}}</div>
      </div>
      <div class="list-item-photo">
        <Avatar label="P" size="xlarge" shape="circle"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from 'primevue/avatar';
import {taskType} from "../types/global.types";
import Tag from 'primevue/tag';
interface propsType {
  data: taskType[]
}
const styledPriority=computed(()=>{

})
const {data} = defineProps<propsType>()
</script>
<style scoped lang="less">
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -15px 0 0 -15px;

  &-item {
    padding:15px 10px;
    margin: 15px 0 0 15px;
    width: 300px;
    .br(15px);
    background: #fff;
    box-shadow: 0 2px 3px 0 #333;
    display:flex;
    justify-content: space-between;

    &-info{

    }
  }
}
</style>