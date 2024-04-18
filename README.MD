## Установка
1. У вас уже должен быть установлен NPM
2. В командной строке введите npm install

## Запуск DEV или PROD окружений
0. Для сборки проекта PROD или DEV окружения, выполните соотвествтенно npm run build:prod или npm run build:dev 
1. Для запуска webpack-dev-server PROD окружения, выполните npm run start:prod
2. Для запуска webpack-dev-server DEV окружения, выполните npm run start:dev 

Внимание! Без запущенного json-server на главную страницу выведется уведомление о невозможности подключиться к API.

3. Для запуска только json-server, выполните npm run json-server-only
4. Для запуска webpack-dev-server PROD или webpack-dev-server DEV вместе с json-server, выполните npm run start:prod:json-server или npm run start:dev:json-server