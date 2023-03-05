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
    <div class="form-control">
        <label class="label cursor-pointer justify-start">
            <input
                class="radio radio-primary"
                type="radio"
                name="answer"
                value={answer}
                bind:group={selectedAnswer}
                on:change={selectAnswer}
            />
            <span class="label-text ml-3">
                {answer}
            </span>
        </label>
    </div>
{/each}
