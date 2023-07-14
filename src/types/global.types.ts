export interface taskType {
    Date: string
    Priority: priorityType
    Device: string
    Message: string
    Owner: string
    id:number,
}

export type priorityType = "Низкая" | "Средняя" | "Высокая" | "Критическая"