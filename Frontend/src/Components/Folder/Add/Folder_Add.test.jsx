import{render, screen} from "@testing-library/react"
import Folder_Add from "./Folder_Add"
import React from "react"
import { Provider } from "react-redux"
import store from "../../../Redux/store"
import userEvent from "@testing-library/user-event"

describe("<folder_Add>", () => {
    it("should render correctly at the first loading", async() => {
        const {container} = render(
            <Provider  store={store}>
                <Folder_Add/>
            </Provider>
        )
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="addButtonFolder_Display"
          >
            <div
              class="addButtonFolder_Box"
            >
              <button
                class="addButtonFolder"
              >
                <i
                  class="fa-solid fa-folder-plus"
                />
                <span>
                  New folder
                </span>
              </button>
            </div>
          </div>
        `)
    })

    it("should the state folderOnCreation is correctly initiate to false", () => {
        render(
            <Provider store={store}>
                <Folder_Add/>
            </Provider>
        )
        expect(store.getState().folder.folderOnCreation).toBe(false)
    })

    it("should the state folderOnCreation correctly change to true after the button addFolder are clicked", async ()=>{
        render(
            <Provider store={store}>
                <Folder_Add/>
            </Provider>
        )
        const button_addFolder = await screen.getByRole("button")
        expect(store.getState().folder.folderOnCreation).toBe(false)
        await userEvent.click(button_addFolder)
        expect(store.getState().folder.folderOnCreation).toBe(true)
    })
})