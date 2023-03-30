import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { onPublicRegister, onRegister } from "../services/authService";

export const Register = () => {
    const navigate = useNavigate();
    const { userLogin, publicUserLogin } = useContext(AuthContext);

    const [data, setData] = useState({
        username: "",
        email: "",
        description: "",
        profilePic: "",
        password: "",
        rePassword: "",
    });

    const [dataErrors, setDataErrors] = useState({
        username: "",
        email: "",
        description: "",
        profilePic: "",
        password: "",
        rePassword: "",
    });

    let symbolsRemaining = 0;
    useEffect(() => {
        let errors = { ...dataErrors };
        if (data.description.length >= 300 && data.description.length < 350) {
            symbolsRemaining = 350 - data.description.length;
            errors.description = `You have ${symbolsRemaining} symbols remaining`;
        } else if (data.description.length < 300) {
            errors.description = "";
        } else if (data.description.length === 350) {
            errors.description = `You've reached your maximum symbols`;
        }
        setDataErrors(errors);
    }, [data.description]);

    function inputHandler(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    async function submitHandler(e) {
        e.preventDefault();
        const isValid = formValidation();
        let user = {};
        if (isValid) {
            user = await onRegister(data.email.trim(), data.password);
            console.log(user);
            if (user.message) {
                alert(user.message);
            } else {
                userLogin({ _id: user._id, accessToken: user.accessToken });
                let profilePic = "";
                if (data.profilePic.trim() === "") {
                    profilePic = "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg";
                } else {
                    profilePic = data.profilePic.trim();
                }
                const publicData = await onPublicRegister(
                    data.username.trim(),
                    profilePic,
                    data.description
                );
                publicUserLogin({
                    _id: user._id,
                    accessToken: user.accessToken,
                    publicUserId: publicData._id,
                });
                navigate("/");
            }
        }

        console.log(user);
    }

    function formValidation() {
        let errors = {
            username: "",
            email: "",
            description: "",
            profilePic: "",
            password: "",
            rePassword: "",
        };
        let isValid = true;

        if (
            data.username.trim().length < 2 ||
            data.username.trim().length > 8
        ) {
            isValid = false;
            errors.username = "The length of the username must be between 2 and 8 symbols";
        }
        if (data.profilePic.length > 0 &&
            data.profilePic.trim().slice(0, 4) !== "http"
        ){
            isValid = false;
            errors.profilePic = "The protocol must be http or https";
        }
        if (
            data.password.trim().length < 10 ||
            data.password.trim().length > 30
        ) {
            isValid = false;
            errors.password = "The length of the password must be between 10 and 30 symbols";
        }
        if (data.password !== data.rePassword) {
            isValid = false;
            errors.rePassword = "The passwords don't match";
        }
        if (
            data.description.length > 0 &&
            data.description.trim().length < 15
        ) {
            isValid = false;
            errors.description = "The length of the description must be at least 15 symbols";
        } else if (data.description.trim().length > 350) {
            isValid = false;
            errors.description = "The length of the description must be maximum 350 symbols";
        }
        if (data.username.trim().length === 0) {
            isValid = false;
            errors.username = "This field is required";
        }
        if (data.email.trim().length === 0) {
            isValid = false;
            errors.email = "This field is required";
        }
        if (data.password.trim().length === 0) {
            isValid = false;
            errors.password = "This field is required";
        }
        if (data.rePassword.trim().length === 0) {
            isValid = false;
            errors.rePassword = "This field is required";
        }
        setDataErrors(errors);
        return isValid;
    }
    return (
        <div className="form-container">
            <h1>REGISTER</h1>
            <form className="register-form" onSubmit={submitHandler}>
                <label htmlFor="name">
                    Username <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={inputHandler}
                    placeholder="Enter your username"
                />
                {dataErrors.username.length > 0 ? (
                    <div className="error">{dataErrors.username}</div>
                ) : (
                    ""
                )}

                <label htmlFor="email">
                    Email <span className="required">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={inputHandler}
                    placeholder="Enter your email"
                />

                {dataErrors.email.length > 0 ? (
                    <div className="error">{dataErrors.email}</div>
                ) : (
                    ""
                )}

                <label htmlFor="password">
                    Password <span className="required">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={inputHandler}
                    placeholder="Enter your password"
                />

                {dataErrors.password.length > 0 ? (
                    <div className="error">{dataErrors.password}</div>
                ) : (
                    ""
                )}

                <label htmlFor="rePassword">
                    Confirm password <span className="required">*</span>
                </label>
                <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    value={data.rePassword}
                    onChange={inputHandler}
                    placeholder="Re-enter your password"
                />

                {dataErrors.rePassword.length > 0 ? (
                    <div className="error">{dataErrors.rePassword}</div>
                ) : (
                    ""
                )}

                <label htmlFor="profilePic">
                    Profile picture <span className="optional">(optional)</span>
                </label>
                <input
                    type="text"
                    id="profilePic"
                    name="profilePic"
                    value={data.profilePic}
                    onChange={inputHandler}
                    placeholder="Enter a profile picture link"
                />

                {dataErrors.profilePic.length > 0 ? (
                    <div className="error">{dataErrors.profilePic}</div>
                ) : (
                    ""
                )}

                <label htmlFor="description">
                    Write how you want to be described to others{" "}
                    <span className="optional">(optional)</span>
                </label>
                <textarea
                    maxLength={350}
                    type="text"
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={inputHandler}
                    placeholder="Enter a description about you"
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
