<script>
    export let questionText;
    export let code;
</script>

<h1 class="text-5xl mb-8 font-bold">{questionText}</h1>

{#if code}
    <div class="mb-5 p-4 bg-info-content">
        {code}
    </div>
{/if}
