import { DietDay } from "./DietDay";

export const HomePage = () => {
    return(
        <div className="home">
            <h1>Your latest diet days</h1>

            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
            <DietDay/>
        </div>
    );
}