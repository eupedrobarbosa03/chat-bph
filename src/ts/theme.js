const iconBot = document.querySelector("#icon_bot");
const changeTheme = document.querySelector("#icon_change_theme");
if (!localStorage.getItem("theme"))
    localStorage.setItem("theme", "active");
;
let isThemeDark = false;
class Theme {
    elements;
    constructor() {
        this.elements = {
            headerTitle: document.querySelector("#header_title"),
            chatContainer: document.querySelector("#box_container_chat"),
            containerSend: document.querySelector("#container_send_message"),
            messageUser: document.querySelector("#message_user"),
            send: document.querySelector("#container_send")
        };
    }
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
        Object.values(this.elements).forEach((element) => element.classList.remove("theme_dark"));
        document.body.classList.remove("theme_dark");
        iconBot.src = 'assets/icons/tecnologia.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-moon moon");
        localStorage.setItem("theme", "inactive");
        this.chatTheme("remove");
    }
    ;
    dark() {
        Object.values(this.elements).forEach((element) => element.classList.add("theme_dark"));
        document.body.classList.add("theme_dark");
        iconBot.src = 'assets/icons/tecnologia_light.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-sun sun");
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
    applyingThemeChatUser() {
        const storage = localStorage.getItem("theme");
        if (!storage)
            return;
        storage === "active" ? this.chatTheme("add") : this.chatTheme("remove");
    }
}
;
export const theme = new Theme();
theme.themeStorage();
changeTheme?.addEventListener("click", () => {
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light();
});
