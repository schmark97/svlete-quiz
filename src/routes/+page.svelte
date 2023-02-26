<script>
    import Quiz from "./quiz/Quiz.svelte";
    import { authStore } from "./stores/authStore";
    import { onMount } from "svelte";
    import { auth } from "./lib/firebase";
    import Auth from "./auth/Auth.svelte";

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user };
            });
        });
    });
</script>

{#if $authStore.currentUser}
    <Quiz />
{:else if !$authStore.isLoading}
    <Auth />
{/if}

<style>
</style>
