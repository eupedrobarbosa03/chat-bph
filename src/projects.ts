interface Project {
    title: string;
    wordsReference: RegExp;
    about: string[];
    languages: string;
    link: string[];
};

export const projects: Project[] = [
    {
        title: "bank-ts",
        wordsReference: /ban(k|c)o?( ?|-?)t?s?/gim,
        about: [
            `Bank-ts é um sistema que simula um sistema bancário. Todos os métodos só podem ser executados via código. O opção por este modo é para mostrar de forma direta como funciona a aplicação de conceitos sem interações com o usuário (interface ou input).`,
            `O sistema conta com diversas funcionalidades: CRUD (criar conta, atualizar contar, deletar consta e pegar contas), sacar, depositar, ver saldo (crédito e débito), limite crédito, pedir empréstimo, comprar com débito ou crédito, realizar transferência via pix e login.`
        ],
        languages: "O projeto foi desenvolvido em javascript e typescript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/bank-ts"> https://github.com/eupedrobarbosa03/bank-ts<a/>.`,
            `O projeto não possui deploy.`
        ]
    },
    {
        title: "portfólio",
        wordsReference: /portf[óo]lio/gim,
        about: [
            `O portfólio é uma apresentação rápida e direta sobre ele. O portfólio possui todos os projetos que ele desenvolveu.`,
            `Eu com certeza estarei lá ou estou. 🤓`,
            `O portfólio é responsivo para qualquer tipo de tela. Possui uma interface <strong>black</strong> e com pequenos efeitos de títulos, text-shadow, etc.`
        ],
        languages: "O projeto foi desenvolvido em html, css, javascript e typescript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/portfolio"> https://github.com/eupedrobarbosa03/portfolio<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/portfolio/">https://eupedrobarbosa03.github.io/portfolio/</a>.`
        ]
    },
    {
        title: "generator password 2",
        wordsReference: /generator 2|password 2|generator password 2|passsowrd generator 2|generator 2|password 2/gim,
        about: [
            `O generator password 2 é uma segunda versão de um projeto de gerador de senhas. A primeira versão já foi desabilitada e não há como ter mais acesso.`,
            `Vamos ao ponto, generator password 2 é uma gerador de senhas fortes e seguras.`,
            `Quer senha forte e segura? Gere nessa aplicação incrível. ⭐`
        ],
        languages: "O projeto foi desenvolvido em html, css, javascript e typescript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/generator-password-2"> https://github.com/eupedrobarbosa03/generator-password-2<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/generator-password-2/">https://eupedrobarbosa03.github.io/generator-password-2/</a>.`
        ]
    },
    {
        title: "postal code brazil",
        wordsReference: /postal|postal code|postal code brazil|brazil code|cep/gim,
        about: [
            `O postal code brazil é uma aplicação de consumo de API para retornar informações de localização através de um CEP válido.`,
            `As informações são: o próprio cep, localidade, bairro, região, logradouro, UF e DDD.`,
            `Legal, né?! 😊. Vou te passar o link da aplicação já já, tá bom? Vou te passar um cep aqui do lado para você testar, tudo bem? Utilize o cep ao lado para testar: <span id="cep_copy">01310-930</span>`
        ],
        languages: "O projeto foi desenvolvido em html, css, javascript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/postal-code-brazil">https://github.com/eupedrobarbosa03/postal-code-brazil<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/postal-code-brazil/">https://eupedrobarbosa03.github.io/postal-code-brazil/</a>.`
        ]
    },
    {
        title: "generator boxshadow",
        wordsReference: /boxshadow|generator boxshadow|generator shadow|generator box/gim,
        about: [
            `Uma aplicação voltada para o uso desktop para a criação de sombras em tempo real. Útil para o desenvolvimento em css e código em tempo real.`
        ],
        languages: "O projeto foi desenvolvido em html, css e react.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/generator-boxShadow">https://github.com/eupedrobarbosa03/generator-boxShadow<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/generator-boxShadow/">https://eupedrobarbosa03.github.io/generator-boxShadow/</a>.`
        ]
    },
    {
        title: "simple calculator",
        wordsReference: /calculadora|calculator|simple calculator|calculadora simples/gim,
        about: [
            `Simple calculator é uma calculadora on-line que realiza cálculos de operações básicas`,
            `1 + 1 = 2. 😹`,
            `Oia, hahaha! Só foi falar dessa aplicação que comecei a contar. 😹`
        ],
        languages: "O projeto foi desenvolvido em html, css e javascript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/simple-calculator">https://github.com/eupedrobarbosa03/simple-calculator<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/simple-calculator/">https://eupedrobarbosa03.github.io/simple-calculator/</a>.`
        ]
    },
    {
        title: "academy",
        wordsReference: /academy|academia/gim,
        about: [
            `Academy control é uma aplicação que permite agendamentos de treinos, registro de alunos e instrutores.`,
            `Pena que sou um bot, caso contrário eu iria marcar meus treinos lá. 🤣.`
        ],
        languages: "O projeto foi desenvolvido em html, css e typescript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/academy">https://github.com/eupedrobarbosa03/academy<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/academy/">https://eupedrobarbosa03.github.io/academy/</a>.`
        ]
    }
];