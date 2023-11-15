<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let icon: string;
    const dispatch = createEventDispatcher<{ click: boolean }>();
    let state = false;
</script>

<button
    on:click="{() => {
        state = !state;
        dispatch('click', state);
    }}"
    style="{state ? `background-color: white; color: black;` : ''}"
>
    <i class="{icon}"></i>
</button>

<style>
    button {
        height: 3vh;
        width: 3vh;
        border-radius: 9999999px;
        font-size: 1.3vh;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        backdrop-filter: blur(40px);
        cursor: pointer;
    }
</style>
