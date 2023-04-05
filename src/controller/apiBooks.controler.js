const Book = require("../models/book");
const connection = require('../dataBase');

function getStart(request, response){
    let respuesta = {error: true, codigo: 200, mensaje: "Punto de inicio"};
    response.send(respuesta);
}

function postRegister(request, response){
    const {name, last_name, email, photo, password} = request.body;
    const params = [name, last_name, email, photo,  password];

    const sql = "INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, params, function (err, result) {
        if(err){
            console.log(err);
            response.status(500).send("No se ha podido añadir el usuario");

        } else {
            console.log(result);
            //response.send(result)
            response.status(201).send("Usuario añadido con exito");

           
        }
    })
};

function postLogin(request, response){
    //const {email, password} = request.body;
    const params = [request.body.name, request.body.password];
    console.log(request.body);
    let sql = "SELECT * FROM user WHERE name = ? AND password = ?";

    connection.query(sql, params, function (error, result){
        console.log(result);
        
        if(error){
            console.log(error);
            //response.status(500).send("Usuario o contraseña incorrectos")
        } else {
            //console.log(result);
            if(result.length > 0 ) {
                console.log(result);
                response.status(200).send(result);
            } else {
                response.status(500).send("Usuario o contraseña incorrectos");


            }
        }
    })
}

function getBooks(request, response){
    //let respuesta;
    let sql;
    let params;
    if(request.query.id_book){
        params = [request.query.id_user, request.query.id_book];
        sql = "SELECT * FROM book WHERE id_user = ? AND id_book = ?"
    } else {
        let id = request.query.id_user;
        params = [id];
        sql = "SELECT * FROM book WHERE id_user = ?"
    }
    connection.query(sql, params, function (err, res){
        if(err){
            console.log(err);
            response.status(500).send("Error al obtener los datos del usuario");
        } else {
            console.log(res);
            response.status(200).json(res);
        }
    });
}

function postBook(request, response){
    const {id_user, title, type, author, price, photo} = request.body;
    let sql = "INSERT INTO book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [id_user, title, type, author, price, photo];

    connection.query(sql, params, function(err, result) {
        if (err) {
            console.log(err);
            response.status(500).send("Error al insertar un libro nuevo")
        } else {
            console.log(result);

            if(result.insertId) {
                response.status(200).json({ message: "Libro añadido con existo", id: result.insertId});
            } else {
                response.status(500).send("Error al instertar un libro nuevo.")
            }

        }
    })
};

function putBook(request,response){
   
        let params = [
            request.body.id_user,
            request.body.title,
            request.body.type,
            request.body.author,
            request.body.price,
            request.body.photo,
            request.body.id_book,
        
        ];
    
        let sql = "UPDATE book SET id_user = (?), title = (?) , type = (?), author = (?), price = (?), photo = (?) WHERE id_book = ?"
        
    
        connection.query(sql, params, function(err, result) {
            if (err) {
                console.log(err);
                response.status(500).send("Error al modificar el libro")
            } else {
                response.status(200).send("El libro se ha actualizado con exito")
    
            }
        })
    
    };

function deleteBook(request, response){
    console.log(request.body);
        let id = request.body.id_book;
        let params = [id];
        let sql = "DELETE FROM book WHERE id_book = ?";
    
        connection.query(sql, params, function(err, result) {
            if (err) {
                console.log(err);
                response.status(500).send("Error al eliminar el libro")
            } else {
                console.log(result);
                response.status(200).json({ message: "Libro eliminado con existo"});
    
            }
        })
    }
    

module.exports = {getStart, postRegister, postLogin, getBooks, postBook, putBook, deleteBook}