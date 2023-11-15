<script lang="ts">
    import { fly, type FlyParams } from "svelte/transition";
    import { apps, changePage, currentAppPage, getAppsForPage, getPageAmount } from "../store/PhoneState";
    import { getVh } from "../utils/view";
    import { onMount } from "svelte";

    let headerElement: HTMLElement;

    let transitionConfig: { in: FlyParams, out: FlyParams };

    const handleSlide = (e: MouseEvent) => {
        if (e.target !== e.currentTarget) return;

        const start = e.clientX;
        let mouseMoveHandler: (e: MouseEvent) => void;
        let mouseUpHandler = () => {
            window.removeEventListener("mouseup", mouseUpHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
        }
        mouseMoveHandler = (e: MouseEvent) => {
            const hasMovedEnough = Math.abs(start - e.clientX) >= (getVh() * 16);
            if (hasMovedEnough) {
                const direction = start > e.clientX;
                window.removeEventListener("mouseup", mouseUpHandler);
                window.removeEventListener("mousemove", mouseMoveHandler);
                transitionConfig.in.x = direction ? headerElement.getBoundingClientRect().width : -headerElement.getBoundingClientRect().width;
                transitionConfig.out.x = direction ? getVh() * -headerElement.getBoundingClientRect().width : getVh() * headerElement.getBoundingClientRect().width;
                changePage(direction);
            }
        }
        window.addEventListener("mouseup", mouseUpHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
    }

    onMount(() => transitionConfig = {
        in: {
            duration: 500,
            //@ts-ignore
            x: -headerElement.getBoundingClientRect().width
        },
        out: {
            duration: 500,
            //@ts-ignore
            x: headerElement.getBoundingClientRect().width
        }
    });
</script>

<header bind:this={headerElement}>
    {#if $apps.length > 1}
    <!-- I'm terribly sorry for this -->
        {#each Array(1) as _ ($currentAppPage)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:mousedown="{handleSlide}" out:fly={transitionConfig.out} in:fly={transitionConfig.in}>
                {#each getAppsForPage($currentAppPage) as app (app.label)}
                    <button>
                        <img src="{app.icon}" alt="{app.label}" />
                        <span>{app.label}</span>
                    </button>
                {/each}
            </div>
        {/each}
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
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
        place-items: center;
        align-items: flex-start;
        min-width: 100%;
        height: 100%;
        gap: 1vh;
    }
    header > div > button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-width: 90%;
        max-width: 90%;
        min-height: 90%;
        max-height: 90%;
        background: none;
        cursor: pointer;
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
</style>