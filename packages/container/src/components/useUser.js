import React from "react";

export const useUser = () => {
    const getUser = async () => {
        // fake fetch
        const user = await fetch("https://dummyjson.com/products/1")
            .then((res) => res.json())
            .then((json) => console.log(json, "hsh"));

        return user;
    };

    return { getUser, id: "test" };
};
