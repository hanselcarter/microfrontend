import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";
import { useUser } from "./useUser";

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    const { getUser, id } = useUser();

    console.log(getUser, id, "getUser");

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            user: getUser,
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
};
