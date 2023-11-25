import type { FlyParams } from "svelte/transition";
import type { IAppManifest } from "../types";
import { get, writable } from "svelte/store";

export const wallpaper = writable<string>(
    "https://www.ytechb.com/wp-content/uploads/2023/09/iPhone-15-Pro-Natural-Wallpaper-1.webp"
);
export const currentTime = writable<number>(1699116111);
export const codeLock = writable<string>("4367");
export const showControlCenter = writable<boolean>(false);
export const homeScreenPageTransition = writable<{ in: FlyParams; out: FlyParams }>({
    in: {
        duration: 500,
        opacity: 1,
        x: 0
    },
    out: {
        duration: 500,
        opacity: 1,
        x: 0
    }
});
export const isMovingApps = writable<boolean>(false);
export const movingApp = writable<IAppManifest | null>(null);

export const getAppsForPage = (appList: IAppManifest[], page: number): IAppManifest[] => {
    const appsForPage = appList.filter((app) => app.page === page);
    appsForPage.sort((a, b) => a.position - b.position);
    return appsForPage;
};

export const getPageAmount = (): number => {
    const appList = get(apps);
    let maxPage = 0;
    appList.forEach((app) => {
        if (app.page > maxPage) {
            maxPage = app.page;
        }
    });
    return maxPage + 1;
};

export const changePage = (page: boolean) => {
    const maxPage = getPageAmount() - 1;
    const currentPage = get(currentAppPage);
    if (page && currentPage == maxPage) return;
    if (!page && currentPage == 0) return;
    currentAppPage.update((value) => value + (page ? 1 : -1));
};

export const apps = writable<IAppManifest[]>([]);
export const currentAppPage = writable<number>(0);
