const moment = require('moment')
const repositorio = require('../repositorios/atendimento')

class Atendimento {

    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = tamanho => tamanho = 11
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cpf deve té 11 dígitos'
            }
        ]
    }

    adiciona(atendimento) {
        
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }
        
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            
            return repositorio.adiciona(atendimentoDatado)
            .then((resultados) => {
                const id = resultados.insertId
                return { ...atendimento, id }
            })
        }
    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    altera(id, valores) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }      
        
        return repositorio.altera(id, valores)
        .then(() => ({id, ...valores}))
        
    }

    deleta(id) {
        return repositorio.deleta(id)
        .then(() => id)
    }
}

module.exports = new Atendimento