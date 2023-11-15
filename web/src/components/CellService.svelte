<script lang="ts">
    import { fade } from "svelte/transition";
    export let signalStrength: 0 | 1 | 2 | 3 | 4 = 0;
    let icons = [
        "fa-duotone fa-signal-bars-slash",
        "fa-duotone fa-signal-bars-weak",
        "fa-duotone fa-signal-bars-fair",
        "fa-duotone fa-signal-bars-good",
        "fa-duotone fa-signal-bars",
    ];
</script>

<i in:fade="{{ duration: 300 }}" out:fade="{{ duration: 300 }}" class="{icons[signalStrength]}"></i>

<style>
    i {
        margin-left: auto;
        margin-right: 0.4vh;
        font-size: 1.2vh;
        color: white;
        font-size: 1vh !important;
        user-select: none;
        -webkit-user-drag: none;
    }
</style>
