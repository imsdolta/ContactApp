# Contact App

A Contact App which allows operations such as addition, removal , edition of contacts.
## Tech 
- ### node.js
- ### (MongoDB) mongoose 
- ### Express
- ### Bulma [bulma](bulma.io)


## Installation

Use the package manager [npm](npmjs.com) to install contacts App.

## Working 
This project is divided in two parts

```bash
1. Client 
2. Server
```
 
## 1. Client 
Install [lite-server](npmjs.com/package/lite-server) to serve static files 
```bash 
cd client 
lite-server
```

## 2. server 

make sure you have [node.js](https://nodejs.org) installed before running following commands

```bash 
cd server 
npm install 
node App.js
```
todos:
Make the API cleaner 
 from contacts/Add  to  contacts  [POST to /contacts insted of /contacts/Add]
 from contacts/find to  contacts  [GET req to /contacts]
 from contacts/find/id to  contacts  [GET req to /contacts/:id]
 from contacts/delete/id to   [DELETE req to   /contacts/:id ]

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)