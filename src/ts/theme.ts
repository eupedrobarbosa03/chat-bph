const iconBot = document.querySelector<HTMLImageElement>("#icon_bot");
const changeTheme = document.querySelector<HTMLInputElement>("#icon_change_theme");

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
        changeTheme?.setAttribute("class", "fa-regular fa-moon moon")
    };

    public dark(): void {
        Object.values(this.elements).forEach((element) => element.classList.add("theme_dark"));
        document.body.classList.add("theme_dark");
        iconBot!.src = 'assets/icons/tecnologia_light.png'
        changeTheme?.removeAttribute("class");
        changeTheme?.setAttribute("class", "fa-regular fa-sun sun")
    };
};

changeTheme?.addEventListener("click", () => {
    const theme = new Theme();
    isThemeDark = !isThemeDark;
    isThemeDark ? theme.dark() : theme.light()
});