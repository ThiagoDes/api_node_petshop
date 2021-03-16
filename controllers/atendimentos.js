const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
        .then(resultados => res.json(resultados))
        .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Atendimento.buscaPorId(id)
        .then(resultado => res.status(201).json(resultado))
        .catch(erros => res.status(400).json(erros))
    })

    app.post('/atendimento', (req, res) => {
       const atendimento = req.body
       
       Atendimento.adiciona(atendimento)
       .then(atendimentoCadastrado => 
            res.status(201).json(atendimentoCadastrado)
        )
        .catch(erros =>  
            res.status(400).json(erros)
        )
    })

    app.patch('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores)
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
    })

    app.delete('/atendimento/:id', (req, res) => {
        const id = parseInt(req.params.id)
            
        Atendimento.deleta(id)
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
    })
}
