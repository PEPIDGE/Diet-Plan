import { useParams } from "react-router";

export const Detals = () => {
    
    const { publicUserId } = useParams();
    
    return(
        <>
          <h1 className="details-title">Details</h1>
          <div className="details-container">
            <div className="details">

            </div>
          </div>
          
        </>
    );
} 