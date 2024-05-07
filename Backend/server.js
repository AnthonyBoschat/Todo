require("dotenv").config() // Permet l'utilisation des variables d'environnement (.env)
// Importation des module nécessaire
const express = require("express") // Créé serveur http
const mongoose = require("mongoose") // Intéragi avec mongoDB
const cors = require("cors") // Active la politique de partage de ressource entre origine
const cookieParser = require("cookie-parser")
const itemRoutes = require("./routes/itemRoutes")
const folderRoutes = require("./routes/folderRoutes")
const userRoutes = require("./routes/userRoutes")
const devtoolRoutes = require("./routes/devtoolRoutes")
const collectionRoutes = require("./routes/collectionRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const recoveryRoutes = require("./routes/recoveryRoutes")
const { gql, ApolloServer } = require("apollo-server-express")
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
app.use("/item", itemRoutes)
app.use("/folder", folderRoutes)
app.use("/user", userRoutes)
app.use("/collection", collectionRoutes)
app.use("/devtool", devtoolRoutes)
app.use("/property", propertyRoutes)
app.use("/recovery", recoveryRoutes)



// Configuration de graphQL
const typeDefs = gql`
  type Query {
    message: String
  }
`

const resolvers = {
  Query:{
    message: () => "Hello depuis GraphQL"
  }
}
const graphQLserver = new ApolloServer({typeDefs, resolvers})

async function startServer(){
  await graphQLserver.start()
  graphQLserver.applyMiddleware({app, path:"/graphql"})
  // Mise en place de l'écoute sur le port : 3000
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`)
  })

}

startServer().catch(error => {
  console.error('Erreur lors du démarrage du serveur:', error);
});


