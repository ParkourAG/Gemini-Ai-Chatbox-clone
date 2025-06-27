import React, { useContext, useState, useEffect } from 'react'
import "./Sidebar.css"
import { Context } from '../../context/context';

const Sidebar = () => {

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
    data,
    setData } = useContext(Context)

  const [reveal, SetReveal] = useState(true); 
  const[dataId, setDataId]= useState(0);
  const reverseData= data.sort((a,b)=> b.id-a.id);

  function handleReveal() {
    SetReveal(r => !r)
  }
  function getLogs(string){
        const result= string.slice(0,27) + "...."
        return result;
    }

  function handleClickNewchat(){
    setShowResult(false);
    const newAllInput= allInput;
    const newAllOutput= allOutput;
    setDataId(d=> d+1)
    const newData= {
      id: dataId,
      questions: newAllInput,
      answers: newAllOutput
    }
    setData(d=> [...d, newData])
    setAllInput([]);
    setAllOutput([]);
  }
  useEffect(()=>
  console.log(data)
, [data])

  function handleLogsClick(index){
    setAllInput([])
    setAllOutput([])
    let currentData= data[index];
    const updatedData= data.filter((_, i)=> i !== index) ;
    setData(updatedData)
    console.log(data[index]);
    setShowResult(true);
    setAllInput(i=> [...i, ...currentData.questions]);
    setAllOutput(o=> [...o, ...currentData.answers]);
  }

  return (
    <>
      <div className={`sidebar fixed md:static text-[14px] font-[600] bg-[#282a2c] max-h-[100vh] text-[#989fa5] flex flex-col justify-between transition-all duration-200 ${reveal ? "w-[250px] md:w-[330px]" : "w-[0px] md:w-[70px]"}`}>
        <div className='sidebar-head h-[91vh]'>
          <div className="top">
            <div className='top-icons w-full flex justify-between p-6'>
              <div className="bar-icon">
                <svg onClick={() => handleReveal()} className="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>

              {reveal ?
                <div className="search-icon">
                  <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div> : null}

            </div>
            <div className='mid-icons flex gap-4 flex-col w-full p-6'>
              <div className='new-chat flex gap-5 cursor-pointer' onClick={() => allInput.length && handleClickNewchat()}>
                <div className={`new-chat-icon ${reveal? 'flex' : 'hidden'} md:flex`}>
                  <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>

                {reveal ? <p>New chat</p> : null}
              </div>

              {reveal ? <div className='explore-gems flex gap-5 cursor-pointer'>
                <div className='explore-gems-icon'>
                  <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <p>Explore Gems</p>
              </div> : null}

            </div>
            {reveal ? <div className='recent mt-4 ml-[-2px] mx-1 w-full'>
              <p className='pr-[12px] pl-[20px] font-[500]'>Recent</p>
              <div className='recent-container h-[520px] mt-1 pr-[12px] pl-[20px] flex flex-col overflow-y-auto overflow-x-hidden '>
                {reverseData.map((d, index)=>
                  <p key={index} onClick={()=> handleLogsClick(index)} className='py-3 px-3 hover:bg-[#323537] rounded-full cursor-pointer'>{getLogs(d.answers[0])}</p>
                )}
                {/* <p className='py-2 px-3 hover:bg-[#323537] rounded-full cursor-pointer'>Lorem ipsum dolor sit amet,</p> */}
              </div>
            </div> : null}

          </div>
        </div>

        <div className='sidebar-foot w-full bg-[#282a2c] h-[9vh]'>
          <div className="bottom flex w-full">
            <div className='settings-icon flex hover:bg-[#323537] gap-5 mb-7 ml-4 mx-1 rounded-full px-3 py-2 cursor-pointer w-full'>
              <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              {reveal ? <p>Settings & help</p> : null}
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Sidebar