import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {ActorList} from '../components';

const ActorPage = () => {
    
    const [actorId, setActorId] = useState(0);
    const navigate = useNavigate();
    
    const onClickActor = (_id) => {
        setActorId(_id);
        navigate(`/actors/${_id}`);
        console.log(_id);
    };

    return (
        <>
            <ActorList onClickActor={onClickActor}/>
        </>
    )

}
export default ActorPage