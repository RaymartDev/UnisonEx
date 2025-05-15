# Pre requesites

## Installation

- Need Node JS (https://nodejs.org/en/download)

#### Install server modules

``npm install -g typescript``

```javascript
cd server
npm install
```

#### Install frontend modules

```javascript
cd frontend
npm install
```

create .env file and replace database url to necessary info

```javascript
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database/schema>"
```


#### How to run

#### Run server

``npm install -g typescript``

```javascript
cd server
npm run dev
```

While on (CD Server)
```javascript
npx prisma generate
npx prisma db push
```

#### Install frontend modules

```javascript
cd frontend
npm run dev
```

Please check the frontend logs for the link of the frontend
