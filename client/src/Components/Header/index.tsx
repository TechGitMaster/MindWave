import React from 'react';
import { Resize } from '../../utilities/PNG';


const Header = ({ leftSideCon, setLeftSideCon }: any) => {

    return (
        <>
            <div className='absolute top-0 w-full border z-10 text-white text-[15px] border-[#392626] bg-[#343541] px-4 py-3 flex justify-between items-center'>
                <div className='flex items-center'>
                    {
                        !leftSideCon ?
                        <div onClick={ () => setLeftSideCon(true) } className='p-2 h-full mr-2 border border-[#c6c2c2] rounded-md flex items-center justify-center cursor-pointer'>
                            <img src={ Resize } alt='ico' className='h-[17px]' />
                        </div>
                        :
                        ''
                    }
                    <div className='rounded-lg overflow-hidden py-2 px-5 bg-[#9D0AF8] md:text-[15px] text-[14px]'>Chat API</div>
                </div>

                <div>
                    <p className='md:text-[15px] text-[14px]'>Default (GPT-3.5)</p>
                </div>
            </div>  
        </>
    )
}

export default Header;