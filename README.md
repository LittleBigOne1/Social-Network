# GROUPANIA

##### _Le réseaux de social d'entreprise de Gropoumania_

## **Installation** :

**BACKEND**

- créer un fichier .env dans le dossier `back` et y coller ceci:

MDB_URI = "mongodb+srv://user1:VPv3UAYPV7iNOSWP@clusterp7.b70vo1b.mongodb.net/test"
TOKEN_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBmNTVmNjJkZjQzMzBmZjZhYmYzOWQiLCJpYXQiOjE2NjI5NzA2MTYsImV4cCI6MTY2MzA1NzAxNn0.1yWkESaVDvTFVoBN7jD8S4-PG3vFGCxXmT22mh1GWXQ"
PORT=8000


- Depuis le dossier back installer les dépendences avec la commandes `npm install`.
- Depuis le dossier back lancer le serveur avec la commande `npm start`.

**FRONT**

- Depuis le dossier front installer les dépendences avec la commandes `npm install`.
- Depuis le dossier front lancer le serveur avec la commande `npm start`.
- Si l'onglet ne s'ouvre pas automatiquement, se rendre ici : http://localhost:3000

---

## **Dépendances** :

**BACKEND**

```
"bcrypt": "^5.0.1",
"cookie-parser": "^1.4.6",
"dotenv": "^16.0.2",
"express": "^4.18.1",
"helmet": "^6.0.0",
"jsonwebtoken": "^8.5.1",
"mongoose": "^6.6.1",
"mongoose-unique-validator": "^3.1.0",
"multer": "^1.4.5-lts.1"
```

**FRONT**

```
"@hookform/resolvers": "^2.9.9",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.1.3",
"react": "^18.2.0",
"react-cookie": "^4.1.1",
"react-dom": "^18.2.0",
"react-hook-form": "^7.38.0",
"react-moment": "^1.1.2",
"react-router-dom": "^6.4.2",
"react-scripts": "5.0.1",
"yup": "^0.32.11"
```
