# Documentation

## Antes de empezar, revisa que:
- Tengas instalado docker y docker-compose( esto si lo quieres ver de manera local )
-  git
- insomnia rest

## Empecemos
- API ( local )
    ``` 
    git clone --branch api git@github.com:albertoalejandrolariosmanzano/challenge.git
    docker-compose up -d --build
    docker exec api cp .env.example .env
    ```
    Para el manejo de la API usando los request, por favor use de preferencia [InsomniaRest] e importe este archivo que viene en el repositorio llamado "Insomnia_2021-07-26.json"
- API ( AWS )

[//]: #
    [InsomniaRest]: <https://insomnia.rest/>