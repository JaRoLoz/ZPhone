<script lang="ts">
    export let signalStrength: 0 | 1 | 2 | 3 = 0;
</script>

{#if signalStrength == 0}
    <i class="fa-duotone fa-wifi-slash"></i>
{:else if signalStrength == 1}
    <i class="fa-duotone fa-wifi-weak"></i>
{:else if signalStrength == 2}
    <i class="fa-duotone fa-wifi-fair"></i>
{:else if signalStrength == 3}
    <i class="fa-duotone fa-wifi"></i>
{/if}
