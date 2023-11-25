import { get } from "svelte/store";
import { location, push } from "svelte-spa-router";
import {
    currentAppPage,
    homeScreenPageTransition,
    showControlCenter,
    isMovingApps
} from "../store/PhoneState";

export const handleBottomBar = () => {
    if (get(showControlCenter)) {
        showControlCenter.set(false);
        return;
    } else if (get(location) === "/") {
        if (get(isMovingApps)) {
            isMovingApps.set(false);
            return;
        }
        if (get(currentAppPage) === 0) return;
        homeScreenPageTransition.update((current) => {
            current.in.x = -Math.abs(current.in.x as number);
            current.out.x = Math.abs(current.out.x as number);
            return current;
        });
        currentAppPage.set(0);
        return;
    } else if (get(location) !== "/")
        switch (get(location)) {
            case "/lock_screen":
                push("/code_screen");
                return;
        }
};
