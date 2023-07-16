import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {DoramaList} from '../components';

const DoramsPage = () => {
    
    const [doramsId, setDoramsId] = useState(0);
    const navigate = useNavigate();
    
    const onClickDorams = (_id) => {
        setDoramsId(_id);
        navigate(`/doram/${_id}`);
        console.log(_id);
    };

    console.log({setDoramsId});

    return (
        <>
            <DoramaList onClickDorams={onClickDorams}/>
        </>
    )

}
export default DoramsPage