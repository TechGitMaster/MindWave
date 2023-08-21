import React from 'react';
import Header from '../../Components/Header';
import LeftSideBar from '../../Components/leftSideBar';
import { AI, User } from '../../utilities/PNG';



const Home = () => {
    
    return (
        <>
            <div className='h-[100vh] w-full bg-[#444654] flex'>

                {/*___Left side component___*/}
                <div className='relative w-[300px] h-[100vh] bg-[#202123] py-6 px-2 overflow-hidden'>
                    <LeftSideBar />
                </div>


                <div className='relative w-full'>
                    <Header />


                    <div className='h-[100vh] pt-[60px] pb-[270px] overflow-y-auto'>
                        <div className='text-white'>

                            {/*___Welcome Message___*/}
                            <div className='text-white mt-[40px] mx-auto w-[900px]'>   
                                <p className='text-center text-[30px] font-bold'>Welcome to MindWave</p>
                                <div className='flex justify-center'>
                                    <p className='text-[#DEDEDE] text-center text-[15px] w-[50%] mt-2'>Your Gateway to AI-Powered Conversations and Limitless Imagination.</p>
                                </div>


                                <div className='mt-[80px] text-[15px]'>
                                    <p className='text-[#F3EE52] font-semibold'>How to use MindWave:</p>
                                    <ul className='mt-7'>
                                      <li>• Change from chat to image if you want to change the based output.</li>
                                      <li className='my-5'>• Image based output will not save to database.</li>
                                      <li>• Send a message to AI and hit the button to send to the database.</li>
                                    </ul>
                                </div>
                            </div>


                            {/*___Text Message___*/}    
                            {/*<div className='relative'>

                                {
                                    ['user', 'assistant', 'user'].map((a, i) => 
                                    a === 'assistant' ? 
                                    <div>  
                                        <div className='flex mx-auto w-[900px] py-7'>
                                            <img src={ AI } alt='ico' className='h-[33px] mr-5' />
                                            <p className='-mt-[5px] text-justify'>As of my last knowledge update in September 2021, the term "MindWave" likely refers to the NeuroSky MindWave, a brainwave sensing device and platform developed by NeuroSky. The MindWave is a consumer-grade EEG (electroencephalography) headset designed to detect and monitor brainwave patterns. It's often used for various applications in fields such as neurofeedback, brain-computer interfaces (BCIs), meditation, and mental health research.
                                                One key aspect of the NeuroSky MindWave is its ability to measure different types of brainwaves, such as alpha, beta, theta, and delta waves. These brainwaves are associated with different mental states and activities. For example, alpha waves are often linked to relaxation and a calm mental state, while beta waves are associated with active thinking and concentration.</p>
                                        </div>
                                    </div>
                                    :
                                    <div className='bg-[#343541] py-7'>
                                        <div className='flex justify-end mx-auto w-[900px]'>
                                            <p className='-mt-[5px] text-justify'>As of my last knowledge update in September 2021, the</p>
                                            <img src={ User } alt='ico' className='h-[33px] ml-5' />
                                        </div>
                                    </div>  

                                    )
                                }
                            </div>*/}

                              
                        </div>
                    </div>



                    <div className='absolute bottom-0 w-full flex justify-center py-5 backdrop-blur-sm'>
                        <div>
                            <textarea placeholder='Send a message to AI' className='w-[100%] h-[65px] text-[16px] py-5 px-6 rounded-[15px] text-[white] bg-[#303140] border border-[#35302E]' />
                            
                            <div className='flex justify-center'>
                                <button className='bg-[#19C37D] w-[90%] text-white rounded-[15px] py-2 my-2'>Send</button>
                            </div>

                            <p className='px-[100px] text-[14px] text-[#EDDEDE] my-3'>Free Research Preview. MindWave may produce inaccurate information about people, places, or facts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;