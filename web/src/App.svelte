<script lang="ts">
    import { push } from "svelte-spa-router";
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import PhoneVisibilityProvider from "./providers/PhoneVisibilityProvider.svelte";
    import { islandState, IslandType } from "./store/DynamicIsland";
    import { debugData } from "./utils/debugData";
    import { isEnvBrowser } from "./utils/misc";
    import { get } from "svelte/store";
    import Frame from "./components/Frame.svelte";
    import ControlCenter from "./components/ControlCenter.svelte";
    import { showControlCenter } from "./store/PhoneState";
    debugData([
        {
            action: "setVisible",
            data: true
        }
    ]);
    const getNextIslandState = () => {
        switch (get(islandState)) {
            case IslandType.None:
                return IslandType.Utility;
            case IslandType.Utility:
                return IslandType.Expanded;
            case IslandType.Expanded:
                return IslandType.Player;
            case IslandType.Player:
                return IslandType.None;
        }
    };
</script>

<PhoneVisibilityProvider>
    {#if isEnvBrowser()}
        <div id="night-mode"></div>
    {/if}
    <div id="phone-frame">
        <Header />
        <Frame />
        <!-- <Footer on:slide="{() => islandState.set(getNextIslandState())}" /> -->
        <Footer on:slide="{() => push('/code_screen')}" />
        {#if $showControlCenter}
            <ControlCenter />
        {/if}
    </div>
</PhoneVisibilityProvider>

<style>
    div#night-mode {
        position: absolute;
        min-height: 100vh;
        min-width: 100vw;
        background-color: rgb(86, 86, 86);
        z-index: -9999999;
    }
    #phone-frame {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 50vh;
        aspect-ratio: 9/20;
        /* background-image: url(https://cdn.discordapp.com/attachments/1004090763623272549/1169771969076539392/IMG_2072.png?ex=65569e0a&is=6544290a&hm=f58b660613b2585d15015450b95b64709bb6180b8d2030a007bc022e1e1a5cfe&); */
        background-position: center;
        background-size: cover;
        border: 0.4vh solid rgb(52, 50, 50);
        border-radius: 3.2vh;
        bottom: 1vh;
        right: 1vw;
        overflow: hidden;
        z-index: 0;
    }
</style>
