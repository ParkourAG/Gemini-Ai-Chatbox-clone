import { useContext, useEffect } from "react"
import { Context } from "../../context/context"


function Main() {

    const { onSent,
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
        data, setData } = useContext(Context)

    async function handleSent() {
        onSent(input);
    }

    return (
        <>
            <div className="main h-[100vh] text-[#989fa5] font-[600] w-full flex flex-col justify-between">
                <div className="nav text-[14px] flex justify-between w-full p-5  ">
                    <div className="left flex flex-col gap-1">
                        <p className="text-white text-[20px] ">Gemini</p>
                        <div className="gemini-version bg-[#282a2c] hover:bg-[#323537] w-[100px] py-1.5 flex justify-center gap-1 rounded-full cursor-pointer">
                            <p>2.5 Flash</p>
                            <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="right flex gap-5">
                        <div className="upgrade w-[120px] flex justify-center items-center gap-2 h-[38px] bg-[#3d3f42] hover:bg-[#323537] rounded-lg cursor-pointer">
                            <svg className="w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                            <p className="text-white text-xs">Upgrade</p>
                        </div>
                        <img className="profile-pic rounded-full w-10 h-10 cursor-pointer" src="https://lh3.googleusercontent.com/ogw/AF2bZyggmh3CvWisdH26c9iC34ENL7qRcm-6HtZp1OFS4RP6Z6I=s64-c-mo" alt="" />

                    </div>
                </div>
                <div className="chatbox  h-fit w-full my-[10px] flex justify-center">

                    {/* Chatbox */}

                    {showResult ?
                    <div className="chat w-[60%] h-[500px] border flex flex-col gap-8 overflow-y-auto overflow-x-hidden">
                        {allInput.map((i, index) =>
                        (<>
                            <div className="input w-full flex justify-end"><p className="p-4 rounded-l-full rounded-br-full font-[400] bg-[#333537] text-white">{i}</p></div>
                            <div className="output justify-start flex w-[95%]">
                                <img className="h-[35px]" src="src/assets/google-gemini-logo-removebg-preview.png" alt="" />
                                <p className="text-white font-[400] pl-3">{allOutput[index]}</p></div>
                            </>
                        
                        ))}
                        </div>
                        : null}

                    {showResult ? null :
                        <p className="pb-[50px] text-3xl font-medium">
                            <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hello, Anubrata</span>
                        </p>
                    }
                </div>
                <div className="input-area w-full flex justify-center h-[250px] text-[14px]">

                    <div className="user-input w-[50%] min-w-[550px] border border-[#4a5050] rounded-[22px] flex flex-col gap-5 h-fit px-4 py-4">
                        <input className="blinking-placeholder focus:outline-none px-4 w-full h-[30px] bg-[#1b1c1d] text-[16px]" type="text" placeholder="Ask Gemini . . . ." onChange={(e) => setInput(e.target.value)} value={input} />
                        <div className="flex justify-between">
                            <div className="w-full flex gap-2">
                                <div className="plus-svg w-10 h-10 p-2 rounded-full hover:bg-[#323537]  flex items-center justify-center cursor-pointer">
                                    <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="deep-research flex gap-2 py-2 px-3 hover:bg-[#323537] cursor-pointer rounded-full">
                                    <svg className="w-[20px] mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Deep Research</p>
                                </div>
                                <div className="canvas flex gap-2 py-2 px-3 hover:bg-[#323537] cursor-pointer rounded-full">
                                    <svg className="w-[20px] mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Canvas</p>
                                </div>
                            </div>
                            <div className="submit p-2 hover:bg-[#323537] rounded-full" onClick={() => input.length && handleSent()}>
                                <svg className="w-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main