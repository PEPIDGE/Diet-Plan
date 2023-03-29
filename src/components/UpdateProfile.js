import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { getPublicUser, updatePublicUser } from "../services/authService";

export const UpdateProfile = () => {
    const { publicUserId } = useParams();
    const userId = useContext(AuthContext).auth._id;
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const publicUser = (async () => {
            const data = await getPublicUser(userId);
            setUser(data[0]);
        })();
    }, []);

    const [dataErrors, setDataErrors] = useState({
        username: "",
        profilePic: "",
        description: "",
    });

    async function submitHandler(e) {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        const isValid = formValidation(data);
        if (isValid) {
            const updatedUser = await updatePublicUser(
                publicUserId,
                data.username.trim(),
                data.profilePic.trim(),
                data.description
            );
            if (updatedUser.code === 401) {
                console.log(updatedUser);
            } else if (updatedUser.message) {
                alert(updatedUser.message);
            } else {
                navigate(`/myProfile`);
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
            data.username.trim().length > 8
        ) {
            isValid = false;
            errors.username = "The length of the username must be between 2 and 8 symbols";
        }
        if (
            data.profilePic.trim().slice(-4) !== ".jpg" &&
            data.profilePic.trim().slice(-4) !== ".png" &&
            data.profilePic.slice(25) === "https://www.facebook.com/"
        ) {
            isValid = false;
            errors.profilePic = "The type of photo format must be .png or .jpg";
        }
        if (data.description.trim().length < 15) {
            isValid = false;
            errors.description = "The length of the description must be at least 15 symbols";
        } else if (data.description.trim().length > 300) {
            isValid = false;
            errors.description = "The length of the description must be maximum 300 symbols";
        }
        setDataErrors(errors);
        return isValid;
    }

    return (
        <div className="form-container">
            <h1>UPDATE PROFILE</h1>
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
                />

                {dataErrors.description.length > 0 ? (
                    <div className="error">{dataErrors.description}</div>
                ) : (
                    ""
                )}

                {/* TODO: MAKE A CHECKBOX WITH TERMS */}
                <input
                    className="btn submit-form-btn"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    );
};
