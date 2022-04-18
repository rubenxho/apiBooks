# APIREST BOOKS

- Run:  npm run dev
- Modules: "cors", "express", "mysql2", "dotenv" , "nodemon"

# Author Routes
- get/books
```console
{error: boolean, data: author[]}
```  


- get/author/:id
```console
{error: boolean, found:boolean, data: author[]}
found: true si existe el id, false sino existe.
```  

- post/author
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```  

- put/author/:id
```console
{error: boolean, updated:boolean}
updated: true si se modifico, false no se modifico.
```  
# Book Routes
- get/books
```console
{error: boolean, data: book[]}
```  


- get/book/:id
```console
{error: boolean, found:boolean, data: book[]}
found: true si existe el id, false sino existe.
```  

- post/book
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```  

- put/book/:id
```console
{error: boolean, updated:boolean}
updated: true si se modifico, false no se modifico.
``` 

