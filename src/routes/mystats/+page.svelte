<script>
    import { db, auth } from "../lib/firebase.js";
    import { doc, getDoc } from "firebase/firestore";
    import { onMount, onDestroy } from "svelte";
    import { authStore } from "../stores/authstore";
    let userData = false;
    let unsubscribe = false;

    onMount(() => {
        unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    userData = docSnap.data();
                } catch (error) {
                    userData = {
                        status: 404,
                        error: new Error(`Not found`),
                    };
                }
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    const getPercentage = (value, gamesPlayed) => {
        if (value == 0 || gamesPlayed == 0) {
            return 0;
        }
        return Math.round((parseFloat(value) * 100) / gamesPlayed);
    };

    const topics = ["php", "wp", "js", "css", "mix"];
</script>

{#if userData}
    <div class="container">
        <h1 class="text-primary text-center text-5xl font-bold mb-8">
            My stats
        </h1>

        <h2 class="text-info text-center text-2xl font-bold mb-8">
            Games Played
        </h2>

        <div class="text-center mb-8">
            <div class="stats bg-info shadow">
                {#each topics as topic}
                    <div class="stat place-items-center border-base-100">
                        <div class="stat-title text-base-100">{topic}</div>
                        <div class="stat-value text-base-100">
                            {userData.gamesPlayed[topic]}
                        </div>
                        <div class="stat-desc text-base-100">games played</div>
                    </div>
                {/each}
            </div>
        </div>

        <h2 class="text-info text-center text-2xl font-bold mb-8">
            Average results
        </h2>

        <div class="text-center">
            <div class="stats shadow bg-neutral">
                {#each topics as topic}
                    {@const p = getPercentage(
                        userData.averageScore[topic],
                        userData.gamesPlayed[topic]
                    )}
                    <div class="stat place-items-center">
                        <div class="stat-title text-neutral-content mb-4">
                            {topic}
                        </div>
                        <div
                            class="radial-progress {p >= 80
                                ? 'text-primary'
                                : p >= 50
                                ? 'text-warning'
                                : 'text-error'}"
                            style="--value:{p};"
                        >
                            {p}%
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{:else if $authStore.isLoading}
    <div class="container h-full justify-center flex items-center">
        <div>
            <button class="btn loading">loading</button>
        </div>
    </div>
{/if}
