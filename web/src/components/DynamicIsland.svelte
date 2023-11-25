<script lang="ts">
    //@ts-ignore
    import { fade } from "svelte/transition";
    import { islandState, IslandType } from "../store/DynamicIsland";
    const getIslandDimensions = (state: IslandType): string => {
        switch (state) {
            case IslandType.None:
                return "width: 7.5vh; height: 2vh; border-radius: 2vh;";
            case IslandType.Utility:
                return "width: 11.5vh; height: 2vh; border-radius: 2vh;";
            case IslandType.Expanded:
                return "margin-top: 1vh; width: 20.5vh; height: 4.5vh; border-radius: 2vh;";
            case IslandType.Player:
                return "margin-top: 5vh; width: 20.5vh; height: 12vh; border-radius: 2vh;";
        }
    };
</script>

<div style="{getIslandDimensions($islandState)}">
    <!-- <div style={getIslandDimensions(IslandType.Player)}> -->
    {#if $islandState === IslandType.None}
        <span in:fade="{{ duration: 250 }}" out:fade="{{ duration: 250 }}" class="front-camera">
            <span class="front-camera-lens">
                <span class="front-camera-lens-reflection"></span>
            </span>
        </span>
    {/if}
</div>

<style>
    div {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: black;
        transition:
            1s,
            border-radius 1s;
    }
    .front-camera {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.3vh;
        width: 1.3vh;
        top: 50%;
        right: 0.4vh;
        transform: translateY(-50%);
        border-radius: 999999px;
        background-color: rgb(45, 45, 45);
    }
    .front-camera-lens {
        height: 1vh;
        width: 1vh;
        border-radius: 999999999px;
        background: radial-gradient(black, #152839 60%);
    }
</style>
