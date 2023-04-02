import { useEffect, useState } from "react";
import { getAll } from "../services/dietDayService";
import { DietDay } from "./DietDay";

export const HomePage = () => {
    const [dietDays, setDietDays] = useState({});

    useEffect(() => {
        (async () => {
          const data = await getAll();
          setDietDays(data)
        })();
    
      }, []);
    return(
        <>
        <h1 className="home-title">People's diet days</h1>
        <div className="home">
          	<div className="content">
              
            {dietDays.length > 0
                    ? dietDays.map(x => <DietDay key={x._id} day={x} />)
                    : <h1 className="no-articles">No diet days yet</h1>
                }
            </div>
        </div>
        </>
    );
}