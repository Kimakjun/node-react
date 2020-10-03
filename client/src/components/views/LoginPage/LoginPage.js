import React, {useState} from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action.js'

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const initialState = {
    email: '',
    password: ''
}

function LoginPage(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(initialState);
    const {email, password} = inputs;

    const onChange = (e)=> {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        
        dispatch(loginUser(inputs))
            .then(res => {
                if(res.payload.loginSuccess){
                    history.push('/');
                }else{
                    alert('Error');
                }
            })

    }

    return (
        <LoginWrapper>
            <Form onSubmit={onSubmit}>
                <label>email</label>
                <input type="email" name="email" value={email} onChange={onChange} />
                <label>password</label>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <br/>
                <button type='submit'>
                    login
                </button>
            </Form>
        </LoginWrapper>
    )
}

export default LoginPage
