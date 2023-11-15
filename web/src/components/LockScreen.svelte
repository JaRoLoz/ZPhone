<script lang="ts">
    import { fly } from "svelte/transition";
    import { getTimeFromTimeStamp, months, days } from "../utils/time";
    import { currentTime } from "../store/PhoneState";
    import LockScreenButton from "./LockScreenButton.svelte";
</script>

<main out:fly="{{ y: '-100%', duration: 650 }}">
    <h2>
        {days[getTimeFromTimeStamp($currentTime).day]}, {months[getTimeFromTimeStamp($currentTime).month]}
        {getTimeFromTimeStamp($currentTime).dayOfMonth}th
    </h2>
    <h1>
        {getTimeFromTimeStamp($currentTime).hours}:{getTimeFromTimeStamp($currentTime).minutes < 10
            ? `0${getTimeFromTimeStamp($currentTime).minutes}`
            : getTimeFromTimeStamp($currentTime).minutes}
    </h1>
    <footer>
        <LockScreenButton on:click="{(e) => console.log('flashlight', e.detail)}" icon="fa-solid fa-flashlight fa-rotate-270" />
        <span> Swipe up to unlock </span>
        <LockScreenButton on:click="{(e) => console.log('camera', e.detail)}" icon="fa-solid fa-camera" />
    </footer>
</main>

<style>
    main {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
    h2 {
        margin-top: 30%;
        color: white;
        font-weight: 500;
        font-size: 1.4vh;
    }
    h1 {
        margin-bottom: auto;
        color: white;
        font-weight: 500;
        font-size: 5vh;
    }
    footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        margin-bottom: 3vh;
    }
    span {
        width: 5vh;
        color: white;
        text-align: center;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% {
            color: white;
        }
        50% {
            color: rgba(255, 255, 255, 0.5);
        }
        100% {
            color: white;
        }
    }
</style>
