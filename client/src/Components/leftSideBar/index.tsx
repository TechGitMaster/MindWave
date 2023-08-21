import React from 'react';
import { MindWave, Resize } from '../../utilities/PNG';

const LeftSideBar = () => {
    return (
        <>
        <div>
            <div className='flex justify-center items-center '>
                    <p className='font-bold text-[20px] text-white mr-3'>MindWave</p>
                    <img src={ MindWave } alt='ico' className='h-[30px]' />
                </div>
                

                <div className='flex mt-5'>
                    <div className='w-[78%] border border-[#705050] py-[10px] px-5 rounded-md mr-2 cursor-pointer'>
                        <p className='text-white text-[14px]'>+ New Chat</p>
                    </div>
                    <div className='w-[20%] border border-[#705050] rounded-md flex items-center justify-center cursor-pointer'>
                        <img src={ Resize } alt='ico' className='h-[18px]' />
                    </div>
                </div>

                {/*___History___*/}
                <div className='h-[100vh] pb-[320px]  overflow-y-auto'>
                </div>

                <div className='absolute left-0 bottom-[0%] py-[25px] w-[100%] text-white px-2 backdrop-blur-sm'>
                    <p className='font-bold text-[15px]'>Email</p>
                    <p className='text-[16px] whitespace-nowrap overflow-hidden text-ellipsis'>Kylevelarde375@gmail.com</p>

                    <button className='w-full font-semibold text-[16px] bg-[#9D0AF8] py-[9px] rounded-[20px] mt-4'>Logout</button>
                </div>
            </div>
        </>
    )
}

export default LeftSideBar;