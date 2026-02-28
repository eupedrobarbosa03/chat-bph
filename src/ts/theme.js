const iconBot = document.querySelector("#icon_bot");
const changeTheme = document.querySelector("#icon_change_theme");
const chatBot = document.querySelectorAll(".chat_bot");
const chatUser = document.querySelectorAll(".chat_user");
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
    light() {
        Object.values(this.elements).forEach((element) => element.classList.remove("theme_dark"));
        document.body.classList.remove("theme_dark");
        iconBot.src = 'assets/icons/tecnologia.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-moon moon");
        chatUser.forEach((chat) => chat.classList.remove("theme_dark"));
    }
    ;
    dark() {
        Object.values(this.elements).forEach((element) => element.classList.add("theme_dark"));
        document.body.classList.add("theme_dark");
        iconBot.src = 'assets/icons/tecnologia_light.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-sun sun");
        chatUser.forEach((chat) => chat.classList.add("theme_dark"));
    }
    ;
}
;
changeTheme?.addEventListener("click", () => {
    const theme = new Theme();
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light();
});
export {};
