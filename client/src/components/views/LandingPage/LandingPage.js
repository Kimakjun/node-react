import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(()=>{
        axios.get('/api/')
            .then((res)=>{
                console.log(res.data.data);
            })
    }, []);

    return (
        <div>
            Landing Page
        </div>
    )
}

export default LandingPage
