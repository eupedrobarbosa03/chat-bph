const iconBot = document.querySelector<HTMLImageElement>("#icon_bot");
const changeTheme = document.querySelector<HTMLInputElement>("#icon_change_theme");
if (!localStorage.getItem("theme")) localStorage.setItem("theme", "active");

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
        Object.values(this.elements).forEach((element) => element.classList.remove("theme_dark"));
        document.body.classList.remove("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia.png';
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-moon moon");
        localStorage.setItem("theme", "inactive");
        this.chatTheme("remove")
    };

    public dark(): void {
        Object.values(this.elements).forEach((element) => element.classList.add("theme_dark"));
        document.body.classList.add("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia_light.png'
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-sun sun");
        localStorage.setItem("theme", "active");
        this.chatTheme("add");
    };

    public themeStorage(): void {
        const storage = localStorage.getItem("theme");
        if (!storage) return;
        storage === "inactive" ? this.light() : this.dark();
    };

    public applyingThemeChatUser(): string | void{
        const storage = localStorage.getItem("theme");
        if (!storage) return;
        storage === "active" ? this.chatTheme("add") : this.chatTheme("remove");
    }

};


export const theme = new Theme();

theme.themeStorage();

changeTheme?.addEventListener("click", () => {
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light()
});