<script lang="ts">
    import { useNuiEvent } from "../utils/useNuiEvent";
    import { fetchNui } from "../utils/fetchNui";
    import { onMount } from "svelte";
    import { visibility } from "../store/visibility";
    import { isEnvBrowser } from "../utils/misc";

    let isVisible: boolean;

    visibility.subscribe((visible) => {
        isVisible = visible;
    });

    useNuiEvent<boolean>("setVisible", (visible) => {
        visibility.set(visible);
    });

    onMount(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (isEnvBrowser()) return;
            if (isVisible && ["Escape"].includes(e.code)) {
                fetchNui("hideUI");
                visibility.set(false);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    });
</script>

{#if isVisible}
    <slot />
{/if}
