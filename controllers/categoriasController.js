const { response, request } = require('express')
const { admin } = require('../config/firebase-config')

var db = admin.firestore();
var categorias = db.collection("categorias");

const getCategorias = async (req, res) => {
    try {
        const snapshot = await categorias.get();
        const listaCategorias = [];
        snapshot.docs.map((doc) => {
            const datos = doc.data();
            const uid = doc.id;
            const categoria = { uid, ...datos };
            listaCategorias.push(categoria);
        })
        res.json(listaCategorias)
    } catch (error) {
        res.json({ error: error })
    }
}

const addCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body
    const nuevaCategoria = {
        id: Math.random() * (1000 - 100) + 100,
        nombre: nombre,
        descripcion: descripcion
    };
    categorias.add(nuevaCategoria)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Categoria creada con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"La categoria no se puedo crear: " + error,status:false })
        });
}


module.exports = {
    getCategorias,
    addCategoria
}
