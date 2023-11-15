<script lang="ts">
    // import { currentAppPage } from "../store/PhoneState";

    export let pages: number;
    export let currentPage: number;
</script>

<main>
    {#each Array(pages).fill(0) as _, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div 
            style="{i === currentPage 
                ? 'background-color: white; cursor: default;' 
                : ''}"
        />
        <!-- <div 
            on:click="{() => currentAppPage.set(i)}" 
            style="{i === currentPage 
                ? 'background-color: white; cursor: default;' 
                : ''}"
        /> -->
    {/each}
</main>

<style>
    main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5vh;
        padding: 0.5vh;
        margin-top: 1vh;
        background-color: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(40px);
        border-radius: 9999999px;
    }
    div {
        height: 0.35vh;
        width: 0.35vh;
        border-radius: 999999999px;
        border: 0.1vh solid white;
        /* cursor: pointer; */
        transition: .4s;
    }
</style>
