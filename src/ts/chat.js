import { projects } from "./projects.js";
import { storage } from "./storage.js";
import { theme } from "./theme.js";
if (!localStorage.getItem("teachings"))
    localStorage.setItem("teachings", JSON.stringify([]));
const chat = document.querySelector(".container_chat");
const messageUser = document.querySelector("#message_user");
const messageSend = document.querySelector("#container_send");
;
;
const regExpMessages = {
    aboutBot: /voc[êe] sobre|sobre voc[êe]|quero saber sobre voc[êe]|quem criou voc[êe]/gim,
    genericMessages: /belezinha|beleza|boa noit[e]+|bom di[a]+|boa tard[e]+|prazer|muito bem|opa|ol[áa]|(^o[i]+e?)|bem|estou bem|est[áa] tudo bem comigo|tudo bem comigo|estou feliz|estou muito bem/gim,
    projects: /(ban(k|c)o?( ?|-?)t?s?)|(portf[óo]lio)|(generator 2|password 2|generator password 2|passsowrd generator 2|generator 2|password 2)|(postal|postal code|postal code brazil|brazil code|cep)|(boxshadow|generator boxshadow|generator shadow|generator box)|(expense|expense management|management)|(todo list|to-do list|lista tarefas|to-do|list)|(calculadora|calculator|simple calculator|calculadora simples)|(flebox|flex|boxflex)|(generator 1|generator password 1|password generator 1)|(student ?(situation)?)|(controle de produtos|produtos controle)|(academy ?(control)?|control academy)|(chat ?-?bot|bot ?-?chat)/gim,
    teaching: /#[a-zéãóáàèêâ0-9\,\ \-\!\?\.]+#/gim,
    commands: /^\+(comandos|ajuda|projetos|ensinamentos|pedro|links|reset)$/gim
};
const regExpAll = new RegExp(`${regExpMessages.aboutBot.source}|${regExpMessages.genericMessages.source}|${regExpMessages.projects.source}|${regExpMessages.teaching.source}|${regExpMessages.commands.source}`);
const messagesAll = { bot: [], user: [] };
class Chat {
    pendingMessages;
    attemptToTeachMessagesPredefined;
    teachingCompleted;
    permissionSendMessage;
    enterKey;
    constructor() {
        this.pendingMessages = [];
        this.attemptToTeachMessagesPredefined = false;
        this.teachingCompleted = false;
        this.permissionSendMessage = false;
        this.enterKey = "Enter";
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
            this.enterKey = "Enter";
            this.permissionSendMessage = true;
        }, this.pendingMessages.length * 2000 + 500);
    }
    ;
    handleChat(typeChat, message) {
        const newChat = document.createElement("div");
        newChat.classList.add(typeChat);
        newChat.classList.add("chat_config");
        const textChat = document.createElement("p");
        if (typeChat === "chat_bot") {
            textChat.innerHTML = 'digitando...';
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
        theme.applyingThemeChatUser();
    }
    ;
    messageNotUnderstood(text) {
        text = text.toLowerCase();
        if (text.match(regExpAll))
            return false;
        this.pendingMessages.push(`Hummmm.... não entendi. Use +comandos para saber algumas informações.`);
        this.responseTimeWithFor(this.pendingMessages);
        this.notSpam();
        return true;
    }
    ;
    botCommands(text) {
        text = text.toLowerCase().trim();
        const found = text.match(regExpMessages.commands);
        if (!found)
            return;
        switch (found[0]) {
            case "+comandos":
                this.pendingMessages.push(`<strong>Lista de comandos disponíveis e suas funções:</strong>`, `<strong>+comandos:</strong> Lista todos os comandos disponíveis.<br><strong>+ajuda:</strong> Mostra o tutorial completo para ensinar a mim.<br><strong>+projetos:</strong> Lista todos os projetos do meu criador.<br><strong>+ensinamentos:</strong> Lista todos os ensinamentos que você me ensinou.<br><strong>+pedro:</strong> Comando exclusivo para falar sobre meu criador.<br><strong>+links:</strong> Lista de link's: repositório, linkedin, portfólio, etc<br><strong>+reset:</strong> Apaga todos os ensinamentos.`);
                break;
            case "+ensinamentos":
                const teachings = storage.list();
                if (teachings.length === 0) {
                    this.pendingMessages.push(`Até o momento você não me ensinou nada.`);
                    return;
                }
                ;
                let listTeachingsFormated = [];
                teachings.filter((teaching) => listTeachingsFormated.push(`<strong>Ensinamento</strong>: ${teaching.title} | <strong>Retorno</strong>: [${teaching.teachings.join(", ").replaceAll(", ", ", ")}]#`));
                const newListTeaching = `${listTeachingsFormated.join("").replaceAll("#", "<br>")}`;
                this.pendingMessages.push(newListTeaching, `Total de ensinamentos: ${teachings.length}.`);
                break;
            case "+ajuda":
                this.pendingMessages.push(`Você usou o comando <strong>+ajuda</strong>.`, `Essa ajuda é para você entender o sistema de ensinamentos.`, `<strong>Tutorial:</strong> Seu ensinamento deve possuir dois identificadores, o #. Há dois modelos de ensinamentos.`, `<strong>Modelo Simples: </strong> #título do ensinamento# e #ensinamentos#`, `<strong>Modelo Avançado:</strong> #título do ensinamento# e #ensinamento-ensinamento-ensinamento#`, `A grande diferença é que no modelo simples não há separadores (-), e no modelo avançado possuem um ou mais.`, `<strong>Exemplo modelos simples:</strong> chat, quando eu falar #teste# você deve falar #pedro é um grande amigo.#`, `<strong>Exemplo modelos avançado</strong>: chat, quando eu falar #teste# você diz #teste-teste-teste#.`, `Aceito letras, números, espaços, ponto (.), vírgula (,), interrogação e exclamação.`);
                break;
            case "+projetos":
                this.pendingMessages.push(`<strong>Projetos desenvolvidos por Pedro Henrique.</strong>.`, `Portfólio, bank-ts, generator password 2, postal code brazil, student situation, academy control, generator boxshadow, expense management, to-do list, simple calculator, flebox, password generator, controle produtos e chatbot.`, `E eu, né? Fiquei seperado dos outros porque sou o favorito dele  (chat-bph).`, `<strong>Total de projetos: </strong>15.`, `Quer saber sobre cada um? Só mandar uma mensagem aqui perguntando sobre. Se quer saber exclusivamente sobre mim, pergunte algo como "quero saber sobre você".`);
                break;
            case "+pedro":
                this.pendingMessages.push(`<strong>Pedro Henrique</strong> é um jovem rapaz de 20 anos apaixonado por tecnologia, no mundo dos códigos. Ele tem um grande objetivo de se tornar um desenvolvedor <strong>full-stack</strong>, entretanto,o primeiro passo é se tornar um deseolvedor <strong>front-end</strong> completo.`, `Atualmente, Pedro Henrique possui conhecimento em html, css, javascript, typescript e react.`, `A sua carreira está seguindo um bom caminho, que assim continue. Ele está graduando em <strong>análise e desenvolvimento de sistemas</strong> na Estácio.`, `Além da graduação, Pedro obtém cursos em instituições como <strong>Alura</strong> e <strong>udemy</strong>.`);
                break;
            case "+links":
                this.pendingMessages.push(`<strong>Portfólio: </strong><a href="https://eupedrobarbosa03.github.io/portfolio" target="_blank">https://eupedrobarbosa03.github.io/portfolio</a><br><br><strong>Linkedin: </strong><a href="https://www.linkedin.com/in/eupedrobarbosa/" target="_blank">https://www.linkedin.com/in/eupedrobarbosa/</a><br><br><strong>Github: </strong><a href="https://github.com/eupedrobarbosa03" target="_blank">https://github.com/eupedrobarbosa03</a><br><br><strong>Repositório chat-bph: </strong><a href="https://github.com/eupedrobarbosa03/chat-bph" target="_blank">https://github.com/eupedrobarbosa03/chat-bph</a>`);
                break;
            case "+reset":
                localStorage.setItem("teachings", JSON.stringify([]));
                this.pendingMessages.push(`Ensinamentos apagados.`);
                break;
            default:
                console.warn(`😊`);
                break;
        }
        ;
    }
    ;
    botTeachings(text) {
        text = text.toLowerCase();
        const found = text.match(regExpMessages.teaching);
        this.teachingCompleted = false;
        if (!found)
            return;
        if (found?.length !== 2) {
            this.pendingMessages.push(`Identifiquei que você está tentando me ensinar, mas você precisa seguir o padrão de ensinamento para <strong>ME ENSINAR</strong>.`);
            if (found?.toString().replaceAll("#", "").match(regExpAll)) {
                this.attemptToTeachMessagesPredefined = true;
            }
            return;
        }
        let titleStandard = found[0].replaceAll("#", "").trim();
        let teachingStandard = found[1].replaceAll("#", "");
        if (titleStandard.match(regExpAll)) {
            this.pendingMessages.push(`Hummmm.....eu já aprendi isso de forma <strong>exclusiva</strong> com o meu criador.`);
            this.attemptToTeachMessagesPredefined = true;
            return;
        }
        ;
        this.attemptToTeachMessagesPredefined = false;
        if (teachingStandard.includes("-")) {
            const newFormat = teachingStandard.replaceAll(" ", "").split("-");
            const filterTeachingStandard = newFormat.filter((teaching) => teaching !== '');
            if (filterTeachingStandard.length > 4) {
                this.pendingMessages.push(`Ihhhhh... Você fez mais separações do que o combinado... Não vou aprender dessa forma. ❌`, `Coloque no máximo quatro separações.`);
                return;
            }
            ;
        }
        ;
        const filterTeachingStandard = teachingStandard.split("-").filter((teaching) => teaching !== ' ');
        const storangeTeachings = storage.list();
        const existingTeaching = storangeTeachings.find((teaching) => teaching.title === titleStandard.toLowerCase().trim());
        this.teachingCompleted = true;
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
    showTeachings(text) {
        const storangeTeachings = storage.list();
        const existingTeaching = storangeTeachings.find((teaching) => teaching.title === text.toLowerCase().trim());
        if (!existingTeaching)
            return false;
        this.pendingMessages.push(...existingTeaching.teachings);
        return true;
    }
    ;
    botInitialMessages() {
        const initialMessages = [
            "Olá, tudo bem?! 😊",
            "Sou um <strong>chat desenvolvido</strong> para falar sobre meu criador, posso falar sobre os projetos dele, linguagens utilizadas, etc. Ah, eu posso falar sobre mim também!",
            "Olha, mas vai com calma! Eu posso não entender certas frases ou palavras. E é por isso que você me ensinar. ⭐",
            `Só mais uma coisa, digite <strong>+comandos</strong> para ver todos os comandos disponíveis.`
        ];
        this.pendingMessages.push(...initialMessages);
        this.responseTimeWithFor(this.pendingMessages);
        this.notSpam();
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
        if (messageUser?.value.trim() === "" || !this.permissionSendMessage)
            return;
        messageUser.value = '';
        this.handleChat("chat_user", message);
        messageSend?.classList.add("noSend");
        this.enterKey = "";
        this.pendingMessages = [];
        if (this.showTeachings(message)) {
            this.responseTimeWithFor(this.pendingMessages);
            this.notSpam();
            return;
        }
        ;
        if (!this.messageNotUnderstood(message)) {
            this.responseTimeWithFor(this.pendingMessages);
            this.botCommands(message);
            this.showTeachings(message);
            this.botTeachings(message);
            this.genericMessages(message);
            this.projectsMessages(message);
            this.botAbout(message);
            this.notSpam();
        }
        ;
    }
    ;
}
;
const chatExe = new Chat();
chatExe.botInitialMessages();
messageSend.addEventListener("click", () => {
    const message = messageUser.value;
    chatExe.general(message);
    theme.applyingThemeChatUser();
});
window.addEventListener("keyup", (e) => {
    if (e.key === chatExe.enterKey) {
        const message = messageUser.value;
        chatExe.general(message);
        theme.applyingThemeChatUser();
    }
});
