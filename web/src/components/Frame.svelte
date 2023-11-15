<script lang="ts">
    import Router from "svelte-spa-router";
    import routes from "../routes";
    import { wallpaper } from "../store/PhoneState";
</script>

<main style="{`background-image: url(${$wallpaper});`}">
    <Router routes="{routes}" />
</main>

<style>
    main {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgb(29, 29, 29);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        z-index: 1;
    }
</style>
