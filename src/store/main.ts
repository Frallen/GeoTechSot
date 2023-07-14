import {priorityType, taskType} from "../types/global.types";
import {useCookies} from '@vueuse/integrations/useCookies'
import {format} from "date-fns";

interface stateType {
    ModalState: boolean
    isError: boolean
    Tasks: taskType[]
    Priority: priorityType[]
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        isError: false,
        ModalState: false,
        Priority: [
            "Низкая",
            "Средняя",
            "Высокая",
            "Критическая"
        ],
        Tasks: []
    }),
    getters: {},
    actions: {
        async ModalChanger(state: boolean) {
            this.ModalState = state
            overFlow(state)
        },
        async PrepareTasks() {
            try {
                //Тестовые базовые данные
                const baseData: taskType[] = [
                    {
                        id: Math.random(),
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "Вегас",
                        Message: "Сервер вегас недоступен",
                        Owner: "Смиронов В.А.",
                        Priority: "Высокая",
                    },
                    {
                        id: Math.random(),
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "ИБП",
                        Message: "Низкий заряд батареи",
                        Owner: "Лавочкин А.А.",
                        Priority: "Низкая",
                    },
                    {
                        id: Math.random(),
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "ЛВС",
                        Message: "Обрыв силового кабеля",
                        Owner: "Ветрова И.С.",
                        Priority: "Критическая",
                    }]

                const {
                    get,
                    getAll,
                    set,
                    remove,
                    addChangeListener,
                    removeChangeListener
                } = useCookies(['task'], {doNotParse: false, autoUpdateDependencies: false})
                const snap = get("task")

                if (snap && snap.length > 0) {
                    this.Tasks = [...baseData, ...snap]
                } else {
                    this.Tasks = [...baseData]
                }
            } catch (e) {
                this.isError = true
            }
        },
        async CreateTask(data: taskType) {
            try {
                data.id=Math.random()
                data.Date=format(new Date(data.Date), "dd/MM/yyyy")
                const {
                    get,
                    getAll,
                    set,
                    remove,
                    addChangeListener,
                    removeChangeListener
                } = useCookies(['task'], {doNotParse: false, autoUpdateDependencies: false})
                const snap = get("task")

                if (snap && snap.length > 0) {
                    set("task", [...snap, data])
                } else {
                    set("task", [data])
                }
                this.PrepareTasks()
                this.ModalState = false
            } catch (e) {
                this.isError = true
            }
        }

    }

})