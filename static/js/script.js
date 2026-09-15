
const input = document.getElementById("user-text");
const botaoEnviar = document.getElementById("send-text");

function criarElementos() {
    const area = document.getElementById("verification");
    area.innerHTML = "";
    const responseArea = document.createElement("div");
    responseArea.id = "target";
    responseArea.className = "response";

    const buttonsArea = document.createElement("div");
    buttonsArea.className = "verification-area";
    buttonsArea.id = "bt";

    const info = document.createElement("h2");
    info.textContent = "Verifique as informações";

    area.appendChild(info);
    area.appendChild(responseArea);
    area.appendChild(buttonsArea);

    const okButton = document.createElement("button");
    okButton.id = "send";
    okButton.textContent = "Confirmar";
    const editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.textContent = "Editar";

    buttonsArea.appendChild(okButton);
    buttonsArea.appendChild(editButton);
}

function mostrarDados(dados) {
    const target = document.getElementById("target");
    const response = document.createElement("p");
    response.innerHTML = `Evento: ${dados.nome_evento}<br>Data: ${dados.data}<br>Horário: ${dados.horario}<br>Local: ${dados.local}`;

    target.append(response);
}

botaoEnviar.addEventListener("click", async (e) =>{
    e.preventDefault();
    const texto = input.value;
    if (!texto.trim()) return;

    const resposta = await fetch("/extrair-dados", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ texto })

    });

    const dados = await resposta.json();
    mostrarConfirmacao(dados);
    criarElementos();
    mostrarDados(dados);
    input.value = "";
});

function mostrarConfirmacao(dados) {
    console.log(dados)
}