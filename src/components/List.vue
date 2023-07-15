<template>
  <div>
    <template v-if="Tasks&&Tasks.length>0">
      <div class="list">
        <transition-group name="fade">
          <Card class="list-item" :tabindex="item.id" @keydown.space.prevent="SetViewed(item.id)"
                :class="{'viewed':item.viewed}"
                v-for="item in preparedTaskList(currentPage)"
                :key="item.id"
          >
            <template #header>
              <div class="list-item-photo">
                <Avatar label="P" size="xlarge" shape="circle"/>

              </div>
            </template>
            <template #title>
              <div class="name">{{ item.Owner }}</div>
            </template>
            <template #subtitle> Card subtitle</template>
            <template #content>
              <div class="list-item-info">
                <div class="info-item"><span class="title">Дата</span> {{ item.Date }}</div>
                <div class="info-item"><span class="title">Оборудование</span> {{ item.Device }}</div>
                <div class="info-item"><span class="title">Важность</span>
                  <Tag :severity="styledPriority(item.Priority)" :value="item.Priority"></Tag>
                </div>
                <div class="info-item-text"><span class="title">Сообщение</span> {{ item.Message }}</div>
              </div>
            </template>
            <template #footer>
              <Button label="Окрыть" @click="ViewModalChanger(true),listItem=item" style="width: 100%"/>
            </template>
          </Card>
        </transition-group>
      </div>
      <Paginator
          class="paginator"
          @page="e=>currentPage=e.page+1" :rows="10"
          :first="firstFromPage(currentPage, 10)"
          :totalRecords="Tasks.length"
          :rowsPerPageOptions="[10]"></Paginator>
    </template>
    <div class="empty"><h3>Не найдено задач</h3></div>
    <Modal v-if="ViewModalState" @closeModal="ViewModalChanger(false);">
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
import {taskType} from "../types/global.types";

const {ViewModalChanger, SetViewed} = useMain()
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
const listItem = ref<taskType>({} as taskType)

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
    color: @black;
    .br(15px);
    width: calc(100% / 4 - 15px);
    background: #fff;
    position: relative;
    user-select: none;
    .trs(0.3s);
    @media @xl {
      width: calc(100% / 3 - 15px);
    }
    @media @lg {
      width: calc(100% / 2 - 15px);
    }
    @media @sm {
      width: 100%;
      flex-direction: column-reverse;
    }

    &-info {
      @media @sm {
        width: 100%;
        margin: 1em 0 0 0;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 1em 0 0 0;

        .title {
          font-weight: 700;
        }
      }

      .info-item-text {
        margin: 15px 0 0;

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
      @media @sm {
        width: 100%;
      }

      .name {
        margin: 10px 0 0 0;
        font-size: 1em;
      }
    }
  }

  &-item:focus {
    .trs(0.3s);
    outline: none;
    box-shadow: 0 0 5px #6366F1;
    transform: scale(0.9);
  }
}

.empty {
  text-align: center;
  margin: 20em 0;
}

.viewed {
  filter: brightness(0.5);
}

.paginator {
  margin: 1em 0 0;
}

.list-item-modal {
  display: flex;
  flex-direction: column-reverse;

  .list-item-info {
    width: 100%
  }

  .info-item-text {
    display: block !important;
    overflow: auto;
    max-height: 150px;
  }
}
</style>