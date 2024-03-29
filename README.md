# Prisma connect
Проверка подключения к удаленной базе данных при помощи скрипта

## Требования
```
node.js - https://nodejs.org/en/
```

## Установка
- Скачать исходники:
```
git clone https://github.com/kolserdav/prisma-connect
```
- Перейти в папку с проектом и установить зависимости:
```
cd prisma-connect
```
```
npm install
```
- Создать и настоить файл `.env` из примера (см. `.env.example`):
```
# user - пользователь базы данных с правами на базу
# password - пароль пользователя
# Вместо 127.0.0.1 - удаленный хост
# 3306 - порт базы данных
# db_name - имя базы данных
DATABASE_URL=mysql://user:password@127.0.0.1:3306/db_name
```
## Запуск
Выполнить команду:
```
npm run pull
```
_Если подключение установлено (база данных доступна и пользователь существует и имеет права на чтение структуры), то скрипт отработает без ошибок  создастся схема базы в файле `orm/schema.prisma`_