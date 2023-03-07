<script>
    import { quizStore } from "../stores/quizstore";
    import Points from "../components/quiz/Points.svelte";
    import { onDestroy } from "svelte";

    export let data;
    let gifUrl = "";

    if (data.gif.data) {
        gifUrl = data.gif.data.images.original.url;
    }

    onDestroy(() => {
        $quizStore.started = false;
    });
</script>

<div class="flex h-screen">
    <div class="ml-auto mr-auto">
        {#if $quizStore.max !== 0 && $quizStore.started}
            <div class="mb-5">
                <img src={gifUrl} alt="congratulations" />
            </div>

            <div class="mb-5">
                <Points points={$quizStore.score} max={$quizStore.max} />
            </div>

            <div class="text-center">
                <a href="/" class="btn-outline btn-info btn btn-wide"
                    >Try again</a
                >
            </div>
        {:else}
            <a href="/" class="btn-outline btn-info btn btn-wide">Start quiz</a>
        {/if}
    </div>
</div>
