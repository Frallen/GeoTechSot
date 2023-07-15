<template>
  <div>
    <Error v-if="isError"></Error>
    <div v-else class="container">
      <router-view v-slot="{ Component }">
        <suspense>
          <component :is="Component"/>
        </suspense>
      </router-view>
      <Modal v-show="TaskModalState" @closeModal="TaskModalChanger(false);">
        <Form class="form" @submit="onSubmit"
              v-slot="{ setFieldValue, setValues }"
              :validation-schema="TaskSchema()">

          <div class="form-item">
            <label for="Date">Дата выполнениея</label>
            <Field id="Date" name="Date" v-slot="{ valid, meta, field }">
              <Calendar v-bind="field" v-model="formValues.Date"
                        dateFormat="dd/mm/yy"
                        :class="{ 'p-invalid': meta.touched && !meta.valid }"
                        aria-describedby="Date-help"/>

            </Field>
            <small id="Date-help">Впишите оборудонвание.</small>
          </div>
          <div class="form-item">
            <label for="Device">Приоритет</label>
            <Field id="Priority" name="Priority" v-slot="{ valid, meta, field }">
              <Dropdown v-model="formValues.Priority" @change="e=>setFieldValue('Priority',e.value)"
                        :options="Priority"
                        :class="{ 'p-invalid': meta.touched && !meta.valid }"

              />
            </Field>

            <small id="Priority-help">Впишите оборудонвание.</small>
          </div>
          <div class="form-item">
            <label for="Device">Оборудование</label>
            <Field id="Device" v-model="formValues.Device" name="Device" v-slot="{ valid, meta, field }">
              <InputText v-bind="field" aria-describedby="username-help"
                         :class="{ 'p-invalid': meta.touched && !meta.valid }"/>
            </Field>
            <small id="Device-help">Впишите оборудонвание.</small>
          </div>
          <div class="form-item">
            <label for="Message">Сообщение</label>
            <Field id="Message" v-model="formValues.Message" name="Message" v-slot="{ valid, meta, field }">
              <InputText v-bind="field" aria-describedby="username-help"
                         :class="{ 'p-invalid': meta.touched && !meta.valid }"/>
            </Field>
            <small id="Device-help">Впишите сообщение.</small>
          </div>
          <div class="form-item">
            <label for="Owner">Ответственный</label>
            <Field id="Owner" name="Owner" v-model="formValues.Owner" v-slot="{ valid, meta, field }">
              <InputText v-bind="field" aria-describedby="username-help"
                         :class="{ 'p-invalid': meta.touched && !meta.valid }"/>
            </Field>
            <small id="Owner-help">Впишите ответственного.</small>
          </div>
          <Button class="button" type="submit">Добавить</Button>
        </Form>
      </Modal>
    </div>
  </div>
</template>
<script setup lang="ts">
const {TaskModalChanger} = useMain()
const {isError, TaskModalState} = storeToRefs(useMain())
import {Form, Field} from "vee-validate"
import {taskType} from "./types/global.types";

const {CreateTask, Priority} = useMain()
const formValues = reactive<taskType>({
  Date: "",
  Priority: "Низкая",
  Device: "",
  Message: "",
  Owner: "",
  id: 1,
})
const onSubmit = (values: taskType, {resetForm}: any): void => {
  CreateTask(values)
  resetForm()
  formValues.Date = ""
  formValues.Priority = "Низкая"
}


</script>
<style lang="less">
.form {
  display: flex;
  flex-direction: column;

  &-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 1em 0 0;
  }

  &-item:first-child {
    margin: 0;
  }

  .button {
    margin: 1.2em 0 0;
    display: block;
  }
}
</style>
