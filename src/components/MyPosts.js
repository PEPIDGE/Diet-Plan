import { useContext, useEffect, useState } from "react";
import { getLastDietDays } from "../services/dietDayService";
import { MyPostsDietDay } from "./MyPostsDietDay";
import { Link } from "react-router-dom";
import { getPublicUser } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export const MyPosts = () => {
    const [dietDays, setDietDays] = useState({});
    const [user, setUser] = useState({});

    const {auth} = useContext(AuthContext);

    useEffect(() => {
        (async () => {
          const data = await getLastDietDays(auth._id);
          const userData = await getPublicUser(auth._id);
          setUser(userData);
          setDietDays(data);
        })();
    
      }, []);
    return(
        <>
        <h1 className="home-title">My diet days</h1>
        <div className="home">
          	<div className="content">
              
            {dietDays.length > 0
                    ? dietDays.map(x => <MyPostsDietDay day={x} user={user} key={x._id}/>)
                    : <h1 className="no-articles">Create your first diet day <Link className="link" to={"/create"}>here</Link></h1>
                }
            </div>
        </div>
        </>
    );
}