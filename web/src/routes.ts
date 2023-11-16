import LockScreen__SvelteComponent_ from "./components/LockScreen.svelte";
import CodeLockScreen__SvelteComponent_ from "./components/CodeLockScreen.svelte";
import HomeScreen__SvelteComponent_ from "./components/HomeScreen.svelte";

export default {
    "/": HomeScreen__SvelteComponent_,
    "/lock_screen": LockScreen__SvelteComponent_,
    "/code_screen": CodeLockScreen__SvelteComponent_
};
