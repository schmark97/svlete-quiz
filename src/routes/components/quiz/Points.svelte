<script>
    export let points;
    export let max;

    let percentage = 0;

    if (points !== 0 && max !== 0) {
        percentage = points / max;
    }
</script>

<h1
    class="{percentage > 0.8
        ? 'text-primary'
        : percentage > 0.5
        ? 'text-warning'
        : 'text-error'} text-center text-3xl font-bold"
>
    {points} / {max}
</h1>
