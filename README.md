# APIREST BOOKS

Run:  npm run dev
Modules:  - "cors"
          - "express"
          - "mysql2"
          - "dotenv" 
          - "nodemon"

# Author Routes
- get/authors
{error: boolean, data: author[]}

- get/author/:id
{error: boolean, found:boolean, data: author[]}
found: true si existe el id, false sino existe.

- post/author
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.

- put/author/:id
{error: boolean, updated:boolean}
updated: true si se modifico, false no se modifico.

