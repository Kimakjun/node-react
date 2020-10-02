import React, {useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components'

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

function LandingPage(props) {

    const onClick = () => {
        axios.get('/api/users/logout')
            .then(res=>{
               if(res.data.success){
                   props.history.push('/login');
               }else{
                   alert('로그아웃 실패');
               }
            })
    }

    return (

        <MainWrapper>
            <h2>시작 페이지</h2>
            <button onClick={onClick}>
                로그아웃
            </button>
        </MainWrapper>

    )
}

export default LandingPage
