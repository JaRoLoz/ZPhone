<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher<{ slide: null }>();
    let footerElement: HTMLElement;
    let innerHeight: number;
    let isMouseBeingHeldDown: boolean = false;
    let barPosition = "";
    onMount(() => {
        let mouseYPosition: number;

        document.onmousemove = (e) => {
            mouseYPosition = e.clientY;
        };

        window.addEventListener("mouseup", () => {
            isMouseBeingHeldDown = false;
        });
        window.addEventListener("mousedown", () => {
            isMouseBeingHeldDown = true;
        });

        let clickFollowingInterval: number;
        footerElement.addEventListener("mousedown", async () => {
            clickFollowingInterval = setInterval(() => {
                let bottom = footerElement.getBoundingClientRect().bottom;
                let position = innerHeight - mouseYPosition;
                barPosition = `margin-bottom: ${position / 1.5 < innerHeight * 0.04 ? position / 1.5 : innerHeight * 0.04}px;`;
                if (!isMouseBeingHeldDown) {
                    clearInterval(clickFollowingInterval);
                    barPosition = "";
                    if (position / 1.5 >= innerHeight * 0.04) dispatch("slide", null);
                    return;
                }
            }, 0);
        });
    });
</script>

<svelte:window bind:innerHeight="{innerHeight}" />

<footer style="{barPosition}" bind:this="{footerElement}"></footer>

<style>
    footer {
        height: 0.4vh;
        width: 50%;
        cursor: pointer;
        margin-bottom: 0.7vh;
        border-radius: 99999999px;
        background-color: white;
        z-index: 2;
    }
</style>
