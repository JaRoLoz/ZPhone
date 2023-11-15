<script lang="ts">
    import { fade } from "svelte/transition";
    import CellService from "./CellService.svelte";
    import HeaderClock from "./HeaderClock.svelte";
    import DynamicIsland from "./DynamicIsland.svelte";
    import BatteryIcon from "../assets/battery-icon.png";
    import { islandState, IslandType } from "../utils/DynamicIsland";
    import { currentTime } from "../store/PhoneState";
</script>

<header>
    {#if $islandState !== IslandType.Expanded && $islandState !== IslandType.Player}
        <HeaderClock time="{$currentTime}" />
        <CellService signalStrength="{3}" />
        <img in:fade="{{ duration: 300 }}" out:fade="{{ duration: 300 }}" src="{BatteryIcon}" alt="battery-icon" />
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
        z-index: 2;
    }
    header > img {
        height: 1.8vh;
        margin-right: 1.7vh;
        filter: invert(1);
        user-select: none;
        -webkit-user-drag: none;
    }
</style>
