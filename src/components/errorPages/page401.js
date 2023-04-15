import { Link } from "react-router-dom";

export const Page401 = () => {
    return (
        <div className="error401">
            <h2 className="error401-message">You are not authorized!</h2>
            <h2>Click <Link className="error404-message" to={"/"}>here</Link> for home page</h2> 

        </div>
    );
}