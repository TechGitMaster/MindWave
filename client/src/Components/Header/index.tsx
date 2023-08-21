import React from 'react';


const Header = () => {
    return (
        <>
            <div className='absolute top-0 w-full border z-10 text-white text-[15px] border-[#392626] bg-[#343541] px-4 py-3 flex justify-between items-center'>
                <div>
                    <div className='flex rounded-lg overflow-hidden cursor-pointer'>
                        <div className='bg-[#9D0AF8] py-2 px-5'>Chat</div>
                        <div className='bg-[#444654] py-2 px-5'>Image</div>
                    </div>
                </div>

                <div>
                    <p>Default (GPT-3.5)</p>
                </div>
            </div>  
        </>
    )
}

export default Header;