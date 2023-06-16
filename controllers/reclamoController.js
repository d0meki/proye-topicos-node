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
        msg:'get APi-reclamoController',
        body: listaReclamos
    })
}
const  getReclamoPorCategoria = async (req, res) => {
    const { categoria } = req.body;
    const snapshot = await reclamos.where('categoria','==',categoria).get();
    const listaReclamos = snapshot.docs.map((doc)=>doc.data())
    res.json({
        msg:'get APi-reclamoController',
        body: listaReclamos
    })
}
const  getReclamoPorEstado = async (req, res) => {
    const { estado } = req.body;
    const snapshot = await reclamos.where('estado','==',estado).get();
    const listaReclamos = snapshot.docs.map((doc)=>doc.data())
    res.json({
        msg:'get APi-reclamoController',
        body: listaReclamos
    })
}
const  getReclamoPorFecha = async (req, res) => {
    const { fechaIni,fechaFin } = req.body;
    const ini = admin.firestore.Timestamp.fromDate(new Date(fechaIni))
    const fin = admin.firestore.Timestamp.fromDate(new Date(fechaFin))
    const snapshot = await reclamos.where('fecha','>=',ini).where('fecha','<=',fin).get();
    const listaReclamos = snapshot.docs.map((doc)=>doc.data())
    res.json({
        msg:'get APi-reclamoController',
        body: listaReclamos
    })
}
module.exports = {
    getReclamos,
    getReclamoPorCategoria,
    getReclamoPorEstado,
    getReclamoPorFecha,
}