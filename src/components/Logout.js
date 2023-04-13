import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';
import {onLogout} from '../services/authService';

export const Logout = () => {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout()
            .then(() => {
                userLogout();
                navigate("/");
            })
            .catch(() => {
                //todo 401 page
            });
    }, []);

    return null;
}

