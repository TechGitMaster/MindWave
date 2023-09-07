import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Ani } from './utilities/PNG';
import axios from 'axios';

const App = () => {
    const navigate = useNavigate();
    const [init, setInit] = useState<boolean>(false);
    

    useEffect(() => {
        const auth = async () => {
        
         const obj = {
             method: 'POST',
             url: 'https://mindwave-server.vercel.app/validate',
             params: {},
             data: {},
             headers:{
                 'Authorization': `Bearer ${localStorage.getItem('_SKTOken')}`
             }
         }

         try{
            const { data } = await axios(obj);

            (data.success ? navigate('/Home'): navigate('/Login'));
            setInit((curr) => true)
         }catch(e){
            alert('Error server please call the developer.');
         }
        }

        auth();

    }, [])


    return (
        <> 
        <div className='select-none'>
           {
            !init ? 
            <div className='w-full h-[100vh] flex justify-center items-center bg-[#202123]'>
                <img src={ Ani } alt='ico' className='h-[35px] mr-2' />
                <p className='text-white text-[16px]'>Initializing...</p>
            </div>
            :
            <Outlet />
           }
        </div>
        </>
    )
}

export default App;




