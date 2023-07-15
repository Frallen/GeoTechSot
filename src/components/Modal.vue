<template>
  <transition name="fade">
    <div class="modal-wrapper" @click="emit('closeModal')">
      <div class="modal" @click.stop>
        <div class="modal-head">
          <div class="icon" @click.stop="emit('closeModal')">
            <i class="pi pi-times"></i>
          </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: "closeModal"): void }>()
</script>

<style scoped lang="less">
.modal-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 65%);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  .br(15px);
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  min-width: 360px;
  max-width: 360px;
  @media @sm {
    min-width: 320px;
    max-width: 320px;
  }

  &-head {
    display: flex;
    justify-content: flex-end;

    .icon {
      cursor: pointer;
    }
  }

  &-body {
    position: relative;
    @media @sm {
      padding: 2em 10px 1.5em;
    }
  }
}
</style>