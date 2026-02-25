import { projects } from "./projects.js";

const chat = document.querySelector<HTMLInputElement>(".container_chat");
const messageUser = document.querySelector<HTMLInputElement>("#message_user");
const messageSend = document.querySelector<HTMLInputElement>("#container_send");
const botMessages = document.querySelectorAll<HTMLInputElement>(".chat_bot");
const userMessages = document.querySelectorAll<HTMLInputElement>(".chat_user");

interface RegExpMessage {
    aboutBot: RegExp;
    genericMessages: RegExp;
    projects: RegExp;
};

const regExpMessages: RegExpMessage = {
    aboutBot: /voc[êe] sobre|sobre voc[êe]|quero saber sobre voc[êe]|quem criou voc[êe]/gim,
    genericMessages: /belezinha|beleza|(boa noite[e]+)|(bom di[a]+)|(boa tard[e]+)|prazer|muito bem|opa|ol[áa]|(^o[i]+e?)|bem|estou bem|est[áa] tudo bem comigo|tudo bem comigo|estou feliz|estou muito bem/gim,
    projects: /(ban(k|c)o?( ?|-?)t?s?)|(portf[óo]lio)|(generator 2|password 2|generator password 2|passsowrd generator 2|generator 2|password 2)|(postal|postal code|postal code brazil|brazil code|cep)|(boxshadow|generator boxshadow|generator shadow|generator box)|(expense|expense management|management)|(todo list|to-do list|lista tarefas|to-do|list)|(calculadora|calculator|simple calculator|calculadora simples)|(flebox|flex|boxflex)/gim
};

type Message = {
    bot: string[],
    user: string[]
};

const messagesAll: Message = {bot: [], user: []};

type TypeChat = "chat_bot" | "chat_user"

class Chat {
    private pendingMessages: string[]
    constructor() {
        this.pendingMessages = [];
    };

    private responseTimeWithFor(array: string[]): void {
        setTimeout(() => {
            for (let i = 0; i < array.length; i++) {
                setTimeout(() => {
                    this.handleChat("chat_bot", String(array[i]));
                    messagesAll.bot.push(String(array[i]));     
                }, i * 2000)
            };
        }, 1000)
    }

    private scrollToBottom(): void {
        const chatMessages = chat?.lastElementChild as HTMLElement;
        if (chatMessages && chat) chat.scrollTop = chatMessages.offsetTop;
    };

    private notSpam(): void {
        setTimeout(() => {
            messageSend!.classList.remove("noSend");
        }, this.pendingMessages.length * 2000 + 500);
    };

    private handleChat(typeChat: TypeChat, message: string): void {
        const newChat = document.createElement("div");
        newChat.classList.add(typeChat);
        newChat.classList.add("chat_config");
        const textChat = document.createElement("p");
        if (typeChat === "chat_bot") {
            textChat.innerHTML = '. . .'
            setTimeout(() => {            
                textChat.innerHTML = `${message}`;
                this.scrollToBottom();
            }, 1000);
        };
        if (typeChat === "chat_user") textChat.innerHTML = message;
        newChat.appendChild(textChat);
        chat?.appendChild(newChat)
        this.scrollToBottom();
    };

    private messageNotUnderstood(text: string) {  
        text = text.toLowerCase();
        const regExpAll = new RegExp(`${regExpMessages.aboutBot.source}|${regExpMessages.genericMessages.source}|${regExpMessages.projects.source}`)
        if (text.match(regExpAll)) return false;
        const messagesAboutNotUnderstood: string[] = [
            "Eu não consegui entender o que você escreveu. Ei, você sabia que eu posso ser ensinado? Legal, né?! Para eu aprender você deve seguir um padrão de ensinamento.",
            "Quer me ensinar a dizer 'bom homem'? Você pode fazer assim: chat, quero que você diga <strong>'bom homem'</strong> sempre que eu falar <strong>'boa chat'</strong>. Sempre use as aspas simples para eu identificar seu ensinamento como no exemplo anterior.",
            "Usando o exemplo acima, a primeira mensagem que contêm as aspas simples é o principal , a segunda mensagem é o corpo.",
            "Se você usar vírgulas no corpo, eu tenho um conhecimento adiconal. Exemplo: chat, quando eu falar 'boa chat', você fala 'teste, teste, teste'. Aprendeu? Haha, eu te ensino a mexer comigo e você me ensina seu vocabulário."
        ]; 
        messagesAboutNotUnderstood.filter((message) => this.pendingMessages.push(message));
        this.responseTimeWithFor(this.pendingMessages); 
        this.notSpam();
        return true;
    };

