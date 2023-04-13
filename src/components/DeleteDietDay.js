import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import { deleteDietDay, getOne } from '../services/dietDayService';

export const DeleteDietDay = () => {
    const {dietDayId} = useParams();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    
    useEffect(() => {
        (async () => {
            const dietDayData = await getOne(dietDayId);
            if (dietDayData._ownerId !== auth._id) {
                //todo 401 page
            }
            
            const deletedDayData = await  deleteDietDay(dietDayId);
            if (deletedDayData.code === 401) {
                //todo: 401 page
            } else if(deletedDayData.message) {
                alert(deletedDayData.message);
            } else {
                navigate(`/`);
            }
        })();
    }, []);

    return null;
}

