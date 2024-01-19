import React from "react";

const TestPage = () => {
    const postHandler = () => {
        fetch("http://52.79.37.100:31338/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "kwon@google.com",
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };
    const getHandler = () => {
        fetch(
            //"http://127.0.0.1:8080/test"
            //"http://172.20.26.193:8080/users/20"
            "http://52.79.37.100:32701/record/1"
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    const userGetHandler = () => {
        fetch(
            //"http://127.0.0.1:8080/test"
            //"http://172.20.26.193:8080/users/20"
            "http://52.79.37.100:31338/users/12"
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    };
    return (
        <div>
            <button
                onClick={postHandler}
                className="px-4 py-2 mr-10 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            >
                post 요청
            </button>
            <button
                onClick={getHandler}
                className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            >
                get 요청
            </button>
            <button
                onClick={userGetHandler}
                className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            >
                user get 요청
            </button>
        </div>
    );
};

export default TestPage;
