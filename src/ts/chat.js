import { projects } from "./projects.js";
import { storage } from "./storage.js";
if (!localStorage.getItem("teachings"))
    localStorage.setItem("teachings", JSON.stringify([]));
const chat = document.querySelector(".container_chat");
const messageUser = document.querySelector("#message_user");
const messageSend = document.querySelector("#container_send");
const botMessages = document.querySelectorAll(".chat_bot");
const userMessages = document.querySelectorAll(".chat_user");
;
;
const regExpMessages = {
    aboutBot: /voc[êe] sobre|sobre voc[êe]|quero saber sobre voc[êe]|quem criou voc[êe]/gim,
    genericMessages: /belezinha|beleza|boa noit[e]+|bom di[a]+|boa tard[e]+|prazer|muito bem|opa|ol[áa]|(^o[i]+e?)|bem|estou bem|est[áa] tudo bem comigo|tudo bem comigo|estou feliz|estou muito bem/gim,
    projects: /(ban(k|c)o?( ?|-?)t?s?)|(portf[óo]lio)|(generator 2|password 2|generator password 2|passsowrd generator 2|generator 2|password 2)|(postal|postal code|postal code brazil|brazil code|cep)|(boxshadow|generator boxshadow|generator shadow|generator box)|(expense|expense management|management)|(todo list|to-do list|lista tarefas|to-do|list)|(calculadora|calculator|simple calculator|calculadora simples)|(flebox|flex|boxflex)|(generator ?1?|password ?1?|generator password)|(student ?(situation)?)|(controle de produtos|produtos controle)|(academy ?(control)?|control academy)|(chat ?-?bot|bot ?-?chat)/gim,
    teaching: /_([a-zéãóáàèêâ0-9-,] ?)+_/gim
};
const regExpAll = new RegExp(`${regExpMessages.aboutBot.source}|${regExpMessages.genericMessages.source}|${regExpMessages.projects.source}|${regExpMessages.teaching.source}`);
const messagesAll = { bot: [], user: [] };
class Chat {
    pendingMessages;
    attemptToTeachMessagesPredefined;
    teachingCompleted;
    constructor() {
        this.pendingMessages = [];
        this.attemptToTeachMessagesPredefined = false;
        this.teachingCompleted = false;
    }
    ;
    responseTimeWithFor(array) {
        setTimeout(() => {
            for (let i = 0; i < array.length; i++) {
                setTimeout(() => {
                    this.handleChat("chat_bot", String(array[i]));
                    messagesAll.bot.push(String(array[i]));
                }, i * 2000);
            }
            ;
        }, 1000);
    }
    scrollToBottom() {
        const chatMessages = chat?.lastElementChild;
        if (chatMessages && chat)
            chat.scrollTop = chatMessages.offsetTop;
    }
    ;
    notSpam() {
        setTimeout(() => {
            messageSend.classList.remove("noSend");
        }, this.pendingMessages.length * 2000 + 500);
    }
    ;
    handleChat(typeChat, message) {
        const newChat = document.createElement("div");
        newChat.classList.add(typeChat);
        newChat.classList.add("chat_config");
        const textChat = document.createElement("p");
        if (typeChat === "chat_bot") {
            textChat.innerHTML = '. . .';
            setTimeout(() => {
                textChat.innerHTML = `${message}`;
                this.scrollToBottom();
            }, 1000);
        }
        ;
        if (typeChat === "chat_user")
            textChat.innerHTML = message;
        newChat.appendChild(textChat);
        chat?.appendChild(newChat);
        this.scrollToBottom();
    }
    ;
    messageNotUnderstood(text) {
        text = text.toLowerCase();
        if (text.match(regExpAll))
            return false;
        const messagesAboutNotUnderstood = [
            "Eu não consegui entender o que você escreveu. Ei, você sabia que eu posso ser ensinado? Legal, né?! Para eu aprender você deve seguir um padrão de ensinamento.",
            `Preste muita atenção, amigo. Use _ no começo e no final de uma palavra, assim: _teste_. Detalhe importante, a sua mensagem deve ter dois padrões, o primeiro: _titulo_, o segundo _mensagem_. O primeiro padrão é basicamente o título do que você quer que eu fale ao você citar ele. O segundo padrão é o que contêm o texto que vou falar para você ao você citar o título.`,
            `No segundo padrão na mensagem, você pode separar por vírgulas, exemplo: _mensagem, mensagem, mensagem_. Nos padrões eu aceito somente letras, números, espaços e o traço (-). Eu só aceito no máximo quatro separações por vírgulas.`,
            `Entedeu? 😊`
        ];
        messagesAboutNotUnderstood.filter((message) => this.pendingMessages.push(message));
        this.responseTimeWithFor(this.pendingMessages);
        this.notSpam();
        return true;
    }
    ;
    botTeachings(text) {
        text = text.toLowerCase();
        const found = text.match(regExpMessages.teaching);
        if (!found)
            return;
        if (found?.length !== 2) {
            this.pendingMessages.push(`Identifiquei que você está tentando me ensinar, mas você precisa seguir o padrão de ensinamento para <strong>ME ENSINAR</strong>.`);
            if (found?.toString().replaceAll("_", "").match(regExpAll)) {
                this.attemptToTeachMessagesPredefined = true;
            }
            return;
        }
        let titleStandard = found[0].replaceAll("_", "").trim();
        let teachingStandard = found[1].replaceAll("_", "");
        if (titleStandard.match(regExpAll) || teachingStandard?.match(regExpAll)) {
            this.pendingMessages.push(`Hummmm.....eu já aprendi isso de forma <strong>exclusiva</strong> com o meu criador.`);
            this.attemptToTeachMessagesPredefined = true;
            return;
        }
        ;
        this.attemptToTeachMessagesPredefined = false;
        if (teachingStandard.includes(",")) {
            const newFormat = teachingStandard.replaceAll(" ", "").split(",");
            const filterTeachingStandard = newFormat.filter((teaching) => teaching !== '');
            if (filterTeachingStandard.length > 4) {
                this.pendingMessages.push(`Ihhhhh... Você fez mais separações do que o combinado... Não vou aprender dessa forma. ❌`, `Coloque no máximo quatro separações.`);
                return;
            }
            ;
        }
        ;
        const filterTeachingStandard = teachingStandard.split(",").filter((teaching) => teaching !== ' ');
        const storangeTeachings = storage.list();
        const existingTeaching = storangeTeachings.find((teaching) => teaching.title === titleStandard.toLowerCase().trim());
        if (existingTeaching) {
            existingTeaching.teachings = [];
            existingTeaching.teachings = [...filterTeachingStandard];
            storage.update(existingTeaching);
            this.pendingMessages.push(`Rapaz... 👀. Você já me ensinou isso. Estou entendendo que você está me ensinando a mesma coisa porém com outra explicação, logo, vou passar a usar esse "novo" ensinamento. ⭐`);
            return;
        }
        ;
        const teaching = {
            title: titleStandard.toLowerCase().trim(),
            teachings: filterTeachingStandard
        };
        storage.append(teaching);
        this.pendingMessages.push(`Muito obrigado pelo ensinamento. Vamos fazer um teste?! 👀.`, `Então fica assim quando você falar "${titleStandard.trim().toLowerCase()}:"`, ...filterTeachingStandard);
    }
    ;
    botInitialMessages() {
        const initialMessages = [
            "Olá, tudo bem?! 😊",
            "Sou um <strong>chat desenvolvido</strong> para falar sobre meu criador, posso falar sobre os projetos dele, linguagens utilizadas, etc. Ah, eu posso falar sobre mim também!",
            "Olha, mas vai com calma! Eu posso não entender certas frases ou palavras.",
            "Hahaha, acho que falei demais! 😹. Agora é sua vez, conta-me, o que você quer saber?"
        ];
        this.responseTimeWithFor(initialMessages);
    }
    ;
    projectsMessages(text) {
        text = text.toLowerCase();
        let messages = [];
        if (this.attemptToTeachMessagesPredefined || this.teachingCompleted)
            return;
        if (text.match(regExpMessages.projects)) {
            const quanatity = text.match(regExpMessages.projects).length;
            if (quanatity > 1)
                messages.push(`Eu sigo um padrão de "últimos projetos" ou de "favoritos" do meu criador.`, `Se na mensagem você colocar "fale sobre o postal code brazil e o bank-ts", falarei primeiro do bank-ts por ser recente (e favorito)`);
        }
        projects.forEach((project) => {
            if (text.match(project.wordsReference)) {
                messages.push(`Vou falar sobre o(a) ${project.title}.`);
                messages.push(...project.about);
                messages.push(project.languages);
                messages.push(...project.link);
            }
        });
        messages.forEach((message) => this.pendingMessages.push(message));
    }
    ;
    genericMessages(text) {
        text = text.toLowerCase();
        const found = text.match(regExpMessages.genericMessages);
        const index = found?.filter((word) => word !== '');
        if (index?.length === 0 || !index)
            return;
        if (this.attemptToTeachMessagesPredefined || this.teachingCompleted)
            return;
        const simpleMessages = [
            "estou bem",
            "está tudo bem comigo",
            "tudo bem comigo",
            "estou feliz",
            "estou muito bem",
            "estou muito feliz"
        ];
        const simpleMessageFind = simpleMessages.find((simple) => simple === index[0]?.toString());
        if (simpleMessageFind) {
            const singleMessage = "Fico muito feliz em saber isso! 💌😊";
            this.pendingMessages.push(singleMessage);
            return;
        }
        ;
        const messages = [
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
        let saveMessage = [];
        for (const message of messages) {
            if (message.toLowerCase().match(RegExp(index[0].toString()))) {
                const lastMessage = messages.reverse()[0];
                if (message.toLowerCase() === lastMessage) {
                    let newIndex = messages.indexOf(lastMessage);
                    newIndex = `${index[0]?.toString()}, tudo bem?! 😊.`;
                    saveMessage.push(String(newIndex));
                    break;
                }
                saveMessage.push(message);
                break;
            }
            ;
        }
        ;
        saveMessage.forEach((message) => this.pendingMessages.push(message));
    }
    ;
    botAbout(text) {
        text = text.toLowerCase();
        const found = text.match(regExpMessages.aboutBot);
        const index = found?.filter((word) => word !== '');
        if (index?.length === 0 || !index)
            return;
        if (this.attemptToTeachMessagesPredefined || this.teachingCompleted)
            return;
        const messages = [
            `Hummm, você disse "${index?.length !== 1 ? index?.join(", ") : index}", sim, posso falar sobre mim.`,
            `Bom, eu sou um chat desevolvido com o propósito de passar informações do meu criador: <a target="_blank" href="https://github.com/eupedrobarbosa03">Pedro Henrique</a>. Posso passar informações sobre os projetos, sobre ele, etc. Ah, você deve estar se perguntando o que é "CHAT BPH", né?! É a abreviação de "chat bot Pedro Henrique".`,
            `Eu fui desenvolvido em typescript. ⭐`
        ];
        messages.forEach((message) => this.pendingMessages.push(message));
    }
    ;
    general(message) {
        if (messageUser?.value.trim() === "")
            return;
        this.handleChat("chat_user", message);
        messageSend?.classList.add("noSend");
        this.pendingMessages = [];
        if (!this.messageNotUnderstood(message)) {
            this.responseTimeWithFor(this.pendingMessages);
            this.botTeachings(message);
            this.genericMessages(message);
            this.projectsMessages(message);
            this.botAbout(message);
            this.notSpam();
        }
    }
    ;
}
;
const chatExe = new Chat();
// chatExe.botInitialMessages();
messageSend.addEventListener("click", () => {
    const message = messageUser.value;
    chatExe.general(message);
});
