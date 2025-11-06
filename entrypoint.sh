#!/bin/sh

echo "🚀 Iniciando a substituição das variáveis de ambiente nos arquivos HTML e JS..."

TARGET_DIR="/usr/share/nginx/html"

if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Erro: Diretório $TARGET_DIR não encontrado." >&2
    exit 1
fi

# Lista de variáveis de ambiente a substituir
VARS="ENVIRONMENT_VARIABLE URL_WEBHOOK_ENV URL_SENDDATA_WEBHOOK_ENV IMAGE_VERSION"

# Procura todos os arquivos HTML e JS na pasta servida pelo Nginx
FILES=$(find "$TARGET_DIR" -type f \( -name "*.html" -o -name "*.js" \))

if [ -z "$FILES" ]; then
    echo "⚠️ Nenhum arquivo .html ou .js encontrado em $TARGET_DIR"
else
    for file in $FILES; do
        echo "🧩 Processando arquivo: $file"
        for var in $VARS; do
            placeholder="(${var})"
            value=$(eval echo \$$var)
            if [ -z "$value" ]; then
                echo "   ⚠️  Variável $var não está definida. Ignorando..."
            else
                echo "   🔄 Substituindo $placeholder por $value"
                sed -i "s|$placeholder|$value|g" "$file"
            fi
        done
    done
fi

if [ -n "$IMAGE_VERSION" ]; then
    echo "✅ Build Version: $IMAGE_VERSION"
else
    echo "⚠️  Build Version não definida."
fi

echo "✅ Substituições concluídas com sucesso. Iniciando Nginx..."
exec "$@"
