import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null){

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        const history = useHistory();
        useEffect(()=>{
            dispatch(auth()).then(res => {
                console.log(res);
                if(!res.payload.isAuth){
                    if(option){
                        history.push('/login');
                    }
                }else{
                    if(adminRoute && !res.payload.isAdmin){
                        history.push('/')
                    }else{
                        if(!option){
                            history.push('/');
                        }
                    }
                }
            })
        },[])

        return (
            <SpecificComponent/>
        )

    }

    return AuthenticationCheck;

}