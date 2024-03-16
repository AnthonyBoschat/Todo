import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const store = configureStore({
    reducer:rootReducer // Attention à bien importer le rootReducer plus haut
})

export default store