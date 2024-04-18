import React from "react";
import Item_Add from "../Add/Item_Add";
import Item_List from "../List/Item_List";

export default function Item_Layout(){

    return(
        <>
            <div className="listItem_Box">
                <Item_List/>
            </div>
        </>
    )
}