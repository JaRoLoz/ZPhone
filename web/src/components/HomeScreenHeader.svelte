<script lang="ts">
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import {
        apps,
        changePage,
        currentAppPage,
        getAppsForPage,
        homeScreenPageTransition,
        isMovingApps,
        movingApp
    } from "../store/PhoneState";
    import { getVh } from "../utils/view";
    import { onMount } from "svelte";
    import type { IAppManifest } from "src/types";
    import { get } from "svelte/store";

    let headerElement: HTMLElement;

    const handleSlide = (e: MouseEvent) => {
        if (e.target !== e.currentTarget) return;

        const start = e.clientX;
        let mouseMoveHandler: (e: MouseEvent) => void;
        let mouseUpHandler = () => {
            window.removeEventListener("mouseup", mouseUpHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
        };
        mouseMoveHandler = (e: MouseEvent) => {
            const hasMovedEnough = Math.abs(start - e.clientX) >= getVh() * 16;
            if (hasMovedEnough) {
                const direction = start > e.clientX;
                window.removeEventListener("mouseup", mouseUpHandler);
                window.removeEventListener("mousemove", mouseMoveHandler);
                homeScreenPageTransition.update((current) => {
                    current.in.x =
                        direction ?
                            headerElement.getBoundingClientRect().width + getVh() * 5
                        :   -headerElement.getBoundingClientRect().width - getVh() * 5;
                    current.out.x =
                        direction ?
                            -headerElement.getBoundingClientRect().width - getVh() * 5
                        :   headerElement.getBoundingClientRect().width + getVh() * 5;
                    return current;
                });
                changePage(direction);
            }
        };
        window.addEventListener("mouseup", mouseUpHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
    };

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
        const element = (
            (e.target! as HTMLElement).nodeName === "BUTTON" ?
                e.target
            :   (e.target! as HTMLElement).parentElement) as HTMLButtonElement;
        movingApp.set(JSON.parse(element.dataset.app as string) as IAppManifest);
    };

    onMount(() =>
        homeScreenPageTransition.update((current) => {
            current.in.x = -headerElement.getBoundingClientRect().width - getVh() * 5;
            current.out.x = headerElement.getBoundingClientRect().width + getVh() * 5;
            return current;
        })
    );
</script>

<header class="apps-container" bind:this="{headerElement}">
    {#if $apps.length > 1}
        <!-- I'm terribly sorry for this, but it works, sooo... -->
        {#key $currentAppPage}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                on:mousedown="{handleSlide}"
                out:fly="{$homeScreenPageTransition.out}"
                in:fly="{$homeScreenPageTransition.in}"
                class="apps-container"
            >
                {#each getAppsForPage($apps, $currentAppPage) as app, i (app.label)}
                    <button
                        animate:flip="{{ duration: 550 }}"
                        class="{`${app.visible ? 'home-app-icon' : 'fake-app'} ${
                            $isMovingApps ? 'shake' : ''
                        }`}"
                        on:mousedown="{handleAppMove}"
                        data-app="{JSON.stringify(app)}"
                    >
                        <img
                            class="{app.visible ? 'home-app-icon' : ''}"
                            src="{app.icon}"
                            alt="{app.label}"
                        />
                        <span class="{app.visible ? 'home-app-icon' : ''}">
                            {app.visible ? app.label : ""}
                        </span>
                    </button>
                {/each}
            </div>
        {/key}
    {/if}
</header>

<style>
    header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20.5vh;
        height: 70%;
        margin-top: 5vh;
    }
    header > div {
        position: absolute;
        display: flex;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
        grid-auto-rows: calc(100% / 6);
        grid-auto-flow: dense;
        place-items: center;
        align-items: flex-start;
        min-width: 100%;
        height: 100%;
        gap: 0.2vh;
    }
    header > div > button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 4.25vh;
        max-height: 4.25vh;
        aspect-ratio: 1/1;
        background: none;
        cursor: pointer;
        transition: 1s;
    }
    header > div > button > img {
        width: 90%;
        aspect-ratio: 1/1;
        margin-bottom: auto;
    }
    header > div > button > span {
        color: white;
        font-size: 1vh;
        font-weight: 400;
    }
    .shake {
        animation: shake 0.7s infinite;
    }
    @keyframes shake {
        0% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(3deg);
        }
        20% {
            transform: rotate(-3deg);
        }
        30% {
            transform: rotate(3deg);
        }
        40% {
            transform: rotate(-3deg);
        }
        50% {
            transform: rotate(3deg);
        }
        60% {
            transform: rotate(-3deg);
        }
        70% {
            transform: rotate(3deg);
        }
        80% {
            transform: rotate(-3deg);
        }
        90% {
            transform: rotate(3deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
