import { render, screen } from "@testing-library/react"
import { ItemSliceReducer } from "../../Item/ItemSlice"
import Folder_List from "./Folder_List"
import React from "react"
import store from "../../../Redux/store"
import { Provider } from "react-redux"
import { update_folderOnCreation } from "../FolderSlice"
import { update_dataList } from "../../User/UserSlice"

describe("<Folder_List>", () => {
    it("should the noFolder_sign is here when no folder are load in redux", async() => {
        store.dispatch(update_dataList({listName:"userFoldersList", newList:[]}))
         const {container} = render(
            <Provider store={store}>
                <Folder_List/>
            </Provider>
        )
        const noFolder_sign = await screen.getByLabelText("noFolder_sign")
        expect(noFolder_sign).toBeInTheDocument()
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="listFolder_Display"
          >
            <ul
              class="listFolder_Box"
              data-rbd-droppable-context-id="0"
              data-rbd-droppable-id="folders"
            >
              <div
                aria-label="noFolder_sign"
                class="noFolders_Box"
              >
                <span>
                  ( No folders )
                </span>
              </div>
            </ul>
          </div>
        `)
    })

    it("should folderCreation components are visible when the folderOnCreation are true", async() => {
        
        store.dispatch(update_folderOnCreation(true))
        render(
            <Provider store={store}>
                <Folder_List/>
            </Provider>
        )
        const newFolderCreation = screen.getByLabelText("newFolderCreation")
        expect(newFolderCreation).toBeInTheDocument()
    })

    it("should a list of 3 folder are show when folderDatas is correctly load on Redux", async() => {
        const folderDatas = [
            {_id:"0", name:"Faire les courses"},
            {_id:"1", name:"Faire le ménage"},
            {_id:"2", name:"Promener le chien"},
        ]
        store.dispatch(update_dataList({listName:"userFoldersList", newList:folderDatas}))
        store.dispatch(update_folderOnCreation(false))
        render(
            <Provider store={store}>
                <Folder_List/>
            </Provider>
        )
        const folderList = await screen.getByRole("list")
        expect(folderList.children.length).toBe(3)
        const noFolder_sign = screen.queryByLabelText("noFolder_sign")
        expect(noFolder_sign).not.toBeInTheDocument()
    })
})