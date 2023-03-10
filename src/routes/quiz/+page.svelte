<script>
    import Question from "../components/quiz/Question.svelte";
    import Answer from "../components/quiz/Answer.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { quizStore } from "../stores/quizstore";
    import { db, auth } from "../lib/firebase.js";
    import { doc, updateDoc, getDoc } from "firebase/firestore";

    export let data;
    let currentQuestion = 0;
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

    const addUserData = async (percentage, topic) => {
        const user = auth.currentUser;

        if (!user) {
            return;
        }

        let userData = false;

        const docRef = doc(db, "users", user.uid);

        try {
            const docSnap = await getDoc(docRef);
            userData = docSnap.data();
        } catch (error) {
            console.log(error);
            return;
        }

        if (!userData) {
            return;
        }

        userData.gamesPlayed[topic] += 1;
        userData.averageScore[topic] += percentage;

        try {
            await updateDoc(docRef, userData);
        } catch (err) {
            console.log(err);
        }
    };

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
            let percentage = 0;
            const max = $quizStore.max;
            const points = $quizStore.score;

            if (points !== 0 && max !== 0) {
                percentage = points / max;
            }

            addUserData(percentage, $quizStore.topic);

            const param = percentage > 0.8 ? "c" : percentage > 0.5 ? "n" : "t";

            goto(`/result?g=${param}`);
        }
    };

    function handleSelect(event) {
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
        on:select={handleSelect}
    />
    <div class="mt-5">
        <button class="btn btn-primary btn-wide" on:click={handleSubmit}
            >Submit</button
        >
    </div>
{/if}
