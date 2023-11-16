<script lang="ts">
    import { fade, fly } from "svelte/transition";
</script>

<main></main>

<style>
    main {
        position: absolute;
        display: flex;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        z-index: 4;
    }
</style>
