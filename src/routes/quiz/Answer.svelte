<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let answers;
    export let questionIndex;
    export let selectedAnswer;

    function selectAnswer() {
        dispatch("select", {
            answer: selectedAnswer,
        });
    }
</script>

{#each answers as answer, index (answer + "-" + questionIndex)}
    <label>
        <input
            type="radio"
            name="answer"
            value={answer}
            bind:group={selectedAnswer}
            on:change={selectAnswer}
        />
        {answer}
    </label>
{/each}
