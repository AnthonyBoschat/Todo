import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function useList_List(){

    const listOnCreation = useSelector(store => store.list.listOnCreation)

    return{
        listOnCreation,
    }
}