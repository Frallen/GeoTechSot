<template>
  <div class="wrapper">
    <div class="panel">
      <div class="panel-heading">
        <div class="panel-heading-view">
          <ToggleButton class="button" onIcon="pi pi-table" off-icon="pi pi-id-card" v-model="viewState"
                        onLabel="Таблица" offLabel="Карточки"
          >
          </ToggleButton>
          <Button class="button" @click="ModalChanger(true)">Добавить задачу</Button>
        </div>
        <div class="panel-heading-actions">
          <Seacrch v-show="!viewState"></Seacrch>
        </div>
      </div>
      <div class="panel-body">
        <Table v-show="viewState" :data="Tasks"></Table>
        <List v-show="!viewState" :data="Tasks"></List>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';

const viewState = ref<boolean>(true)
const {PrepareTasks, ModalChanger} = useMain()
const {Tasks} = storeToRefs(useMain())
await PrepareTasks()
</script>

<style scoped lang="less">
.wrapper {
  padding: 1vh 1vw;

  .panel {

    &-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media @md {
        flex-direction: column;
        align-items: flex-start;
      }

      &-view {
        @media @md {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width:100%;
        }

        .button {
          margin: 0 0 0 15px;
          @media @md {
            margin: 0;
          }
        }

        .button:first-child {
          margin: 0;
        }
      }
      &-actions{
        @media @md {
          align-self: center;
          margin: 1em 0 0;
        }

      }
    }

    &-body {
      margin: 1em 0 0;
    }
  }
}
</style>