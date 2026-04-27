const iconBot = document.querySelector<HTMLImageElement>("#icon_bot");
if (!localStorage.getItem("theme")) localStorage.setItem("theme", "active");

let isThemeDark: boolean = false;

class Theme {
    constructor() {};

    private chatTheme(method: "add" | "remove") {
        const chatUser = document.querySelectorAll<HTMLDivElement>(".chat_user");
        const chatBot = document.querySelectorAll<HTMLDivElement>(".chat_bot");
        switch (method) {
            case "add":
                chatUser.forEach((chat) => chat.classList.add("theme_dark"));
                chatBot.forEach((chat) => chat.classList.add("theme_dark"));
                break;
            case "remove":
                chatUser.forEach((chat) => chat.classList.remove("theme_dark"));
                chatBot.forEach((chat) => chat.classList.remove("theme_dark"));
                break;
            default:
                break;
        }
    };

    public light(): void {
        document.body.classList.remove("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia.png';
        localStorage.setItem("theme", "inactive");
        this.chatTheme("remove")
    };

    public dark(): void {
        document.body.classList.add("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia_light.png'
        localStorage.setItem("theme", "active");
        this.chatTheme("add");
    };

    public themeStorage(): void {
        const storage = localStorage.getItem("theme");
        if (!storage) return;
        storage === "inactive" ? this.light() : this.dark();
    };


};


export const theme = new Theme();

theme.themeStorage();

document.body.addEventListener("dblclick", () => {
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light();
})
