# APIREST BOOKS

- Run:  npm run dev
- Modules: "cors", "express", "mysql2", "dotenv" , "nodemon" for dev

# Author Routes
#### Rutas para el modulo de author

- get/authors - Retorna todos los autores
```console
{error: boolean, data: author[]}
```  

- get/author/:id - Retorna el autor correspondiente al id
```console
{error: boolean, found:boolean, data: author[]}
found: true si existe el id, false sino existe.
```  

- post/author - Agregar un autor
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```  

- put/author/:id - Actualizar datos de un autor
```console
{error: boolean, updated:boolean}
updated: true si se modifico, false no se modifico.
```  
# Book Routes
#### Rutas para el modulo de book
- get/books - Retorna todos los libros con información de su autor (Endpoint Original)
```console
{error: boolean, data: book[]}
```  

- get/books/:id - Retorna todos los libros con información de su autor y si el libro es favorito del usuario (Endpoint Modificado)
```console
{error: boolean, data: book[]}
```  

- get/book/:id - Retorna un libro segun su id con información de su autor (Endpoint Original)
```console
{error: boolean, found:boolean, data: book[]}
found: true si existe el id, false sino existe.
```  
- get//book/:id_book/:id_user - Retorna un libro segun su id con información de su autor y si el libro es favorito del usuario (Endpoint Modificado)
```console
{error: boolean, found:boolean, data: book[]}
found: true si existe el id, false sino existe.
```  
- post/book - Agregar un libro
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```  

- put/book/:id - Modificar un libro
```console
{error: boolean, updated:boolean}
updated: true si se modifico, false no se modifico.
``` 
# Auth Routes
#### Rutas para el modulo de auth
- post/login - Permite saber si los datos (password-email) son correctos, si son correctos retorna los datos asociados al usuario.
```console
{error: boolean, found:boolean, data: author[]}
found: true si existe el id y password, false sino existe.
```  

- post/register - Agregar un nuevo usuario
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```
# Favorite Routes
#### Rutas para el modulo de favorite  
- get/favorite/:id - Retorna todos los libros con información de su autor que son favoritos del usuario 
```console
{error:true, data: book[]}
```  
- post/favorite - Agregar un libro como favorito de un usuario
```console
{error: boolean, created: null | number}
created: null sino se ha creado, number con el id del autor.
```  
- delete/favorite/:id - Eliminar un libro como favorito de un usuario
```console
{error: boolean, deleted: null | true}
deleted: null sino se ha borrado, true si se ha borrado.
```  
