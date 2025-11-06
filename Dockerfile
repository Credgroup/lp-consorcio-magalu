# Usar imagem base leve do Nginx
FROM nginx:alpine

# Define o diretório de trabalho (opcional)
WORKDIR /app

# Copia todos os arquivos locais para dentro do container
COPY . .

# Apaga os arquivos HTML padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o index.html para o diretório servido pelo Nginx
COPY ./index.html /usr/share/nginx/html/

# Copia e dá permissão ao entrypoint
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o entrypoint customizado
ENTRYPOINT ["/entrypoint.sh"]

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando final para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
