# Site estático — HTML/CSS/JS nativo, sem build step. Só copia os
# arquivos pro Nginx servir direto.
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html llms.txt robots.txt sitemap.xml /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY parceiros /usr/share/nginx/html/parceiros
COPY privacidade /usr/share/nginx/html/privacidade

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
