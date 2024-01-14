import type { IAppManifest } from "../types";

const AppCache: string[] = [];

export const launchApp = (app: IAppManifest) => {
    console.log("launching app", app);
};
