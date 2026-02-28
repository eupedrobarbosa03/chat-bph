const iconBot = document.querySelector<HTMLImageElement>("#icon_bot");
const changeTheme = document.querySelector<HTMLInputElement>("#icon_change_theme");
const chatBot = document.querySelectorAll<HTMLDivElement>(".chat_bot")
const chatUser = document.querySelectorAll<HTMLDivElement>(".chat_user")

if (!localStorage.getItem("theme")) localStorage.setItem("theme", "inactive");

interface Element<T> {
    headerTitle: T;
    chatContainer: T;
    containerSend: T;
    messageUser: T;
    send: T;
};

let isThemeDark: boolean = false;

class Theme {
    private elements: Element<any>;
    constructor() {
        this.elements = {
            headerTitle: document.querySelector<HTMLInputElement>("#header_title"),
            chatContainer: document.querySelector<HTMLInputElement>("#box_container_chat"),
            containerSend: document.querySelector<HTMLInputElement>("#container_send_message"),
            messageUser: document.querySelector<HTMLInputElement>("#message_user"),
            send: document.querySelector<HTMLInputElement>("#container_send")
        }
    };

    public light(): void {
        Object.values(this.elements).forEach((element) => element.classList.remove("theme_dark"));
        document.body.classList.remove("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-moon moon");
        chatUser.forEach((chat) => chat.classList.remove("theme_dark"));
        localStorage.setItem("theme", "");
    };

    public dark(): void {
        Object.values(this.elements).forEach((element) => element.classList.add("theme_dark"));
        document.body.classList.add("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia_light.png'
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-sun sun");
        chatUser.forEach((chat) => chat.classList.add("theme_dark"));
        localStorage.setItem("theme", "active")
    };

    public themeStorage(): void {
        const storage = localStorage.getItem("theme");
        if (!storage) return;
        storage
    };

};

const theme = new Theme();

changeTheme?.addEventListener("click", () => {
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light()
});