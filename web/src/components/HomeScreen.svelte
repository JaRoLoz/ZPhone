<script lang="ts">
    import { scale, fade } from "svelte/transition";
    import HomeScreenHeader from "./HomeScreenHeader.svelte";
    import HomeScreenPages from "./HomeScreenPages.svelte";
    import HomeScreenFooter from "./HomeScreenFooter.svelte";
    import imessage from "../assets/imessage.svg";
    import { apps, currentAppPage, getPageAmount } from "../store/PhoneState";

    apps.set([
        {
            icon: imessage,
            label: "Mensajes0",
            component: "Messages",
            page: 0,
            position: 0
        },
        {
            icon: imessage,
            label: "Mensajes1",
            component: "Messages",
            page: 0,
            position: 1
        },
        {
            icon: imessage,
            label: "Mensajes2",
            component: "Messages",
            page: 0,
            position: 2
        },
        {
            icon: imessage,
            label: "Mensajes3",
            component: "Messages",
            page: 0,
            position: 3
        },
        {
            icon: imessage,
            label: "Mensajes4",
            component: "Messages",
            page: 0,
            position: 4
        },
        {
            icon: imessage,
            label: "Mensajes5",
            component: "Messages",
            page: 0,
            position: 5
        },
        {
            icon: imessage,
            label: "Mensajes6",
            component: "Messages",
            page: 0,
            position: 6
        },
        {
            icon: imessage,
            label: "Mensajes7",
            component: "Messages",
            page: 0,
            position: 7
        },
        {
            icon: imessage,
            label: "Mensajes8",
            component: "Messages",
            page: 1,
            position: 1
        },
        {
            icon: imessage,
            label: "Mensajes9",
            component: "Messages",
            page: 1,
            position: 0
        },
    ]);
</script>

<main class="home-container" in:scale="{{ start: 400, duration: 1300 }}" out:fade="{{ duration: 0, delay: 600 }}">
    <HomeScreenHeader />
    {#if getPageAmount() > 1}
        <HomeScreenPages pages="{getPageAmount()}" currentPage="{$currentAppPage}" />
    {/if}
    <HomeScreenFooter />
</main>

<style>
    main.home-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
    }
</style>
