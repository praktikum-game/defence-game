FROM nginx:1.21.5
COPY nginx.conf /etc/nginx/nginx.conf
RUN sudo snap install core; sudo snap refresh core \
    && sudo snap install --classic certbot \ 
    && sudo ln -s /snap/bin/certbot /usr/bin/certbot \
    && sudo certbot --nginx \
    && sudo certbot --nginx --email shvetsov.y.v@yandex.ru --no-eff-email -d hobart-defencegame-09.ya-praktikum.tech -n --agree-tos
