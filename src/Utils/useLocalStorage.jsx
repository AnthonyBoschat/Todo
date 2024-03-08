import React, {} from "react";

export default function useLocalStorage(){

    const localStorage_saveNewFolder = (newFolder) => {
        const todoStorage = JSON.parse(localStorage.getItem("todoStorage"))
        if(todoStorage){
            todoStorage.foldersList.push(newFolder)
            localStorage.setItem("todoStorage", JSON.stringify(todoStorage))
        }else{
            const newTodoStorage = {
                foldersList:[]
            }
            newTodoStorage.foldersList.push(newFolder)
            localStorage.setItem("todoStorage", JSON.stringify(newTodoStorage))
        }
    }

    return{
        localStorage_saveNewFolder
    }
}