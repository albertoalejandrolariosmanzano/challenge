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
    URI: localhost:5000
    ```
- API ( AWS )
    ```
    URI: http://a3af2a5960f0c43e4a7740a24d492e4c-ed98df52de6a16f3.elb.us-east-2.amazonaws.com/
    ```
    Para el manejo de la API usando los request, por favor use de preferencia [InsomniaRest] e importe este archivo que viene en el repositorio llamado "Insomnia_2021-07-26.json"

[//]: #
[InsomniaRest]: <https://insomnia.rest/>