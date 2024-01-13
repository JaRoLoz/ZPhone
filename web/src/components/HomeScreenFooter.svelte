<script lang="ts">
    import { get } from "svelte/store";
    import { apps, getAppsForPage, movingApp, isMovingApps } from "../store/PhoneState";
    import { flip } from "svelte/animate";
    import type { IAppManifest } from "../types";

    const handleAppMove = async (e: MouseEvent) => {
        const holdingPromise = new Promise<boolean>((resolve) => {
            const mouseUpHandler = (e: MouseEvent) => {
                window.removeEventListener("mouseup", mouseUpHandler);
                resolve(false);
            };
            window.addEventListener("mouseup", mouseUpHandler);
            setTimeout(() => {
                window.removeEventListener("mouseup", mouseUpHandler);
                resolve(true);
            }, 2500);
        });

        const hasMouseBeenHeld = await holdingPromise;
        if (!hasMouseBeenHeld) {
            if (get(isMovingApps)) return;
            // TODO: Implement app launching logic
            return;
        }
        isMovingApps.set(true);
        //@ts-ignore
        const element = (
            (e.target! as HTMLElement).nodeName === "BUTTON" ?
                e.target
            :   (e.target! as HTMLElement).parentElement) as HTMLButtonElement;
        movingApp.set(JSON.parse(element.dataset.app as string) as IAppManifest);
    };
</script>

<footer class="home-screen-footer">
    {#each getAppsForPage($apps, -1) as app, i (app.label)}
        <button
            animate:flip="{{ duration: 550 }}"
            on:mousedown="{handleAppMove}"
            class="{`${app.visible ? 'dock-app-icon' : 'fake-app'} ${$isMovingApps ? 'shake' : ''}`}"
            data-app="{JSON.stringify(app)}"
        >
            <img class="{app.visible ? 'dock-app-icon' : ''}" src="{app.icon}" alt="{app.label}" />
        </button>
    {/each}
</footer>

<style>
    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5.2vh;
        gap: 1vh;
        width: 94%;
        margin-top: auto;
        margin-bottom: 1.6vh;
        border-radius: 1.6vh;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(40px);
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3.9375vh;
        cursor: pointer;
        transition: 0.5s;
    }
    img {
        height: 100%;
        aspect-ratio: 1/1;
    }
</style>
