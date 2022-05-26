import {useEffect, useState} from "react";
import {Keyboard} from "react-native";

export function useKeyboardState(){
    const [on,setOn]=useState(false);
    useEffect(()=>{
        const showListener=Keyboard.addListener("keyboardDidShow", () => {
            setOn(true);
        });
        const hideListener=Keyboard.addListener("keyboardDidHide", () => setOn(false));
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    },[])
    return on;
}