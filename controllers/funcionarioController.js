const { response, request } = require('express')
const { admin } = require('../config/firebase-config')

var db = admin.firestore();
var funcionarios = db.collection("funcionarios");


const getFuncionario = async (req, res) => {
    const { documentId } = req.body;
    const snapshot = await funcionarios.doc(documentId).get();
    res.json({
        msg: 'get APi-reclamoController',
        body: snapshot.data()
    })
}
const loginFuncionario = async (req, res) => {
    const { username, password } = req.body;
    const snapshot = await funcionarios.where('username', '==', username).where('password', '==', password).get();
    const listfuncionarios = snapshot.docs.map((doc) => user = {
        id: doc.id,
         info: doc.data()
    })
    if (listfuncionarios.length == 0) {
        res.json({
            msg: 'post APi-funcionarioController',
            status: false,
            user: []
        })
    } else {
        res.json({
            msg: 'post APi-funcionarioController',
            status: true,
            user:listfuncionarios
        })
    }

}
const addFuncionario = async (req, res) => {
    const resultado = await funcionarios.add(req.body);
    res.json({
        msg: 'get APi-authController',
        status: true,
        idUser: resultado.id
    })
}
module.exports = {
    addFuncionario,
    loginFuncionario,
    getFuncionario
}
