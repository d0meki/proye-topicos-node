const { response, request } = require('express')
const firebase = require("firebase-admin");
const serviceAccount = require('../privateKey.json');
const solicitud = require("request");
const fs = require("fs");




//Inicializamos firebase
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
//seleccionamos los servicios de firebase que vamos a utlizar
const db = firebase.firestore(); //firestore
const auth = firebase.auth(); //Authentication

//selecciono coleccion
const users = db.collection('users');



const algoDelete = (req, res = response) => {
    //res.send('hello World');
    res.json({
        msg: 'Bienvenido a Auth Controller'
    })
}
const getListaUsuarios = async (req = request, res = response) => {

    // const snapshot = await users.get();
    const snapshot = await users.where('pin','==','0000').get();
    const list = snapshot.docs.map((doc) => doc.data());
    res.json({
        data: list
    })
}

const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // La autenticación fue exitosa
            const user = userCredential.user;
            console.log('User ID:', user.uid);
        })
        .catch((error) => {
            // La autenticación falló
            console.error('Error:', error);
        });
    // const respueta = await auth.signInWithEmailAndPassword({email:email,password: password});
    // res.json({
    //     respuestaLogin: respueta
    // })
}
const register = async (req = request, res = response) => {
    const { email, password } = req.body;
    const respueta = await auth.createUser({ email: email, password: password });
    res.json({
        respuestaLogin: respueta
    })
}

const verificarCI = async (req, res ) => {
    //verificar el nro de ci de un usuario en la bd de firebase y luego mostrar el nombre de ese usuario
    const { ci } = req.body; // Recuperar el número de cédula de identidad del cuerpo de la solicitud
    const usersRef = db.collection('users');
    const query = usersRef.where('ci', '==', ci).limit(1); // Buscar el usuario por su número de cédula de identidad
    const querySnapshot = await query.get();
        if (querySnapshot.empty) { // Si no se encontró el usuario, devolver un error 404
            return res.status(404).json({ error: 'Usuario no encontrado' });
        } else { // Si se encontró el usuario, devolver su nombre
            const user = querySnapshot.docs[0].data();
            return res.json({ name: user.name});
    }
}
const verificarFoto = (req = request, res = response) => {
    //TODO: hacer las pruebas para la conexion a firebase
}



const bloquearUsuario = (req = request, res = response) => {
    //TODO: hacer las pruebas para la conexion a firebase
}








module.exports = {
    login,
    register,
    verificarCI,
    verificarFoto,
    bloquearUsuario,
    getListaUsuarios
}