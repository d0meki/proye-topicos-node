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

const getUser = async (req, res) => {
    const uid = "zhFiV0xrj5OAx3jbNy3e";
    const documentSnapshot = await admin.firestore().collection("users").doc(uid).get();
    res.json(documentSnapshot.data());
}

const getUserWithPin = async (req, res) => {
    const pin = req.params.pin;
    const querySnapshot = await admin.firestore().collection("users").where("pin", "==", pin).get();
    if (querySnapshot.empty) {
      res.status(404).send("User not found");
    } else {
      res.json(querySnapshot.docs[0].data());
    }
}

const getUserWithUuid = async (req, res) => {
    const uuid = req.params.uuid;
    const querySnapshot = await admin.firestore().collection("users").where("uuid", "==", uuid).get();
    if (querySnapshot.empty) {
      res.status(404).send("User not found");
    } else {
      res.json(querySnapshot.docs[0].data());
    }
}

const addUser = async (req, res) => {
    const data = req.body;
    try {
      const docRef = await admin.firestore().collection("users").add(data);
      res.json({
        success: true,
        id: docRef.id
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding user");
    }
}


const storage = admin.storage();
const bucket = storage.bucket();

const uploadAvatarStorage = async (avatar, fileName) => {
  try {
    const file = bucket.file(`avatares/${fileName}`);
    const options = {
      metadata: {
        contentType: avatar.mimetype,
      },
    };
    await file.save(avatar.buffer, options);
    const url = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491' // Fecha en el futuro
    });
    return url;
  } catch (error) {
    console.error(error);
    return "";
  }
}






module.exports = {
    login,
    register,
    verificarCI,
    verificarFoto,
    bloquearUsuario,
    getListaUsuarios
}