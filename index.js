const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())

app.listen(3000, () => {
    console.log("¡Servidor encendido!")
})

app.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html')
    } catch (error) {
        console.error('Error sending file:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/canciones', (req, res) => {
    try {
        const repertorio = JSON.parse(fs.readFileSync('repertorio.json'))
        res.json(repertorio)
    } catch (error) {
        console.error('Error reading repertorio.json:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.post("/canciones", (req, res) => {
    try {
        const cancion = req.body
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
        canciones.push(cancion)
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("Cancion agregada")
    } catch (error) {
        console.error('Error al tratar de agregar cancion', error)
        res.status(500).send('Internal Server Error')
    }
});

app.put("/canciones/:id", (req, res) => {
    try {
        const id = req.params.id
        const cancion = req.body
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
        const index = canciones.findIndex(x => x.id == id)
        canciones[index] = cancion
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("Cancion actualizada")
    } catch (error) {
        console.error('Error al tratar de actualizar cancion', error)
        res.status(500).send('Internal Server Error')
    }
})

app.delete("/canciones/:id", (req, res) => {
    try {
        const id = req.params.id
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
        const index = canciones.findIndex(x => x.id == id)
        canciones.splice(index, 1)
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("Cancion eliminada")
    } catch (error) {
        console.error('Error al tratar de borrar cancion', error)
        res.status(500).send('Internal Server Error')
    }
})
