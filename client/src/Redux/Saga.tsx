import { CHATALL_GET, CHATALL_SUCC, CHATALL_ERR } from './Actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';


function* callDataNavi(){
    try{
        const obj = {
            method: 'POST',
            url: 'https://mindwave-server.vercel.app/getAll',
            params: {},
            data: {},
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('_SKTOken')}`
            }
        }

        const { data } = yield call<any>(axios, obj);

        yield put({ success: data.succ, data: data.data, type: CHATALL_SUCC });

    }catch(e){
        yield put({ success: false, type: CHATALL_ERR });
    }
}


export function* saga1(){
    yield takeEvery(CHATALL_GET, callDataNavi);
}