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
            `Estou lá como referência do portfólio. Que moral!`
        ],
        languages: "O projeto foi desenvolvido em react",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/meu-portfolio"> https://github.com/eupedrobarbosa03/meu-portfolio<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/meu-portfolio/">https://eupedrobarbosa03.github.io/meu-portfolio/</a>.`
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
        title: "localiza-cep",
        wordsReference: /(localiza-cep|localizador cep|cep)/gim,
        about: [
            `O LOCALIZACEP é uma aplicação web gratuita e segura para ver informações de um CEP. É possível ver Estado, localidade, UF, DDD, região, logradouro, bairro e o IBGE.`
        ],
        languages: "O projeto foi desenvolvido em html, css e tyescript.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/localiza-cep">https://github.com/eupedrobarbosa03/localiza-cep<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/localiza-cep/">https://eupedrobarbosa03.github.io/localiza-cep/</a>.`
        ]
    },
    {
        title: "BoxShadow.css",
        wordsReference: /boxshadow|box-shadow.css|box-shadow/gim,
        about: [
            `BoxShadow.css é uma aplicação web gratuita que permite a criação de sombras em tempo real com css. A ideia é voltada para visualização em tempo real com copiagem do código css.`
        ],
        languages: "O projeto foi desenvolvido em react e css.",
        link: [
            `Repositório: <a target="_blank" href="https://github.com/eupedrobarbosa03/box-shadow">https://github.com/eupedrobarbosa03/box-shadow<a/>.`,
            `Deploy: <a target="_blank" href="https://eupedrobarbosa03.github.io/box-shadow/">https://eupedrobarbosa03.github.io/box-shadow/</a>.`
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