# Usar imagem base leve do Nginx
FROM nginx:alpine

# Define o diretório de trabalho (opcional)
WORKDIR /app

# Copia todos os arquivos da pasta src para dentro do container
COPY ./src /app

# Apaga os arquivos HTML padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o conteúdo da aplicação (src) para o diretório do Nginx
COPY ./src /usr/share/nginx/html/

# Copia o entrypoint e dá permissão
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o entrypoint customizado (substitui variáveis no runtime)
ENTRYPOINT ["/entrypoint.sh"]

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando final: iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
