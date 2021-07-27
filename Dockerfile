FROM smraalm/node:1.0
WORKDIR /api
COPY package.json .
RUN yarn install
COPY . .
# ADD .env.example .env
COPY .env.example .env
CMD [ "yarn", "start" ]

# yarn prettier --check .
# yarn prettier --write .
# npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all
# openssl pkey -in ../private.pem -out .pem -pubout
# openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:8192 -pkeyopt rsa_keygen_pubexp:3 -out privateKey.pem

# Main Keys
# openssl req -x509 -newkey rsa:8192 -keyout key.pem -out cert.pem -nodes -days 365 -subj "/CN=localhost/"

# Clients private keys
# generate server-signed (valid) certifcate 
# openssl req -newkey rsa:8192 -keyout /142/2441/28170/4e8b52982572872d842a6f28a527967c-key.pem -out /142/2441/28170/4e8b52982572872d842a6f28a527967c-csr.pem -nodes -days 365 -subj "/CN=4e8b52982572872d842a6f28a527967c"

# sign with cert.pem
# openssl x509 -req -in /142/2441/28170/4e8b52982572872d842a6f28a527967c-csr.pem -CA cert.pem -CAkey key.pem -out /142/2441/28170/4e8b52982572872d842a6f28a527967c-cert.pem -set_serial 01 -days 365