<template>
  <DataTable :value="data" v-model:selection="selectedRow" v-model:filters="filters"
             dataKey="id"
             :paginator="true" :rows="5"
             tableStyle="min-width: 30rem"
             :rowsPerPageOptions="[5, 10, 25]" filterDisplay="row"
             :globalFilterFields="['Message']">
    <template #header>
      <div class="search-end">
            <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Сообщение"/>
            </span>
      </div>
    </template>
    <template #empty> No customers found.</template>
    <template #loading> Loading customers data. Please wait.</template>
    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
    <Column field="Date" header="Дата"></Column>
    <Column field="Priority" header="Важность"></Column>
    <Column field="Device" header="Оборудование"></Column>
    <Column field="Message" header="Сообщение"></Column>
    <Column field="Owner" header="Ответственный"></Column>
    <Column field="viewed" header="Просмотренно"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import {FilterMatchMode} from 'primevue/api';
import {taskType} from "../types/global.types";

const {SetViewed} = useMain()
const selectedRow = ref<taskType>()
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

watch(selectedRow, () => {
  SetViewed(selectedRow.value?.id as number)

})

interface propsType {
  data: taskType[]
}

const {data} = defineProps<propsType>()

</script>
<style scoped lang="less">
.search-end {
  text-align: right;
}
</style>