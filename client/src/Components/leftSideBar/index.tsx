import React, { useEffect, useState } from 'react';
import { CHATALL_LOADING, CHATALL_GET } from '../../Redux/Actions';
import { MindWave, Resize, Trash } from '../../utilities/PNG';
import { useDispatch, useSelector } from 'react-redux';
import { Ani, Message, Empty } from '../../utilities/PNG';
import axios from 'axios';



const LeftSideBar = ({ btnSelectedTopic, newChat, setLeftSideCon, windowSize }: any) => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState<string>('');
    let selectorData = useSelector((a: any) => a.reducer1);

    useEffect(() => {
        dispatch({ type: CHATALL_LOADING })
        setTimeout(() => {
            dispatch({ type: CHATALL_GET });
        }, 500);


        const getInfo = async () => {
            try{
                let obj = {
                    method: 'POST',
                    url: 'http://localhost:4000/validate',
                    params: {},
                    data: {},
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('_SKTOken')}`
                    }
                }
    
                const { data } = await axios(obj);

                setInfo((prev: string) => data.data.email);
            }catch(e){
                window.location.reload();
            }
        };

        getInfo();
    }, []);

    
    //choose chat__________________________________________
    const clickChat = (e: any, _id: any) => {
        e.stopPropagation();
        btnSelectedTopic(_id)

        if(windowSize <= 1200) setLeftSideCon(false);
    }

    //delete chat_______________________________________________
    const deleteChat = async (_id: any) => {
        try{
            const obj = {
                method: 'DELETE',
                url: 'http://localhost:4000/delete',
                params: {},
                data: { id: _id },
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${ localStorage.getItem('_SKTOken') }`
                }
            }

            const { data } = await axios(obj);

            if(data.success){
                newChat();
                if(windowSize <= 1200) setLeftSideCon(false);
                
                dispatch({ type: CHATALL_LOADING });

                setTimeout(() => {
                    dispatch({ type: CHATALL_GET });
                }, 2000);
            }else{
                window.location.reload();
            }

        }catch(e){
            window.location.reload();
        }
    }

    const logout = () => {
        localStorage.removeItem('_SKTOken');
        window.location.reload();
    }

    return (
        <>
            <div className='bg-[#202123] w-full h-full overflow-hidden py-6 px-2 relative'>
                <div className='flex justify-center items-center '>
                    <p className='font-bold text-[20px] text-white mr-3'>MindWave</p>
                    <img src={ MindWave } alt='ico' className='h-[30px]' />
                </div>
                

                <div className='flex mt-5'>
                    <div onClick={ () => newChat() } className='w-[78%] border border-[#705050] py-[10px] px-5 rounded-md mr-2 cursor-pointer'>
                        <p className='text-white text-[14px]'>+ New Chat</p>
                    </div>
                    <div onClick={ () => setLeftSideCon(false) } className='w-[20%] border border-[#705050] rounded-md flex items-center justify-center cursor-pointer'>
                        <img src={ Resize } alt='ico' className='h-[18px]' />
                    </div>
                </div>

                {/*___History___*/}
                <div className='h-[100vh] pb-[320px] px-3 py-3 overflow-y-auto'>
                    <p className='text-[white] mb-2 text-[14px]'>Chat History:</p>
                    {
                        selectorData.loading ? 
                        <div className='flex justify-center'>
                            <img src={ Ani } alt='ico' className='h-[40px]' />
                        </div>
                        : 
                        selectorData.data.length > 0 ?
                        selectorData.data.map((a: any) => 
                        <div onClick={ (e) => clickChat(e, a._id) } className='flex items-center justify-between px-2 py-2 mb-1 rounded-md bg-none cursor-pointer hover:bg-[#a8bbfd23]'>
                            <div className='w-full flex'>
                                <img src={ Message } alt='ico' className='mr-4 h-[18px]' />
                                <p className='truncate text-white text-[15px]'>{ a.name }</p>
                            </div>

                            <img src={ Trash } alt='ico' className='h-[19px]' onClick={ () => deleteChat(a._id) } />
                        </div>)
                        :
                        <div className='flex justify-center px-3 mt-6'>
                            <img src={ Empty } alt='ico' className='h-[80px]' />
                        </div>
                    }
                </div>

                <div className='absolute left-0 bottom-[0%] py-[25px] w-[100%] text-white px-2 backdrop-blur-sm'>
                    <p className='font-bold md:text-[15px] text-[14px]'>Email</p>
                    <p className='text-[16px] whitespace-nowrap overflow-hidden text-ellipsis'>{ info }</p>

                    <button 
                        onClick={ logout }
                        className='w-full font-semibold md:text-[16px] text-[14px] bg-[#9D0AF8] py-[9px] rounded-[20px] mt-4'>Logout</button>
                </div>
            </div>
        </>
    )
}

export default LeftSideBar;