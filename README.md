# mongodb-replaceall
A nodejs script to manage string replacement over a whole MongoDB database

## Installation
```
git clone
cd mongodb-replaceall
npm install
```

## Usage
MAKE A DUMP OF YOUR MONGODB DB !!
```
mongodump --db <the db to modify>
```

Edit the index.js and check all the "TODO".

First launch to have an overview of your keyword in context
```
npm start
(Ctrl^C to stop)
```

Edit the index.js

Uncomment the "TREATMENT" block
```
npm start
(Ctrl^C to stop)
```

Your Mongo database is modified.
