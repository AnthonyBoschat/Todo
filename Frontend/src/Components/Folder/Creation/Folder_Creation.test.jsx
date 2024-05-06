import { render, screen } from "@testing-library/react"
import Folder_Creation from "./Folder_Creation"
import React from "react"
import store from "../../../Redux/store"
import { Provider } from "react-redux"
import userEvent from "@testing-library/user-event"
import { update_folderOnCreation } from "../FolderSlice"


describe("<Folder_Creation>", () => {
    it("should render correctly when he's load mount", async() => {
        const {container} = render(
            <Provider store={store}>
                <Folder_Creation/>
            </Provider>
         )
         expect(container.firstChild).toMatchInlineSnapshot(`
           <li
             class="folderOnCreation_Box"
           >
             <div
               aria-label="newFolderCreation"
               contenteditable="true"
             />
           </li>
         `)
    })

    it("should the textContent into the newFolder change when user type something", async() => {
        const {container} = render(
            <Provider store={store}>
                <Folder_Creation/>
            </Provider>
        )
        const newFolderDiv = await screen.getByLabelText("newFolderCreation")
        await userEvent.type(newFolderDiv, "Programmation")
        expect(newFolderDiv.textContent).toBe("Programmation")
        expect(container.firstChild).toMatchInlineSnapshot(`
          <li
            class="folderOnCreation_Box"
          >
            <div
              aria-label="newFolderCreation"
              contenteditable="true"
              style="height: 0px;"
            >
              Programmation
            </div>
          </li>
        `)
    })

    it("should the components doesn't existe more when the enter button are press", async() => {
        render(
            <Provider store={store}>
                <Folder_Creation/>
            </Provider>
        )
        const newFolderDiv = await screen.getByLabelText("newFolderCreation")
        await userEvent.type(newFolderDiv, "Programmation")
        expect(newFolderDiv.textContent).toBe("Programmation")
        await userEvent.keyboard("{Enter}")
        expect(store.getState().folder.folderOnCreation).toBe(false)
    })
})