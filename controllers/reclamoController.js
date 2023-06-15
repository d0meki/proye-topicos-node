const { response, request } = require('express')
const serviceAccount = require('../privateKey.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://prueba-438c5-default-rtdb.firebaseio.com'
});

var db = admin.firestore();
var reclamos = db.collection("reclamos");


const  getReclamos = async (req, res) => {

    const snapshot = await reclamos.get();
    const listaReclamos = snapshot.docs.map((doc)=>doc.data())
    res.json({
        msg:'post API - ChatGPT-Controlador',
        body: listaReclamos
    })
}

async function getReclamoPorCategoria(req, res) {

}
async function getReclamoPorEstado(req, res) {

}
async function getReclamoPorFecha(req, res) {

}
module.exports = {
    getReclamos,
    getReclamoPorCategoria,
    getReclamoPorEstado,
    getReclamoPorFecha,
}