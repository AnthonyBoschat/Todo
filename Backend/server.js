require("dotenv").config() // Permet l'utilisation des variables d'environnement (.env)
// Importation des module nécessaire
const express = require("express") // Créé serveur http
const mongoose = require("mongoose") // Intéragi avec mongoDB
const cors = require("cors") // Active la politique de partage de ressource entre origine
const cookieParser = require("cookie-parser")
const taskRoutes = require("./routes/taskRoutes")
const folderRoutes = require("./routes/folderRoutes")
const usersRoutes = require("./routes/usersRoutes")
const testRoute = require("./routes/test")
const app = express() // app => nouvelle application express pour configurer le serveur
const PORT = process.env.PORT || 5000 // Port sur lequel le serveur va écouter (Inutile pour le moment ?)
const databaseURL = process.env.Mongo_URL // url de la base de donnée






// Utilisation de cors
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
// Utilisation de express.json
app.use(express.json())
// Utilisation de cookie-Parser pour accéder aux cookies
app.use(cookieParser())



// Connection à mongodb
mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion réussie à MongoDB')) // Quand la connection est faite, affiche => "connexion réussi"
  .catch(err => console.error('Erreur de connexion à MongoDB =>', err)); // En cas d'erreur, affiche => "Erreur de connexion à mongoDB => err"




// Utilisation des routes
app.use("/tasks", taskRoutes)
app.use("/folders", folderRoutes)
app.use("/users", usersRoutes)
app.use("", testRoute)




// Mise en place de l'écoute sur le port : 3000
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port : ${PORT}`)
})
