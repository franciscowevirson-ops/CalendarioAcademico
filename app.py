import os
import json
import requests
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

load_dotenv()
OPENROUTER_KEY = os.environ.get("OPENROUTER_KEY")  


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/new")
def new():
    return render_template("new.html")

@app.route("/extrair-dados", methods = ["POST"])
def extrair_dados():
    texto = request.json.get("texto", "")
    prompt = f"""Extraia as informações do texto abaixo e retorne SOMENTE um json válido, sem texto, sem extra, sem markdown:

{{
    "nome_evento": "",
    "data": "",
    "horario": "",
    "local": ""
}}

Texto: {texto}"""

    resp = requests.post(
    "https://openrouter.ai/api/v1/chat/completions",
    headers={"Authorization": f"Bearer {OPENROUTER_KEY}"},
    json={"model": "inclusionai/ling-3.0-flash-vl:free", "messages": [{"role": "user", "content": prompt}]}
)

    print("STATUS:", resp.status_code)
    print("BODY:", resp.text)

    conteudo = resp.json()["choices"][0]["message"]["content"]


    conteudo = resp.json()["choices"][0]["message"]["content"]

    try:
        dados = json.loads(conteudo)
    except json.JSONDecodeError:
        return jsonify({"erro": "A IA não retornou um JSON válido"})

    return jsonify(dados)



if __name__ == "__main__":
    app.run(debug=True)