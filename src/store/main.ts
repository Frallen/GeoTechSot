import {priorityType, taskType} from "../types/global.types";
import {useCookies} from '@vueuse/integrations/useCookies'
import {format} from "date-fns";

interface stateType {
    TaskModalState: boolean
    isError: boolean
    Tasks: taskType[]
    Priority: priorityType[]
    ListSearchQuery: string
    ViewModalState: boolean
}

export const useMain = defineStore('main', {
    state: (): stateType => ({
        isError: false,
        TaskModalState: false,
        ViewModalState: false,
        Priority: [
            "Низкая",
            "Средняя",
            "Высокая",
            "Критическая"
        ],
        Tasks: [],
        ListSearchQuery: ""
    }),
    getters: {
        preparedTaskList: (state) => {
            return (pageNumber: number): taskType[] => {
                const pageSize = 10; // Размер порции (количество записей на одной странице)
                const startIndex = (pageNumber - 1) * pageSize; // Индекс начала порции записей
                const endIndex = startIndex + pageSize; // Индекс конца порции записей

                const data = state.Tasks.slice(startIndex, endIndex);
                return state.ListSearchQuery
                    ? data.filter((p) =>
                        p.Message.toLowerCase().includes(state.ListSearchQuery.toLowerCase())
                    )
                    : data;
            }
        },

    },
    actions: {
        async TaskModalChanger(state: boolean) {
            this.TaskModalState = state
            overFlow(state)
        },
        async ViewModalChanger(state: boolean) {
            this.ViewModalState = state
            overFlow(state)
        },
        async PrepareTasks() {
            try {
                //Тестовые базовые данные
                const baseData: taskType[] = [
                    {
                        id: 1,
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "Вегас",
                        Message: "Сервер вегас недоступен",
                        Owner: "Смиронов В.А.",
                        Priority: "Высокая",
                    },
                    {
                        id: 2,
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "ИБП",
                        Message: "Низкий заряд батареи",
                        Owner: "Лавочкин А.А.",
                        Priority: "Низкая",
                    },
                    {
                        id:3,
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "ЛВС",
                        Message: "Обрыв силового кабеля",
                        Owner: "Ветрова И.С.",
                        Priority: "Критическая",
                    }]
               /* for (let i = 0; i <= 10; i++) {
                    baseData.push({
                        id: this.Tasks[this.Tasks.length-1].id+1,
                        Date: format(new Date(), "dd/MM/yyyy"),
                        Device: "ЛВС",
                        Message: "Обрыв силового кабеля",
                        Owner: "Ветрова И.С.",
                        Priority: "Критическая",
                    })
                }*/

                const {
                    get,
                    getAll,
                    set,
                    remove,
                    addChangeListener,
                    removeChangeListener
                } = useCookies(['task'], {doNotParse: false, autoUpdateDependencies: false})
                const snap = get("task") as taskType[]

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
                data.id = this.Tasks[this.Tasks.length-1].id+1??1
                data.Date = format(new Date(data.Date), "dd/MM/yyyy")
                const {
                    get,
                    getAll,
                    set,
                    remove,
                    addChangeListener,
                    removeChangeListener
                } = useCookies(['task'], {doNotParse: false, autoUpdateDependencies: false})
                const snap = get("task") as taskType[]

                if (snap && snap.length > 0) {
                    set("task", [...snap, data])
                } else {
                    set("task", [data])
                }
                this.PrepareTasks()
                this.TaskModalState = false
            } catch (e) {
                this.isError = true
            }
        },
        async SetViewed(id: number) {
            const {
                get,
                getAll,
                set,
                remove,
                addChangeListener,
                removeChangeListener
            } = useCookies(['task'], {doNotParse: false, autoUpdateDependencies: false})
            const snap = get("task") as taskType[]
            set("task", snap.map(p => {
                if (p.id === id) {
                    p.viewed = true
                    return p
                }
            }))
        }

    }

})