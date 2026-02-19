"use client";

import { MergeAttributes } from "@/libs/customAttribute";
import { APP_Loading } from "../loading";


import styles from "./index.module.css";
import { useState } from "react";
import { Element_Controller_Response } from "@/types";

export function Control_APP_Loading(props: React.HTMLAttributes<HTMLElement>): Element_Controller_Response<Controller, boolean> {
    const [shown, setShown] = useState(true);
    const [className, setClassName] = useState("");
    const loading = <APP_Loading {...MergeAttributes(props, { className })}/>;
    return {
        element: loading,
        controller: {
            show: (fade) => {
                setShown(true);
                setClassName(fade ? styles.fadeIn : "");
            },
            hide: (fade) => {
                setShown(false);
                setClassName(fade ? styles.fadeOut : styles.hidden);
            }
        },
        status: shown
    };
}


type Controller = {
    show: (fade?: boolean) => void;
    hide: (fade?: boolean) => void;
}