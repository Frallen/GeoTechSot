

export const overFlow = (state: boolean): void => {

    if (state) {
        document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "visible";

};

export const styledPriority = (reason: string) => {
    switch (reason) {
        case "Низкая": {
            return "success"
        }
        case "Средняя": {
            return "info"
        }
        case "Высокая": {
            return "warning"
        }
        case "Критическая": {
            return "danger"
        }
    }
}
