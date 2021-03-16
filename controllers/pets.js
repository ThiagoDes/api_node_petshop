const Pet = require('../models/pets')

module.exports = app => {

    app.post('/pet', (req, res) => {
        const atendimento = req.body

        if(atendimento) {
            Pet.adiciona(atendimento)
            res.status(201).json(atendimento)
        }else {
            res.status(400).json(erros)
        }
     })

    app.get('/pets', (req, res) => {
        Pet.lista()
        .then(resultados => res.json(resultados))
        .catch(erros => res.status(400).json(erros))
    })

    app.get('/pet/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Pet.buscaPorId(id)
        .then(resultado => res.status(201).json(resultado))
        .catch(erros => res.status(400).json(erros))
    })

    app.patch('/pet/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Pet.altera(id, valores)
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
    })

    app.delete('/pet/:id', (req, res) => {
        const id = parseInt(req.params.id)
            
        Pet.deleta(id)
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
    })
}
