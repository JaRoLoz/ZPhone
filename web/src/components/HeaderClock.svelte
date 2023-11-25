<script lang="ts">
    import { fade } from "svelte/transition";
    import { getTimeFromTimeStamp } from "../utils/time";
    export let time: number;
</script>

<span in:fade="{{ duration: 300 }}" out:fade="{{ duration: 300 }}">
    {getTimeFromTimeStamp(time).hours}:{getTimeFromTimeStamp(time).minutes < 10 ?
        `0${getTimeFromTimeStamp(time).minutes}`
    :   getTimeFromTimeStamp(time).minutes}
</span>

<style>
    span {
        margin-left: 1.7vh;
        font-size: 1.2vh;
        font-weight: 500;
        color: white;
        user-select: none;
        -webkit-user-drag: none;
    }
</style>
