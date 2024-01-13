import transparentImage from "../assets/app-icons/transparent.png";
import {
    movingApp,
    apps,
    isMovingApps,
    getAppsForPage,
    changePage,
    homeScreenPageTransition
} from "../store/PhoneState";
import { randomString } from "./misc";
import MousePos from "./MousePosition";
import type { IAppManifest } from "../types";
import { get } from "svelte/store";

let isWaitingAboveApp: Promise<void> | null = null;

// even I am ashamed of this code, sorry y'all

export const RegisterAppMoveHandler = () =>
    movingApp.subscribe(async (current) => {
        if (!current) return;
        apps.update((currentApps) =>
            currentApps.filter((app) => ![current.label, "fake-app"].includes(app.label))
        );
        const body = document.querySelector("body")!;
        const appDivElement = document.createElement("div");
        appDivElement.style.position = "absolute";
        appDivElement.style.width = "3.9375vh";
        appDivElement.style.height = "3.9375vh";
        appDivElement.style.background = `url(${current.icon})`;
        appDivElement.style.backgroundSize = "cover";
        appDivElement.style.backgroundPosition = "center";
        body.appendChild(appDivElement);
        const appDivElementRect = appDivElement.getBoundingClientRect();
        appDivElement.style.top = `${MousePos.Y - appDivElementRect.height / 2}px`;
        appDivElement.style.left = `${MousePos.X - appDivElementRect.width / 2}px`;
        let lastElement: HTMLElement | undefined | null = undefined;
        let lastFakeElement: HTMLElement | undefined | null = undefined;
        const mouseMoveHandler = (e: MouseEvent) => {
            const appDivElementDimensions = appDivElement.getBoundingClientRect();
            appDivElement.style.top = `${e.clientY - appDivElementDimensions.height / 2}px`;
            appDivElement.style.left = `${e.clientX - appDivElementDimensions.width / 2}px`;
            const elements = document.elementsFromPoint(e.clientX, e.clientY) as HTMLElement[];
            const matchingButtonElement = elements.find(
                (element) =>
                    element.classList?.contains("home-app-icon") ||
                    element.classList?.contains("dock-app-icon")
            );
            const matchingFakeElement = elements.find((element) => element.classList?.contains("fake-app"));

            const currentElement =
                matchingButtonElement?.nodeName === "BUTTON" ?
                    matchingButtonElement
                    : matchingButtonElement?.parentElement;

            const currentFakeElement =
                matchingFakeElement?.nodeName === "BUTTON" ?
                    matchingFakeElement
                    : matchingFakeElement?.parentElement;

            if (isWaitingAboveApp) return;
            let dockInconCount = getAppsForPage(get(apps), -1).filter(
                (app) => app.name !== "fake-app"
            ).length;
            if (matchingButtonElement?.classList.contains("dock-app-icon") && dockInconCount >= 4) return;
            const aboveAppsContainer = elements.find(
                (element) => element.classList?.contains("apps-container")
            );
            const aboveHomeContainer = elements.find(
                (element) => element.classList?.contains("home-container")
            );
            if (!aboveAppsContainer && aboveHomeContainer) {
                const homeContainer = document.querySelector(".home-container")!;
                const containerDimensions = homeContainer.getBoundingClientRect();
                const distanceFromMiddle = (e.clientX - containerDimensions.left) / containerDimensions.width;
                if (distanceFromMiddle < 0.05 || distanceFromMiddle > 0.95) {
                    const isGoingRight = distanceFromMiddle > 0.1;
                    homeScreenPageTransition.update((current) => {
                        current.in.x = Math.abs(current.in.x as number) * (isGoingRight ? 1 : -1);
                        current.out.x = Math.abs(current.out.x as number) * (isGoingRight ? -1 : 1);
                        return current;
                    });
                    changePage(isGoingRight);
                }
            }
            isWaitingAboveApp = new Promise((resolve) =>
                setTimeout(() => {
                    if (currentFakeElement) resolve();
                    else if (currentElement) {
                        const existingFakeElement = document.querySelector(".fake-app");
                        const elementData = JSON.parse(currentElement.dataset.app as string) as IAppManifest;
                        const fakePosition =
                            elementData.position +
                            (existingFakeElement && currentElement === lastElement ? 1 : 0);
                        if (existingFakeElement)
                            apps.update((currentApps) =>
                                currentApps.filter((app) => app.name !== "fake-app")
                            );
                        apps.update((currentApps) => {
                            const fakeApp: IAppManifest = {
                                icon: transparentImage,
                                name: "fake-app",
                                label: "",
                                visible: false,
                                component: randomString(5),
                                page: elementData.page,
                                position: fakePosition
                            };
                            currentApps = [fakeApp, ...currentApps];
                            return currentApps;
                        });
                    } else apps.update((currentApps) => currentApps.filter((app) => app.name !== "fake-app"));
                    lastElement = currentElement;
                    lastFakeElement = currentFakeElement;
                    resolve();
                    isWaitingAboveApp = null;
                }, 150)
            );
        };
        const mouseUpHandler = (e: MouseEvent) => {
            const elements = document.elementsFromPoint(e.clientX, e.clientY) as HTMLElement[];
            const matchingFooterElement = elements.find((element) =>
                element.classList?.contains("home-screen-footer")
            );
            if (matchingFooterElement && (getAppsForPage(get(apps), -1).length === 0)) {
                isWaitingAboveApp = null;
                body.removeChild(appDivElement);
                isMovingApps.set(false);
                window.removeEventListener("mousemove", mouseMoveHandler);
                window.removeEventListener("mouseup", mouseUpHandler);
                const movingAppData = get(movingApp)!;
                apps.update((current) => {
                    current.filter((app) => app.name !== "fake-app");
                    return [
                        ...current,
                        {
                            icon: movingAppData.icon,
                            name: movingAppData.name,
                            label: movingAppData.label,
                            component: movingAppData.component,
                            visible: true,
                            page: -1,
                            position: 0
                        }
                    ];
                });
                return;
            }
            if (!lastFakeElement) {
                body.removeChild(appDivElement);
                window.removeEventListener("mousemove", mouseMoveHandler);
                window.removeEventListener("mouseup", mouseUpHandler);
                isMovingApps.set(false);
                apps.update((currentApps) => {
                    currentApps.filter((app) => app.name !== "fake-app");
                    return [...currentApps, current];
                });
                return;
            } else {
                isWaitingAboveApp = null;
                body.removeChild(appDivElement);
                isMovingApps.set(false);
                window.removeEventListener("mousemove", mouseMoveHandler);
                window.removeEventListener("mouseup", mouseUpHandler);
                const fakeApp = get(apps).find((app) => app.name === "fake-app");
                apps.update((currentApps) => currentApps.filter((app) => app.name !== "fake-app"));
                const movingAppData = get(movingApp)!;
                apps.update((current) => {
                    current.filter((app) => app.name !== "fake-app");
                    current.forEach((app) => {
                        if (app.page === fakeApp!.page && app.position >= fakeApp!.position) {
                            app.position++;
                        }
                    });
                    return [
                        ...current,
                        {
                            icon: movingAppData.icon,
                            name: movingAppData.name,
                            label: movingAppData.label,
                            component: movingAppData.component,
                            visible: true,
                            page: fakeApp!.page,
                            position: fakeApp!.position
                        }
                    ];
                });
            }
        };
        window.addEventListener("mouseup", mouseUpHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
    });