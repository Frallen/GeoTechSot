<template>
  <div>
    <div class="list">
      <div class="list-item" v-for="item in preparedTaskList(currentPage)" :key="item.id"
           @click="e=>{e.currentTarget.classList.add('viewed'),ViewModalChanger(true),listItem=item}">
        <div class="list-item-info">
          <div class="info-item"><span class="title">Дата</span> {{ item.Date }}</div>
          <div class="info-item"><span class="title">Оборудование</span> {{ item.Device }}</div>
          <div class="info-item"><span class="title">Важность</span>
            <Tag :severity="styledPriority(item.Priority)" :value="item.Priority"></Tag>
          </div>
          <div class="info-item-text"><span class="title">Сообщение</span> {{ item.Message }}</div>
        </div>
        <div class="list-item-photo">
          <Avatar label="P" size="xlarge" shape="circle"/>
          <div class="name">{{ item.Owner }}</div>
        </div>
      </div>
    </div>
    <Paginator @page="e=>currentPage=e.page+1" :rows="10" :first="firstFromPage(currentPage, 10)"
               :totalRecords="Tasks.length"
               :rowsPerPageOptions="[10]"></Paginator>
    <Modal v-if="ViewModalState" @closeModal="ViewModalChanger(false)">
      <div class="list-item-modal">
        <div class="list-item-info">
          <div class="info-item"><span class="title">Дата</span> {{ listItem.Date }}</div>
          <div class="info-item"><span class="title">Оборудование</span> {{ listItem.Device }}</div>
          <div class="info-item"><span class="title">Важность</span>
            <Tag :severity="styledPriority(listItem.Priority)" :value="listItem.Priority"></Tag>
          </div>
          <div class="info-item-text"><span class="title">Сообщение</span> {{ listItem.Message }}</div>
        </div>
        <div class="list-item-photo">
          <Avatar label="P" size="xlarge" shape="circle"/>
          <div class="name">{{ listItem.Owner }}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import Paginator from 'primevue/paginator';
import {taskType} from "../types/global.types";

const {ViewModalChanger} = useMain()
const {preparedTaskList, Tasks, ViewModalState} = storeToRefs(useMain())
const {query} = useRoute()
const router = useRouter()
const currentPage = ref<number>(parseInt(query.page as string) || 1)

const Prepare = () => {
  router.push({
    query: {
      page: currentPage.value
    }
  })
}
const listItem = ref<taskType>()

watch(currentPage, () => {
  Prepare()
}, {immediate: true})

const firstFromPage = (page: number, perPage: number): number => {
  return perPage * (page - 1);
};


</script>
<style scoped lang="less">
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -15px 0 0 -15px;

  &-item {
    padding: 15px 10px;
    margin: 15px 0 0 15px;
    width: 400px;
    .br(15px);
    background: #fff;
    box-shadow: 0 2px 3px 0 #333;
    display: flex;
    justify-content: space-between;
    @media @lg {
      width: calc(100% / 2 - 15px);
    }
    @media @sm {
      width: 100%;
      flex-direction: column-reverse;
    }

    &-info {
      width: 68%;
      @media @sm {
        width: 100%;
        margin: 1em 0 0 0;
      }

      .info-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
        margin: 1em 0 0 0;

        .title {
          width: 50%;
          font-weight: 700;
        }
      }

      .info-item-text {
        margin:15px 0 0;
        span {
          font-weight: 700;
          display: block;
        }

        overflow: hidden;
        .text-eclipse(2);
        max-height: 50px;

      }
    }

    &-photo {
      text-align: center;
      width: 30%;
      @media @sm {
        width: 100%;
        text-align: right;
      }

      .name {
        margin: 10px 0 0 0;
        font-size: 1em;
      }
    }
  }

  &-item:focus {
    border: 1px solid red;
  }
}
.viewed{
  filter: brightness(0.5);
}

.list-item-modal {
  display: flex;
  flex-direction: column-reverse;
  .list-item-info{
    width:100%
  }
  .info-item-text{
    display:block !important;
    overflow:auto;
    max-height: 150px;
  }
}
</style>