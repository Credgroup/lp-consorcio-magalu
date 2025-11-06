#!/bin/sh

echo "Iniciando a substituição das variáveis de ambiente no index.html..."

CONFIG_FILE="/usr/share/nginx/html/index.html"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Erro: Arquivo index.html não encontrado no caminho: $CONFIG_FILE" >&2
    exit 1
else
    echo "Arquivo index.html encontrado. Continuando..."
fi

declare -A variables="
    ENVIRONMENT_VARIABLE (ENVIRONMENT_VARIABLE)
    URL_WEBHOOK_ENV (URL_WEBHOOK_ENV)
    URL_SENDDATA_WEBHOOK_ENV (URL_SENDDATA_WEBHOOK_ENV)
    IMAGE_VERSION (IMAGE_VERSION)
"

for var in ENVIRONMENT_VARIABLE URL_WEBHOOK_ENV URL_SENDDATA_WEBHOOK_ENV IMAGE_VERSION; do
    placeholder="(${var})"
    value=$(eval echo \$$var)
    if [ -z "$value" ]; then
        echo "A variável $var não está definida. Ignorando..."
    else
        echo "Substituindo $placeholder por $value..."
        sed -i "s|$placeholder|$value|g" "$CONFIG_FILE"
    fi
done

if [ -n "$IMAGE_VERSION" ]; then
    echo "✅ Build Version: $IMAGE_VERSION"
else
    echo "⚠️  Build Version não definida."
fi

echo "✅ Substituições concluídas com sucesso."
exec "$@"
