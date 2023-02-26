<script>
    import Question from "./Question.svelte";
    import Answer from "./Answer.svelte";
    import Points from "./Points.svelte";
    import { onDestroy, onMount } from "svelte";
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, onSnapshot } from "firebase/firestore";

    const db = getFirestore();
    const colRef = collection(db, "quiz");
    let currentQuestion = 0;
    let points = 0;
    let quiz = [];
    $: max = quiz.length;
    $: selectedAnswer =
        currentQuestion < quiz.length ? quiz[currentQuestion].answers[0] : "";

    onMount(() => {
        const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                quiz = [doc.data(), ...quiz];
            });
        });
    });

    // onDestroy(() => {
    //     if (unsubscribe) unsubscribe();
    // });

    const handleSubmit = () => {
        if (currentQuestion >= quiz.length) {
            return;
        }

        const answers = quiz[currentQuestion].answers;

        if (answers.indexOf(selectedAnswer) == quiz[currentQuestion].correct) {
            points++;
        }

        currentQuestion++;
    };

    function handleMessage(event) {
        selectedAnswer = event.detail.answer;
    }
</script>

<main />

{#if currentQuestion < quiz.length}
    <Question questionText={quiz[currentQuestion].question} />
    <Answer
        answers={quiz[currentQuestion].answers}
        questionIndex={currentQuestion}
        selectedAnswer={quiz[currentQuestion].answers[0]}
        on:select={handleMessage}
    />
    <div style="margin-top:20px">
        <button on:click={handleSubmit}>Submit</button>
    </div>
{:else if quiz.length}
    <Points {points} {max} />
{/if}

<style>
</style>
