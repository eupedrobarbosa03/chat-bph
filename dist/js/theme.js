const iconBot = document.querySelector("#icon_bot");
if (!localStorage.getItem("theme"))
    localStorage.setItem("theme", "active");
let isThemeDark = false;
class Theme {
    constructor() { }
    ;
    chatTheme(method) {
        const chatUser = document.querySelectorAll(".chat_user");
        const chatBot = document.querySelectorAll(".chat_bot");
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
    }
    ;
    light() {
        document.body.classList.remove("theme_dark");
        iconBot.src = 'assets/icons/tecnologia.png';
        localStorage.setItem("theme", "inactive");
        this.chatTheme("remove");
    }
    ;
    dark() {
        document.body.classList.add("theme_dark");
        iconBot.src = 'assets/icons/tecnologia_light.png';
        localStorage.setItem("theme", "active");
        this.chatTheme("add");
    }
    ;
    themeStorage() {
        const storage = localStorage.getItem("theme");
        if (!storage)
            return;
        storage === "inactive" ? this.light() : this.dark();
    }
    ;
}
;
export const theme = new Theme();
theme.themeStorage();
document.body.addEventListener("dblclick", () => {
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light();
});
