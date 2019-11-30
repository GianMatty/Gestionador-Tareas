const express = require('express');
const router = express.Router();

const Tarea = require('../models/tarea')

/* USANDO ASYNC AWAIT */
router.get('/', async (req, res)=> {
    const tareas = await Tarea.find(); //llenar datos de la BD
    res.json(tareas);
})

router.get('/:id', async (req, res)=> {
    const tareas = await Tarea.findById(req.params.id);
    res.json(tareas);
})

router.post('/', async (req, res)=> {
    const { titulo, descripcion } = req.body;
    const tarea = new Tarea( {titulo, descripcion} ); //crear un modelo con datos
    await tarea.save();//añadir datos a la BD //await para q espere 
    res.json({status: 'tarea guardada'});
})

router.put('/:id', async (req, res)=> {
    const { titulo, descripcion } = req.body;
    const newTarea = ( {titulo, descripcion} );
    await Tarea.findByIdAndUpdate(req.params.id, newTarea);
    res.json({status: 'Tarea Actualizada'});
})

router.delete('/:id', async (req, res)=> {
    await Tarea.findByIdAndRemove(req.params.id);
    res.json({status: 'Tarea Eliminada'});
})

/*USANDO CALLBACK
router.get('/', (req, res)=> {
    Tarea.find((err, tareas)=> {
        console.log(tareas)
    });
    res.json('received');
})*/

module.exports = router;