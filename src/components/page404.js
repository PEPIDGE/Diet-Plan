import { Link } from "react-router-dom";

export const Page404 = () => {
    return (
        <div className="error404">
            <h2 >Page not found </h2>
            <h2>Click <Link className="error404-message" to={"/"}>here</Link> for home page</h2> 
        </div>
    );
}