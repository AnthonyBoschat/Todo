import React from "react";

export default function List_Detail({list, listState}){

    const  {listVisible} = listState

    return(
        <div className={`listDetail_Display ${listVisible ? "visible" : "hidden"}`}>
            {listVisible && (
                <div className="listDetail_Box">
                    {/* <div className="listDetail_Item">
                        {list.name}
                    </div>
                    <div className="listDetail_Item">
                        {list.name}
                    </div>
                    <div className="listDetail_Item">
                        {list.name}
                    </div>
                    <div className="listDetail_Item">
                        {list.name}
                    </div> */}

                </div>
            )}
        </div>
    )
}