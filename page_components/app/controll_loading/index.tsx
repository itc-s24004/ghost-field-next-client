"use client";

import { MergeAttributes } from "@/libs/customAttribute";
import { APP_Loading } from "../loading";


import styles from "./index.module.css";
import { useState } from "react";
import { Element_Controller_Response } from "@/types";

export function Controll_APP_Loading(props: React.HTMLAttributes<HTMLElement>): Element_Controller_Response<Controller> {
    const [className, setClassName] = useState("");
    const loading = <APP_Loading {...MergeAttributes(props, { className })}/>;
    return {
        element: loading,
        controller: {
            show: (fade) => {
                setClassName(fade ? styles.fadeIn : "");
            },
            hide: (fade) => {
                setClassName(fade ? styles.fadeOut : styles.hidden);
            }
        }
    };
}


type Controller = {
    show: (fade?: boolean) => void;
    hide: (fade?: boolean) => void;
}