    botInitialMessages(): void {

        const initialMessages: string[] = [
            "Olá, tudo bem?! 😊",
            "Sou um <strong>chat desenvolvido</strong> para falar sobre meu criador, posso falar sobre os projetos dele, linguagens utilizadas, etc. Ah, eu posso falar sobre mim também!",
            "Olha, mas vai com calma! Eu posso não entender certas frases ou palavras.",
            "Hahaha, acho que falei demais! 😹. Agora é sua vez, conta-me, o que você quer saber?"
        ];

        this.responseTimeWithFor(initialMessages);

    };

    private projectsMessages(text: string) {
        text = text.toLowerCase();
        let messages: string[] = [];

        if (text.match(regExpMessages.projects)) {
            const quanatity = text.match(regExpMessages.projects)!.length;
            if (quanatity > 1) messages.push(
                `Eu sigo um padrão de "últimos projetos" ou de "favoritos" do meu criador.`, `Se na mensagem você colocar "fale sobre o postal code brazil e o bank-ts", falarei primeiro do bank-ts por ser recente (e favorito)`
            )
        }

        projects.forEach((project) => {
            if (text.match(project.wordsReference)) {
                messages.push(`Vou falar sobre o(a) ${project.title}.`)
                messages.push(...project.about);
                messages.push(project.languages);
                messages.push(...project.link);
            }
        });

        messages.forEach((message) => this.pendingMessages.push(message))

    };

    private genericMessages(text: string) {
        text = text.toLowerCase();
        const found = text.match(regExpMessages.genericMessages);
        const index = found?.filter((word) => word !== '');
        if (index?.length === 0 || !index) return;
    

        const simpleMessages: string[] = [
            "estou bem",
            "está tudo bem comigo",
            "tudo bem comigo",
            "estou feliz",
            "estou muito bem",
            "estou muito feliz"
        ];

        const simpleMessageFind = simpleMessages.find((simple) => simple === index[0]?.toString());

        if (simpleMessageFind) {
            const singleMessage: string = "Fico muito feliz em saber isso! 💌😊"
            this.pendingMessages.push(singleMessage);
            return;
        };
         
        const messages: string[] = [            
            "Opa, beleza?! Como vai? 😊",
            "Oi, tudo bem?",
            "Prazer, tudo bom?",
            "Olá, tudo bem?!",
            "Bom dia!",
            "Boa noite!",
            "boa tarde!",
            "Belezinha? Como foi ou está seu dia?",
            "Estou muito bem! Só esperando perguntas relacionadas ao meu criador... ou até sobre mim, rs. 😹"
        ];

        messages.push(`${index[0]?.toString()}`);

        let saveMessage: string[] = [];

        for (const message of messages) {
            if (message.toLowerCase().match(RegExp(index[0]!.toString()))) {
                const lastMessage = messages.reverse()[0];
                if (message.toLowerCase() === lastMessage) {
                    let newIndex: unknown = messages.indexOf(lastMessage);
                    newIndex = `${index[0]?.toString()}, tudo bem?! 😊.`;
                    saveMessage.push(String(newIndex));
                    break;
                }
                saveMessage.push(message);
                break;
            };
        };

        saveMessage.forEach((message) => this.pendingMessages.push(message))
        
    };


    botAbout(text: string): void {
        text = text.toLowerCase()
        const found = text.match(regExpMessages.aboutBot);
        const index = found?.filter((word) => word !== '');
        if (index?.length === 0 || !index) return;

        const messages: string[] = [
            `Hummm, você disse "${index?.length !== 1 ? index?.join(", ") : index}", sim, posso falar sobre mim.`,
            `Bom, eu sou um chat desevolvido com o propósito de passar informações do meu criador: <a target="_blank" href="https://github.com/eupedrobarbosa03">Pedro Henrique</a>. Posso passar informações sobre os projetos, sobre ele, etc. Ah, você deve estar se perguntando o que é "CHAT BPH", né?! É a abreviação de "chat bot Pedro Henrique".`,
            `Eu fui desenvolvido em typescript. ⭐`
        ];

        messages.forEach((message) => this.pendingMessages.push(message))

    };

    general(message: string) {
        if (messageUser?.value.trim() === "") return;
        this.handleChat("chat_user", message);
        messageSend?.classList.add("noSend");
        this.pendingMessages = [];
        if (!this.messageNotUnderstood(message)) {
            this.responseTimeWithFor(this.pendingMessages);           
            this.genericMessages(message);
            this.projectsMessages(message);
            this.botAbout(message);      
            this.notSpam();
        }  
    };

};

const chatExe = new Chat();
// chatExe.botInitialMessages();

messageSend!.addEventListener("click", () => {
    const message = messageUser!.value;
    chatExe.general(message)
});
