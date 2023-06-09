import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { getPublicUser, getPublicUserWithPublicUserId, updatePublicUser } from "../services/authService";

export const UpdateProfile = () => {
    const { publicUserId } = useParams();
    const userId = useContext(AuthContext).auth._id;
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getPublicUser(userId);
            setUser(data);
        })();
    }, []);


    const [dataErrors, setDataErrors] = useState({
        username: "",
        profilePic: "",
        description: "",
    });

    // let symbolsRemaining = 0;
    // useEffect(() => {
    //     let errors = { ...dataErrors };
    //     if (data.description.length >= 300 && data.description.length < 350) {
    //         symbolsRemaining = 350 - data.description.length;
    //         errors.description = `You have ${symbolsRemaining} symbols remaining`;
    //     } else if (data.description.length < 300) {
    //         errors.description = "";
    //     } else if (data.description.length === 350) {
    //         errors.description = `You've reached your maximum symbols`;
    //     }
    //     setDataErrors(errors);
    // }, [data.description]);
    
    async function submitHandler(e) {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        const isValid = formValidation(data);
        if (isValid) {
            const oldUserData = await getPublicUserWithPublicUserId(publicUserId);
            console.log(oldUserData);
            const updatedUser = await updatePublicUser(publicUserId, data.username.trim(), data.profilePic.trim(), data.description,  Number(oldUserData.calories), oldUserData.gender, Number(oldUserData.age), Number(oldUserData.weight), Number(oldUserData.height), oldUserData.activity);

            console.log(updatedUser);
            if (updatedUser.code === 401 || updatedUser.code === 403) {
                navigate("/error401");
            } else if (updatedUser.message) {
                alert(updatedUser.message); 
            } else {
                navigate(`/myProfile/${publicUserId}`);
            }
        }
    }

    function formValidation(data) {
        let errors = {
            username: "",
            profilePic: "",
            description: "",
        };
        let isValid = true;
        if (
            data.username.trim().length < 2 ||
            data.username.trim().length > 14
        ) {
            isValid = false;
            errors.username = "The length of the username must be between 2 and 14 symbols";
        }
        if (data.profilePic.length > 0 &&
            data.profilePic.trim().slice(0, 4) !== "http"
        ){
            isValid = false;
            errors.profilePic = "The protocol must be http or https";
        }
        if (data.description.trim().length < 15) {
            isValid = false;
            errors.description = "The length of the description must be at least 15 symbols";
        } else if (data.description.trim().length > 350) {
            isValid = false;
            errors.description = "The length of the description must be maximum 350 symbols";
        }
        setDataErrors(errors);
        return isValid;
    }

    return (
        <div className="form-container">
            <h1 className="updateProfile-title">Update profile</h1>
            <form className="update-form" onSubmit={submitHandler}>
                <label htmlFor="name">
                    Username <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={user?.username}
                    placeholder="Enter your username"
                />

                {dataErrors.username.length > 0 ? (
                    <div className="error">{dataErrors.username}</div>
                ) : (
                    ""
                )}

                <label htmlFor="profilePic">
                    Profile picture <span className="required">*</span>
                </label>
                <input
                    type="url"
                    id="profilePic"
                    name="profilePic"
                    defaultValue={user?.profilePic}
                    placeholder="Enter a profile picture link"
                />

                {dataErrors.profilePic.length > 0 ? (
                    <div className="error">{dataErrors.profilePic}</div>
                ) : (
                    ""
                )}

                <label htmlFor="description">
                    Write how you want to be described to others{" "}
                    <span className="required">*</span>
                </label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    defaultValue={user?.description}
                    placeholder="Enter description about you"
                    maxLength={350}

                />

                {dataErrors.description.length > 0 ? (
                    <div className="error">{dataErrors.description}</div>
                ) : (
                    ""
                )}
                
                <input
                    className="btn submit-form-btn"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
};
