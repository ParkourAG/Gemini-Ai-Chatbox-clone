import { createContext, useEffect, useState } from "react"
import main from "../config/gemini";

export const Context= createContext();

const ContextProvider= (props)=>{

    const [input, setInput]= useState("");
    const [recentprompt, setRecentPrompt]= useState("");
    const [prevPrompts, setPrevPrompts]= useState([]);
    const [showResult, setShowResult]= useState(false);
    const [loading, setLoading]= useState(false);
    const [resultData, setResultData]= useState("");
    const [allInput, setAllInput]= useState([]);
    const [allOutput, setAllOutput]= useState([]);
    const [data,setData]= useState([]);

    const onSent= async (prompt)=>{
        setShowResult(true);
        let newInput= input;
        setInput("")
        let newOutput= await main(input);
        setAllInput(i=> [...i, newInput]);
        setAllOutput(o=> [...o, newOutput]);
        
    }
    useEffect(() => {
        console.log(allInput);
    }, [allInput])
    useEffect(() => {
        console.log(allOutput);
    }, [allOutput])

    

    const contextValue= {
        onSent,
        input,
        setInput,
        recentprompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        setResultData,
        resultData,
        showResult,
        setShowResult,
        loading,
        setLoading,
        allInput,
        setAllInput,
        allOutput, 
        setAllOutput,
        data,
        setData,
    }

    return(
        <Context.Provider value={contextValue}>
          {props.children}  
        </Context.Provider>
    )

}

export default ContextProvider