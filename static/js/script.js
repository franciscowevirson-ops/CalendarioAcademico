const box = document.getElementById("box");


// Verifica se existem dados salvos
const dadosSalvos = localStorage.getItem("dadosEvento");


if (dadosSalvos) {

    const dados = JSON.parse(dadosSalvos);

    const criarLi = document.createElement("li");

    criarLi.className = "item";
    criarLi.innerHTML = `
    Evento: ${dados.nome_evento}<br>
    Data: ${dados.data}, 
    Horário: ${dados.horario}, 
    Local: ${dados.local}
`;


    box.appendChild(criarLi);

    localStorage.removeItem("dadosEvento");
}