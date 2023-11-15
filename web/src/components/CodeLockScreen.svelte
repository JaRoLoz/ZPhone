<script lang="ts">
    import { push } from "svelte-spa-router";
    import { fade, fly } from "svelte/transition";
    import { codeLock } from "../store/PhoneState";
    import { get } from "svelte/store";

    let animationStyle = "";

    let currentCode = "";
    const checkCode = (char: string) => {
        currentCode += char;
        if (currentCode.length === get(codeLock).length) {
            if (currentCode === get(codeLock)) {
                push("/");
            } else {
                setTimeout(() => {
                    animationStyle = "animation";
                }, 100);
                setTimeout(() => {
                    animationStyle = "";
                }, 400);
            }
            setTimeout(() => {
                currentCode = "";
            }, 500);
        }
    };
</script>

<main in:fade="{{ duration: 200, delay: 400 }}" out:fly="{{ y: '-100%', duration: 650, delay: 400 }}">
    <h2>Enter passcode</h2>
    <div class="{animationStyle}">
        <span style="{currentCode[0] ? 'background-color: white;' : ''}"></span>
        <span style="{currentCode[1] ? 'background-color: white;' : ''}"></span>
        <span style="{currentCode[2] ? 'background-color: white;' : ''}"></span>
        <span style="{currentCode[3] ? 'background-color: white;' : ''}"></span>
    </div>
    <div>
        <button on:click="{() => checkCode('1')}">1</button>
        <button on:click="{() => checkCode('2')}">2</button>
        <button on:click="{() => checkCode('3')}">3</button>
        <button on:click="{() => checkCode('4')}">4</button>
        <button on:click="{() => checkCode('5')}">5</button>
        <button on:click="{() => checkCode('6')}">6</button>
        <button on:click="{() => checkCode('7')}">7</button>
        <button on:click="{() => checkCode('8')}">8</button>
        <button on:click="{() => checkCode('9')}">9</button>
        <button on:click="{() => checkCode('0')}">0</button>
    </div>
</main>

<style>
    main {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    h2 {
        color: white;
        font-size: 1.4vh;
    }
    div:first-of-type {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1vh;
        width: 8vh;
        margin-top: 1vh;
        margin-bottom: 3vh;
    }
    div:last-of-type {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        justify-items: space-between;
        flex-wrap: wrap;
        gap: 1.5vh;
        width: 17vh;
    }
    span {
        height: 0.8vh;
        width: 0.8vh;
        border: 0.1vh solid white;
        border-radius: 999999px;
    }
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4.5vh;
        width: 4.5vh;
        margin: auto;
        border-radius: 99999999px;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        backdrop-filter: blur(40px);
        font-size: 2vh;
        transition: 0.4s;
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
    .animation {
        animation: shake 0.4s;
    }
    @keyframes shake {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-1vh);
        }
        50% {
            transform: translateX(0);
        }
        75% {
            transform: translateX(1vh);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>
