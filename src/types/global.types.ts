export interface taskType {
    Date: string
    Priority: priorityType
    Device: string
    Message: string
    Owner: string
    id:number,
    viewed?:true,
}

export type priorityType = "Низкая" | "Средняя" | "Высокая" | "Критическая"