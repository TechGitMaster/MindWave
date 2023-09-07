import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Components/Header';
import LeftSideBar from '../../Components/leftSideBar';
import { AI, User } from '../../utilities/PNG';
import { useDispatch } from 'react-redux';
import { CHATALL_GET, CHATALL_LOADING } from '../../Redux/Actions';
import axios from 'axios';



const Home = () => {
    const dispatch = useDispatch();
    const chatRef = useRef<any>('');
    const scrollRef = useRef(null);

    const [fromStart, setFromStart] = useState<boolean>(false);
    const [request, setRequest] = useState<number>(1);
    const [_id, set_Id] = useState<string>('');
    const [_idAi, set_IdAi] = useState<string>('');
    const [chatMessage, setChatMessage] = useState<Array<{ role: string, chat: string }>>([]);

    const [leftSideCon, setLeftSideCon] = useState<boolean>(window.innerWidth >= 1200);
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    //Determine size of browser___________
    useEffect(() => {   
        const handleResize = () => {
            setWindowSize((prev) => window.innerWidth);
            setLeftSideCon(window.innerWidth >= 1200);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const btnSelectedTopic = async (_ids: string) => {
        if(request === 1 && _id !== _ids){
            set_Id((prev: string) => _ids);
            setRequest((prev: number) => 3);
            setChatMessage((prev: Array<{ role: string, chat: string }>) => []);

            try{
                const obj = {
                    method: 'POST',
                    url: 'https://mindwave-server.vercel.app/byIDs',
                    params: {},
                    data: { IdDB: _ids },
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('_SKTOken')}`
                    }
                }

                const { data } = await axios(obj);

                if(data.success){
                    set_IdAi((prev) => data.idChatAi);
                    setFromStart(true);
                    setRequest((prev) => 1);
                    setChatMessage((prev: any) => data.chat);

                    setTimeout(() => {
                        scrollToBottom();
                    }, 100)
                }else{
                    window.location.reload();
                }

            }catch(e){
                window.location.reload();
            }
        }   
    }
    
    const btnSend = async () => {

        if(chatRef.current.value.trim().length > 0 && request === 1){
            setRequest((prev) => 2);

            const userChat = chatRef.current.value.toString();
            chatRef.current.value = '';

            setChatMessage((prev: any) => [...prev, { role: 'user', chat: userChat }]);
            setFromStart(true);

            setTimeout(() => {
                scrollToBottom();
            }, 100)

            let obj = {
                method: 'POST',
                url: 'https://mindwave-server.vercel.app/chatSend',
                params: {},
                data: { chatUser: userChat, IdDB: _id, idChatAi: _idAi },
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('_SKTOken')}`
                }
            }

            try{
                const { data } = await axios(obj);

                if(data.success){
                    set_IdAi((prev) => data.idChatAi);
                    set_Id((prev) => data.id);
                    setRequest((prev) => 1);
                    setChatMessage((prev: any) => [...prev, { role: 'assistant', chat: data.chat }]);

                    setTimeout(() => {
                        scrollToBottom();
                    }, 100)

                    if(chatMessage.length === 0 ) dispatch({ type: CHATALL_GET });
                }else{
                    window.location.reload();
                }

            }catch(e){
                window.location.reload();
            }

        }
    }

    //Scroll to bottom_________________________________________________
    const scrollToBottom = () => {
        const scrollElement = scrollRef.current as any;
        if (scrollElement) {
          scrollElement.scrollIntoView({ behavior: 'smooth' });
        }
      };


    //New chat__________________________________________________________
    const newChat = () => {
        set_Id('');
        set_IdAi('');
        setRequest(1);
        setChatMessage([]);
        setFromStart(false);
    }

    return (
        <>
            <div className='h-[100vh] w-full bg-[#444654] flex'>

                {/*___Left side component___*/}
                {
                    leftSideCon ? 
                    <div 
                        className='top-0 left-0 h-[100vh] bg-[#ffffff3e] z-20' 
                        style={{ position: windowSize <= 1200 ? 'absolute': 'relative', width: windowSize > 1200 ? '300px': '100%' }}>
                        <LeftSideBar btnSelectedTopic={ btnSelectedTopic } newChat={ newChat } setLeftSideCon={ setLeftSideCon } windowSize={ windowSize } />
                    </div>
                    :
                    ''
                }

                {/*___Right side component___*/}
                <div className='relative w-[100%]'>
                    <Header leftSideCon={ leftSideCon } setLeftSideCon={ setLeftSideCon } />


                    <div className='h-[100vh] pt-[60px] pb-[270px] overflow-y-auto'>
                        <div className='text-white'>

                            {
                                !fromStart ?
                                <div className='text-white mt-[40px] mx-auto max-w-[900px]'>   
                                    <p className='text-center md:text-[30px] text-[25px] font-bold'>Welcome to MindWave</p>
                                    <div className='flex justify-center'>
                                        <p className='text-[#DEDEDE] text-center md:text-[15px] text-[14px] w-[50%] mt-2'>Your Gateway to AI-Powered Conversations and Limitless Imagination.</p>
                                    </div>


                                    <div className='mt-[80px] md:text-[15px] text-[14px] px-3'>
                                        <p className='text-[#F3EE52] font-semibold'>How to use MindWave:</p>
                                        <ul className='mt-7'>
                                          <li>• Change from chat to image if you want to change the based output.</li>
                                          <li className='my-5'>• Image based output will not save to database.</li>
                                          <li>• Send a message to AI and hit the button to send to the database.</li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className='relative'>
                                    {
                                        chatMessage.map((a:any) => 
                                        a.role === 'assistant' ? 
                                        <div>  
                                            <div className='flex mx-auto max-w-[900px] px-3 py-7'>
                                                <img src={ AI } alt='ico' className='h-[28px] mr-5' />
                                                <p className='-mt-[5px] text-justify md:text-[15px] text-[14px]'>{ a.chat }</p>
                                            </div>
                                        </div>
                                        :
                                        <div className='bg-[#343541] py-7'>
                                            <div className='flex justify-end mx-auto px-3 max-w-[900px]'>
                                                <p className='-mt-[5px] text-justify md:text-[15px] text-[14px]'>{ a.chat }</p>
                                                <img src={ User } alt='ico' className='h-[28px] ml-5' />
                                            </div>
                                        </div>  

                                        )
                                    }
                                </div>
                            }
                            
                              
                        </div>

                        <div ref={scrollRef}></div>
                    </div>


                    {/*___Textarea and button___*/}
                    <div className='absolute bottom-0 lg:w-[99%] w-full flex justify-center py-5 px-3 backdrop-blur-sm'>
                        <div>
                            <textarea ref={ chatRef } placeholder='Send a message to AI' className='w-[100%] h-[65px] md:text-[16px] text-[14px] py-5 px-6 rounded-[15px] text-[white] bg-[#303140] border border-[#35302E]' />
                            
                            <div className='flex justify-center'>
                                <button 
                                    onClick={ btnSend }
                                    className='w-[90%] text-white rounded-[15px] md:text-[15px] text-[14px] py-2 my-2' 
                                    style={{ background: request === 1 ? '#19C37D': '#202120' }}
                                >{ request === 1 ? 'Send': request === 2 ? 'Sending...':'Loading...' }</button>
                            </div>

                            <p className='md:px-[100px] md:text-[13px] text-[14px] text-[#EDDEDE] text-center my-3'>Free Research Preview. MindWave may produce inaccurate information about people, places, or facts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;