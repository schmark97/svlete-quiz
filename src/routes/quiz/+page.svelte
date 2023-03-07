<script>
    import Question from "../components/quiz/Question.svelte";
    import Answer from "../components/quiz/Answer.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { quizStore } from "../stores/quizstore";
    import { space } from "svelte/internal";

    let currentQuestion = 0;
    export let data;

    let quiz =
        $quizStore.topic === "mix"
            ? data.quiz
            : data.quiz.filter((item) => item.topic === $quizStore.topic);

    onMount(() => {
        $quizStore.score = 0;
        $quizStore.max = quiz.length;
    });

    $: selectedAnswer =
        currentQuestion < quiz.length ? quiz[currentQuestion].answers[0] : "";

    const handleSubmit = () => {
        if (currentQuestion >= quiz.length) {
            return;
        }

        $quizStore.started = true;

        const answers = quiz[currentQuestion].answers;

        if (answers.indexOf(selectedAnswer) == quiz[currentQuestion].correct) {
            $quizStore.score++;
        }

        currentQuestion++;

        if (currentQuestion == quiz.length) {
            goto("/result");
        }
    };

    function handleMessage(event) {
        selectedAnswer = event.detail.answer;
    }
</script>

{#if quiz.length === 0 || $quizStore.topic === ""}
    <div class="flex h-screen">
        <div class="ml-auto mr-auto">
            <div class="alert alert-warning shadow-lg mb-5">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        /></svg
                    >
                    {#if $quizStore.topic === ""}
                        <span>Please select a topic.</span>
                    {:else if quiz.length === 0}
                        <span>No questions in this topic.</span>
                    {:else}
                        <span>Somthing went wrong.</span>
                    {/if}
                </div>
            </div>
            <a href="/" class="btn-outline btn-info btn btn-wide"
                >Choose a topic</a
            >
        </div>
    </div>
{/if}

{#if currentQuestion < quiz.length}
    <Question
        code={quiz[currentQuestion].code}
        questionText={quiz[currentQuestion].question}
    />
    <Answer
        answers={quiz[currentQuestion].answers}
        questionIndex={currentQuestion}
        selectedAnswer={quiz[currentQuestion].answers[0]}
        on:select={handleMessage}
    />
    <div class="mt-5">
        <button class="btn btn-primary btn-wide" on:click={handleSubmit}
            >Submit</button
        >
    </div>
{/if}
