<script>
    export let questionText;
    export let code;
    import hljs from "highlight.js";
</script>

<h1 class="text-5xl mb-8 font-bold">{questionText}</h1>

{#if code}
    <div class="mb-5 p-4 bg-info-content">
        {@html hljs.highlightAuto(code).value}
    </div>
{/if}
