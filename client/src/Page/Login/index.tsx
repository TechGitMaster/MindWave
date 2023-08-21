import React, { useRef } from 'react';
import { Google, MindWave } from '../../utilities/PNG';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import axios from 'axios';



const Login = () => {
    const emailRef = useRef<any>('');

    const login = async (condition: boolean, email: any) => {
        let emailTF = condition ? emailRef.current.value as any: email.email;
        
        if(validateEmail(emailTF)){
            try{
                let obj = {
                    method: 'POST',
                    url: 'http://localhost:4000/login',
                    params: {},
                    data: { email: emailTF },
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
    
                const { data } = await axios(obj);
                
                if(data.success){
                    localStorage.setItem('_SKTOken', data.token);
                    window.location.reload();
                }else{  
                    alert('Error server please call the developer.')
                }
    
            }catch(e){
                alert('Error server please call the developer.')
            }  
        }else{
            alert('Please use correct email format!');
        }

    }

    const validateEmail = (email: string): boolean => {
        return /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email)
    }

    return (
        <>
            <div className='h-[100vh] w-full py-[70px] flex justify-center items-center bg-[#202123]'>
                <div className='text-white'>
                    <div className='flex justify-center items-center'>
                        <p className='font-bold text-[35px] mr-[20px]'>MindWave</p>
                        <img src={ MindWave } alt='ico' className='h-[43px]' />  
                    </div>

                    <div className='flex justify-center'>
                        <p className='text-[#DEDEDE] text-[17px] text-center w-[90%] mt-3'>Your Gateway to AI-Powered Conversations and Limitless Imagination.</p>
                    </div>


                    { /*_____LOGIN_____*/ }
                    <div className='my-[70px] flex justify-center'>
                        <div className='w-[70%]'>

                            {/*___Email Login___*/}
                            <p className='font-semibold text-[18px] mb-[13px]'>Email:</p>
                            <input type='text' ref={ emailRef } className='rounded-[13px] bg-white border-none w-full p-[10px] text-black' />

                            <div className='flex justify-center mt-5'>
                                <button onClick={ () => login(true, '') }
                                    className='w-[80%] font-semibold text-[16px] bg-[#9D0AF8] py-3 rounded-[20px]'>Login</button>
                            </div>



                            {/*___Middle___*/}
                            <div className='flex justify-center items-center'>
                                <div className='h-1 rounded-[20px] bg-[#C3F040] w-[40%] mt-1'></div>
                                <span className='text-[17px] mx-[7px] my-[50px]'>or</span>
                                <div className='h-1 rounded-[20px] bg-[#C3F040] w-[40%] mt-1'></div>
                            </div>



                            {/*___Google___*/}
                            <div className='relative flex justify-center items-center py-3 rounded-[13px] bg-white cursor-pointer'>
                                <img src={ Google } alt='ico' className='h-[27px] mr-3'  />
                                <p className='text-black text-[16px] font-semibold'>Continue with Google</p>

                                <div className='absolute top-0 opacity-0'>
                                    <GoogleOAuthProvider clientId='1032237009330-e9eeo1g7rdttsbf6m158mfhc59a3qlch.apps.googleusercontent.com'>         
                                        <GoogleLogin 
                                            onSuccess={(e: any) => login(false, jwtDecode(e.credential)) }
                                            onError={() => console.log('LOGINN ERROR')}
                                            width={ 1000 }
                                        />    
                                    </GoogleOAuthProvider>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*___Footer___*/}
                    <div className='text-center'>
                        <p className='text-[16px] font-semibold'>MindWave <span className='text-[#E6E14F]'>2023-2024</span></p>
                        <p className='text-[15px] text-[#F3EE52]'>Powered by OpenAI</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;