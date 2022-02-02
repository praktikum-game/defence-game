# Игра [Защитники] (техническое название)

[![APP-CI](https://github.com/praktikum-game/defence-game/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/praktikum-game/defence-game/actions/workflows/ci.yml)
[![APP-CD](https://github.com/praktikum-game/defence-game/actions/workflows/cd.yml/badge.svg?branch=main)](https://github.com/praktikum-game/defence-game/actions/workflows/cd.yml)

## Memory Leaks

Была осуществлена проверка утечки памяти через инструменты разработчика Memory и Performance. Какое-либо аномальное поведение не выявлено.

В конце проекта надо будет еще раз пройтись, когда игра начнет снова работать. Возможно, там будут утечки.

##### Для локальной разрабоки нужно добавить в /etc/hosts строку 127.0.0.1 local.ya-praktikum.tech

#### Локальная (prod) сборка:

`sudo docker-compose -f docker-compose.yml -f docker-compose.local.yml up -d`

#### Прод сборка (облако):

`sudo docker-compose up -d`

#### Запрос серта:

`sudo certbot certonly --nginx --email [awesome_name]@yandex.ru --no-eff-email -d hobart-defencegame-09.ya-praktikum.tech -n --agree-tos`
