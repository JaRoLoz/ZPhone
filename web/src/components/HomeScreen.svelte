<script lang="ts">
    import { scale, fade } from "svelte/transition";
    import HomeScreenHeader from "./HomeScreenHeader.svelte";
    import HomeScreenPages from "./HomeScreenPages.svelte";
    import HomeScreenFooter from "./HomeScreenFooter.svelte";
    import imessage from "../assets/imessage.svg";
    import { apps, currentAppPage, getPageAmount } from "../store/PhoneState";

    apps.set([
        {
            name: "message0",
            visible: true,
            icon: imessage,
            label: "Mensajes0",
            component: "Messages",
            page: 0,
            position: 0
        },
        {
            name: "message1",
            visible: true,
            icon: imessage,
            label: "Mensajes1",
            component: "Messages",
            page: 0,
            position: 1
        },
        {
            name: "message2",
            visible: true,
            icon: imessage,
            label: "Mensajes2",
            component: "Messages",
            page: 0,
            position: 2
        },
        {
            name: "message3",
            visible: true,
            icon: imessage,
            label: "Mensajes3",
            component: "Messages",
            page: 0,
            position: 3
        },
        {
            name: "message4",
            visible: true,
            icon: imessage,
            label: "Mensajes4",
            component: "Messages",
            page: 0,
            position: 4
        },
        {
            name: "message5",
            visible: true,
            icon: imessage,
            label: "Mensajes5",
            component: "Messages",
            page: 0,
            position: 5
        },
        {
            name: "message6",
            visible: true,
            icon: imessage,
            label: "Mensajes6",
            component: "Messages",
            page: 0,
            position: 6
        },
        {
            name: "message7",
            visible: true,
            icon: imessage,
            label: "Mensajes7",
            component: "Messages",
            page: 0,
            position: 7
        },
        {
            name: "message8",
            visible: true,
            icon: imessage,
            label: "Mensajes8",
            component: "Messages",
            page: 1,
            position: 1
        },
        {
            name: "message9",
            visible: true,
            icon: imessage,
            label: "Mensajes9",
            component: "Messages",
            page: 1,
            position: 0
        },
        {
            name: "messageA",
            visible: true,
            icon: imessage,
            label: "MensajesA",
            component: "Messages",
            page: -1,
            position: 0
        },
        {
            name: "messageB",
            visible: true,
            icon: imessage,
            label: "MensajesB",
            component: "Messages",
            page: -1,
            position: 1
        },
        {
            name: "messageC",
            visible: true,
            icon: imessage,
            label: "MensajesC",
            component: "Messages",
            page: -1,
            position: 2
        },
        {
            name: "messageD",
            visible: true,
            icon: imessage,
            label: "MensajesD",
            component: "Messages",
            page: -1,
            position: 3
        }
    ]);
</script>

<main
    class="home-container"
    in:scale="{{ start: 400, duration: 1300 }}"
    out:fade="{{ duration: 0, delay: 600 }}"
>
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
