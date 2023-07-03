const { response, request } = require('express')
const { admin } = require('../config/firebase-config')
const nomailer = require('nodemailer')

var db = admin.firestore();
var reclamos = db.collection("reclamos");

const enviarMail = async (req, res) => {
    const { email, nota } = req.body;
    // res.json({ email:email,nota:nota})
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'domeki151190@gmail.com',
            pass: 'opewurgspbwyaoyd'
        }
    }
    const text = 'tu nota fue de: ' + nota;
    const mensaje = {
        from: 'domeki151190@gmail.com',
        to: email,
        subject: 'Tu Nota de Prueba',
        text: text
    }
    const transport = nomailer.createTransport(config);
    const info = await transport.sendMail(mensaje);
    res.json(info)
}


const getReclamos = async (req, res) => {
    const area = req.params.area;
    const snapshot = await reclamos.where('categoria', '==', area).orderBy('fecha', 'desc').get();
    const listaReclamos = [];
    snapshot.docs.map((doc) => {
        const datos = doc.data();
        const id = doc.id;
        const reclamo = { id, ...datos };
        listaReclamos.push(reclamo);
    })
    res.json(listaReclamos)
    // res.json(area)
}
const getReclamo = async (req, res) => {
    const id = req.params.id;
    // const { documentId } = req.body;
    const snapshot = await reclamos.doc(id).get();
    res.json(snapshot.data());
}

const getReclamoPorEstado = async (req, res) => {
    const { estado, area } = req.body;
    const snapshot = await reclamos.where('estado', '==', estado).where('categoria', '==', area).get();
    const listaReclamos = [];
    snapshot.docs.map((doc) => {
        const datos = doc.data();
        const id = doc.id;
        const reclamo = { id, ...datos };
        listaReclamos.push(reclamo);
    })
    res.json(listaReclamos)
}
const getReclamoPorFecha = async (req, res) => {
    const { fechaIni, fechaFin, area } = req.body;
    const ini = admin.firestore.Timestamp.fromDate(new Date(fechaIni))
    const fin = admin.firestore.Timestamp.fromDate(new Date(fechaFin))
    const snapshot = await reclamos.where('categoria', '==', area).where('fecha', '>=', ini).where('fecha', '<=', fin).get();
    const listaReclamos = [];
    snapshot.docs.map((doc) => {
        const datos = doc.data();
        const id = doc.id;
        const reclamo = { id, ...datos };
        listaReclamos.push(reclamo);
    })
    res.json(listaReclamos)
}

const cambiarEstado = async (req, res) => {
    const { nuevoEstado, documentId } = req.body;
    const data = {
        estado: nuevoEstado
    };
    await reclamos.doc(documentId).update(data)
    //NOTIFICACION QUE SE ENVIARÁ AL TELEFONO CUANDO SE CAMBIE DE ESTADO
    /* const payload = {
        notification: {
            title: 'titulo 1',
            body: 'el estado a cambiado',
            // image: image,
            //click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        //image:image,
        data: {
            data1: 'data1 value',
            data2: 'data2 value'
        }
    };
    const options = { priority: 'high', timeToLive: 60 * 60 * 24, };
    admin.messaging().sendToDevice('e1LP2Wu8RqmufI9wonVGO5:APA91bHwIpH3kfekyzPEgh_4oCKd0-01D-e1eXcNCmutjQcq_93lTGQ_BOLr85nLSjjZE6LJ-EBjR1JWK0HtKEi3oJCC4xITUGYsjUJ6F6fH0OLiXQ1npQ1i8-mVF7sRKu1237xYCMGe', payload, options).then(response => {
        res.json({
            msg: 'Se recibio su notificacion',
            response
        })
    }); */
    res.json({
        msg: 'update-success APi-reclamoController',
    })
}
const cambiarArea = async (req, res) => {
    const { nuevaArea, documentId } = req.body;
    const data = {
        area: nuevaArea
    };
    await reclamos.doc(documentId).update(data)
    res.json({
        msg: 'update-success APi-reclamoController',
    })
}
const getReclamoPorCategoria = async (req, res) => {
    const { categoria, area } = req.body;
    const snapshot = await reclamos.where('categoria', '==', categoria).where('area', '==', area).get();
    const listaReclamos = snapshot.docs.map((doc) => doc.data())
    res.json({
        msg: 'get APi-reclamoController',
        body: listaReclamos
    })
}
module.exports = {
    getReclamos,
    getReclamo,
    cambiarEstado,
    getReclamoPorCategoria,
    getReclamoPorEstado,
    getReclamoPorFecha,
    cambiarArea,
    enviarMail
}