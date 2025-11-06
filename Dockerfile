# Usar imagem base leve do Nginx
FROM nginx:alpine

# Apagar arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todo o conteúdo da sua pasta para a pasta padrão do nginx
COPY . /usr/share/nginx/html/

# Expor a porta 80
EXPOSE 80

# Iniciar o nginx quando o container subir
CMD ["nginx", "-g", "daemon off;"]
