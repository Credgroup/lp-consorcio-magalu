#!/bin/bash

echo "Iniciando a substituição das variáveis de ambiente no index.html..."

# Caminho do arquivo index.html
CONFIG_FILE="/usr/share/nginx/html/index.html"

# Verifica se o arquivo index.html existe
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Erro: Arquivo index.html não encontrado no caminho: $CONFIG_FILE" >&2
    exit 1
else
    echo "Arquivo index.html encontrado. Continuando..."
fi

# Lista de variáveis e seus placeholders no index.html
declare -A variables=(
    ["ENVIRONMENT_VARIABLE"]="(ENVIRONMENT_VARIABLE)"
    ["URL_WEBHOOK_ENV"]="(URL_WEBHOOK_ENV)"
    ["URL_SENDDATA_WEBHOOK_ENV"]="(URL_SENDDATA_WEBHOOK_ENV)"
    ["IMAGE_VERSION"]="(IMAGE_VERSION)"
)

# Função para substituir variáveis no arquivo index.html
replace_variable() {
    local var_name=$1
    local placeholder=$2

    # Verifica se a variável de ambiente existe
    if [ -z "${!var_name}" ]; then
        echo "A variável de ambiente $var_name não está definida. Ignorando..."
    else
        echo "Substituindo $placeholder por ${!var_name} no arquivo index.html..."
        sed -i "s|$placeholder|${!var_name//&/\&}|g" "$CONFIG_FILE"
    fi
}

# Substituir variáveis no arquivo index.html
for var_name in "${!variables[@]}"; do
    replace_variable "$var_name" "${variables[$var_name]}"
done

# Log do valor de BUILD_VERSION
if [ -n "$IMAGE_VERSION" ]; then
    echo "✅ Build Version: $IMAGE_VERSION"
else
    echo "⚠️  Build Version não definida."
fi

echo "✅ Substituições concluídas com sucesso."

exec "$@"