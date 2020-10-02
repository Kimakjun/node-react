import React, {useState} from 'react'
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js'



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
    password: '',
    name: '',
    confirmPassword:'',
}

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(initialState);
    const {email, password, name, confirmPassword} = inputs;

    const onChange = (e)=> {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            return alert('비밀번호, 패스워드 확인하세요.!');
        }

        dispatch(registerUser(inputs))
            .then(res => {
                if(res.payload.success){
                    props.history.push('/login');
                }else{
                    alert('fail to signup');
                }
            })

    }

    return (
        <LoginWrapper>
            <Form onSubmit={onSubmit}>
                <label>email</label>
                <input type="email" name="email" value={email} onChange={onChange} />
                <label>name</label>
                <input type="text" name="name" value={name} onChange={onChange}/>
                <label>password</label>
                <input type="password" name="password" value={password} onChange={onChange}/>
                <label>confirm password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange}/>

                <br/>
                <button type='submit'>
                    register
                </button>
            </Form>
        </LoginWrapper>
    )
}

export default RegisterPage
