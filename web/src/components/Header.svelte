<script lang="ts">
    import { fade } from "svelte/transition";
    import CellService from "./CellService.svelte";
    import HeaderClock from "./HeaderClock.svelte";
    import DynamicIsland from "./DynamicIsland.svelte";
    import BatteryIcon from "../assets/battery-icon.png";
    import { islandState, IslandType } from "../store/DynamicIsland";
    import { currentTime, showControlCenter, isMovingApps } from "../store/PhoneState";
    import { getVh } from "../utils/view";
    import { get } from "svelte/store";

    const handleDrag = (e: MouseEvent) => {
        if (get(showControlCenter)) return;
        const start = e.clientY;
        let mouseMoveHandler: (e: MouseEvent) => void;
        let mouseUpHandler = () => {
            window.removeEventListener("mouseup", mouseUpHandler);
            window.removeEventListener("mousemove", mouseMoveHandler);
        };
        mouseMoveHandler = (e: MouseEvent) => {
            const hasMovedEnough = Math.abs(start - e.clientY) >= getVh() * 4;
            if (hasMovedEnough) {
                window.removeEventListener("mouseup", mouseUpHandler);
                window.removeEventListener("mousemove", mouseMoveHandler);
                showControlCenter.set(true);
            }
        };
        window.addEventListener("mouseup", mouseUpHandler);
        window.addEventListener("mousemove", mouseMoveHandler);
    };
</script>

<header>
    {#if $islandState !== IslandType.Expanded && $islandState !== IslandType.Player}
        <HeaderClock time="{$currentTime}" />
        {#if $isMovingApps}
            <button>OK</button>
        {:else}
            <div on:mousedown="{handleDrag}" style="{!$showControlCenter ? 'cursor: grab;' : ''}">
                <CellService signalStrength="{3}" />
                <img
                    in:fade="{{ duration: 300 }}"
                    out:fade="{{ duration: 300 }}"
                    src="{BatteryIcon}"
                    alt="battery-icon"
                />
            </div>
        {/if}
    {/if}
    <DynamicIsland />
</header>

<style>
    header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3.8vh;
        width: 100%;
        user-select: none;
        -webkit-user-drag: none;
        z-index: 6;
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3vh;
        width: 5.5vh;
    }
    header > div > img {
        height: 1.8vh;
        margin-right: 1.1vh;
        filter: invert(1);
        user-select: none;
        -webkit-user-drag: none;
    }
    header > button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.5vh;
        width: 3.5vh;
        margin-right: 1vh;
        border-radius: 99999999px;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(40px);
        color: white;
        font-size: 1.1vh;
        font-weight: 600;
        letter-spacing: 0.05vh;
        user-select: none;
        -webkit-user-drag: none;
    }
</style>
