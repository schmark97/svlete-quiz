<script>
    import { quizStore } from "../stores/quizstore";
    import Points from "../components/quiz/Points.svelte";

    export let data;
    let gifUrl = "";

    if (data.gif.data) {
        gifUrl = data.gif.data.images.original.url;
    }
</script>

<div class="flex h-screen">
    <div class="ml-auto mr-auto">
        {#if $quizStore.max !== 0}
            <div class="mb-5">
                <img
                    src="https://media2.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=2477cdf64989c27587c96e70304482bc34d3782120fd1bc6&rid=giphy.gif&ct=g"
                    alt="congratulations"
                />
            </div>

            <Points points={$quizStore.score} max={$quizStore.max} />
        {:else}
            <a href="/" class="btn-outline btn-info btn btn-wide">Start quiz</a>
        {/if}
    </div>
</div>
