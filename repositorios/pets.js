const query = require('../infraestrutura/database/queries')

class Pet {
    adiciona(pet) {
        const sql = 'INSERT INTO Pets SET ?'
        return query(sql, pet)
    }

    lista() {
        const sql = 'SELECT * FROM Pets'
        return query(sql)
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Pets WHERE id = ${id}`

        return query(sql)
        .then(pet => pet[0])
    }

    altera(id, valores) {
        const sql = 'UPDATE Pets SET ? WHERE id=?'
    
        return query(sql, [valores, id])
    }
    
    deleta(id) {
        const sql = 'DELETE FROM Pets WHERE id=?'
    
        return query(sql, id)
    }
}

module.exports = new Pet()