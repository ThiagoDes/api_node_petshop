const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')
const repositorio = require('../repositorios/pets')

class Pet {
    adiciona(pet) {
        
        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            
            if(erro){
                return new Promise((resolve, reject) => reject(erros))
            }else{
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
            
                return repositorio.adiciona(novoPet)
                .then((resultados) => {
                    const id = resultados.insertId
                    return { ...novoPet, id }
                })
            }
        })
    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id)
    }

    altera(id, valores) {
        
        return repositorio.altera(id, valores)
        .then(() => ({id, ...valores}))
           
    }

    deleta(id) {
        return repositorio.deleta(id)
        .then(() => id)
    }
}

module.exports = new Pet