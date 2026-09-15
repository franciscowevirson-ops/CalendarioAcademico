const input = document.getElementById("user-text");
const botaoEnviar = document.getElementById("send-text");


function mostrarDados(dados) {

    const target = document.getElementById("target");

    const response = document.createElement("p");

    response.innerHTML = `
        Evento: ${dados.nome_evento}<br>
        Data: ${dados.data}<br>
        Horário: ${dados.horario}<br>
        Local: ${dados.local}
    `;

    target.appendChild(response);
}


function criarElementos(dados) {

    const area = document.getElementById("verification");

    area.innerHTML = "";

    const info = document.createElement("h2");
    info.textContent = "Verifique as informações";

    const responseArea = document.createElement("div");
    responseArea.id = "target";
    responseArea.className = "response";

    const buttonsArea = document.createElement("div");
    buttonsArea.className = "verification-area";

    const okButton = document.createElement("button");
    okButton.id = "send";
    okButton.textContent = "Confirmar";

    const editButton = document.createElement("button");
    editButton.id = "edit";
    editButton.textContent = "Editar";

    area.appendChild(info);
    area.appendChild(responseArea);
    area.appendChild(buttonsArea);

    buttonsArea.appendChild(okButton);
    buttonsArea.appendChild(editButton);

    mostrarDados(dados);


    // CONFIRMAR
    okButton.addEventListener("click", () => {

        localStorage.setItem(
            "dadosEvento",
            JSON.stringify(dados)
        );

        // Vai para a página principal
        window.location.href = "/";
    });


    // EDITAR
    editButton.addEventListener("click", () => {

        area.innerHTML = "";

        input.focus();
    });
}


async function enviar() {

    const texto = input.value;

    const resposta = await fetch("/extrair-dados", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            texto: texto
        })
    });


    const dados = await resposta.json();

    criarElementos(dados);

    input.value = "";
}


botaoEnviar.addEventListener("click", async (e) => {

    e.preventDefault();

    if (!input.value.trim()) {
        return;
    }

    await enviar();
});