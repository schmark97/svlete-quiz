<script>
    import Question from "./components/quiz/Question.svelte";
    import Answer from "./components/quiz/Answer.svelte";
    import { onDestroy, onMount } from "svelte";
    import { onSnapshot } from "firebase/firestore";
    import { colRef } from "./lib/firebase.js";
    import { goto } from "$app/navigation";
    import { quizStore } from "./stores/quizstore";

    let currentQuestion = 0;
    let quiz = [];

    $: selectedAnswer =
        currentQuestion < quiz.length ? quiz[currentQuestion].answers[0] : "";

    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            quiz = [doc.data(), ...quiz];
        });

        $quizStore.max = quiz.length;
    });

    onMount(() => {
        $quizStore.score = 0;
        $quizStore.max = 0;
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

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

<main />

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
