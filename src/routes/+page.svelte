<script>
    import { goto } from "$app/navigation";
    import { quizStore } from "./stores/quizstore";

    const setQuizType = (topic = "mix") => {
        $quizStore.topic = topic;
        goto("/quiz");
    };
</script>

<div class="h-full">
    <h1 class="text-primary text-center text-5xl font-bold mb-8">
        Choose a topic
    </h1>
    <div class="text-center">
        <div class="mb-5">
            <button
                on:click={() => setQuizType("php")}
                class="btn btn-wide btn-info">PHP</button
            >
        </div>
        <div class="mb-5">
            <button
                on:click={() => setQuizType("wp")}
                class="btn btn-wide btn-info btn-outline">WORDPRESS</button
            >
        </div>
        <div class="mb-5">
            <button
                on:click={() => setQuizType("js")}
                class="btn btn-warning btn-wide bg-yellow-300"
                >Javascript</button
            >
        </div>
        <div class="mb-5">
            <button
                on:click={() => setQuizType("css")}
                class="btn btn-wide text-white-500   bg-blue-600">CSS</button
            >
        </div>
        <div class="mb-5">
            <button
                on:click={() => setQuizType("mix")}
                class="btn  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 btn-wide "
                >MIX</button
            >
        </div>
    </div>
</div>
