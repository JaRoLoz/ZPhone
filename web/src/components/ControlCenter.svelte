<script lang="ts">
    import { showControlCenter } from "../store/PhoneState";
    import { fade, fly } from "svelte/transition";

    const handleClick = (e: MouseEvent) => {
        if (e.target !== e.currentTarget) return;
        showControlCenter.set(false);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click="{handleClick}" in:fade="{{ duration: 130 }}" out:fade="{{ duration: 130 }}">
    <ul on:click="{handleClick}">
        <li class="quad-fil"></li>
        <li class="quad-fil"></li>
        <li class="quad flex flex-col gap-[1vh]">
            <div>
                <button>1</button>
                <button>2</button>
            </div>
            <button>bot</button>
        </li>
        <li class="quad"></li>
        <li></li>
        <li></li>
    </ul>
</main>

<style>
    main {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        z-index: 4;
    }
    main > ul {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1vh;
        height: 80%;
        width: 88%;
    }
    .quad-fil {
        border-radius: 1vh;
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(15px);
        width: calc(50% - 0.5vh);
        aspect-ratio: 1/1;
    }
    .quad {
        width: calc(50% - 0.5vh);
        aspect-ratio: 1/1;
    }
</style>
