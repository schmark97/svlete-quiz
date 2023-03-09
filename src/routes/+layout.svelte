<script>
    import "../app.css";
    import { auth } from "./lib/firebase";
    import { authStore, authHandlers } from "./stores/authstore";
    import { onMount, onDestroy } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let unsubscribe = false;
    onMount(() => {
        unsubscribe = auth.onAuthStateChanged((user) => {
            authStore.update((curr) => {
                return { ...curr, isLoading: false, currentUser: user };
            });
        });
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    $: currentUrl = $page.url.pathname;

    const handleLogout = () => {
        authHandlers.logout(auth);
        goto("/login");
    };
</script>

<nav class="absolute h-full top-0 left-0 bg-primary">
    <ul class="menu p-2 rounded-bo">
        <li>
            <a
                title="Home"
                class={currentUrl === "/"
                    ? "bg-orange-500"
                    : "hover:bg-green-600"}
                href="/"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    /></svg
                >
            </a>
        </li>

        {#if !$authStore.isLoading && auth.currentUser}
            <li>
                <a
                    title="MyStats"
                    href="/mystats"
                    c
                    class={currentUrl === "/mystats"
                        ? "bg-orange-500"
                        : "hover:bg-green-600"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        /></svg
                    >
                </a>
            </li>

            <li>
                <button
                    title="LogOut"
                    on:click={handleLogout}
                    class="hover:bg-green-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 256 256"
                        xml:space="preserve"
                    >
                        <defs />
                        <g
                            style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                            <path
                                d="M 36.137 34.78 c -9.589 0 -17.39 -7.801 -17.39 -17.39 C 18.747 7.801 26.548 0 36.137 0 s 17.39 7.801 17.39 17.39 C 53.527 26.979 45.726 34.78 36.137 34.78 z M 36.137 7 c -5.729 0 -10.39 4.661 -10.39 10.39 s 4.661 10.39 10.39 10.39 s 10.39 -4.661 10.39 -10.39 S 41.866 7 36.137 7 z"
                                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 11.721 90 c -1.933 0 -3.5 -1.567 -3.5 -3.5 V 61.756 c 0 -11.14 9.063 -20.203 20.203 -20.203 h 15.427 c 6.92 0 13.29 3.505 17.039 9.375 c 1.084 1.698 1.904 3.539 2.438 5.471 c 0.516 1.862 -0.577 3.791 -2.44 4.306 c -1.86 0.519 -3.791 -0.576 -4.306 -2.44 c -0.349 -1.258 -0.884 -2.459 -1.593 -3.568 c -2.456 -3.847 -6.62 -6.143 -11.138 -6.143 H 28.424 c -7.28 0 -13.203 5.923 -13.203 13.203 V 86.5 C 15.221 88.433 13.654 90 11.721 90 z"
                                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 60.554 90 c -1.933 0 -3.5 -1.567 -3.5 -3.5 v -2.236 c 0 -1.933 1.567 -3.5 3.5 -3.5 s 3.5 1.567 3.5 3.5 V 86.5 C 64.054 88.433 62.486 90 60.554 90 z"
                                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 80.754 68.741 l -8.515 -8.515 c -1.367 -1.367 -3.582 -1.367 -4.949 0 c -1.367 1.366 -1.367 3.583 0 4.949 l 2.54 2.54 H 36.137 c -1.933 0 -3.5 1.567 -3.5 3.5 s 1.567 3.5 3.5 3.5 h 33.693 l -2.541 2.541 c -1.367 1.367 -1.367 3.583 0 4.949 c 0.684 0.684 1.579 1.025 2.475 1.025 s 1.792 -0.342 2.475 -1.025 l 8.515 -8.516 C 82.121 72.323 82.121 70.107 80.754 68.741 z"
                                style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                        </g>
                    </svg>
                </button>
            </li>
        {:else}
            <li>
                <a
                    title="Login"
                    class={currentUrl === "/login"
                        ? "bg-orange-500"
                        : "hover:bg-green-600"}
                    href="/login"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 256 256"
                        xml:space="preserve"
                        stroke="white"
                        ill="none"
                    >
                        <defs />
                        <g
                            style=" stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                            <path
                                d="M 36.137 34.78 c -9.589 0 -17.39 -7.801 -17.39 -17.39 C 18.747 7.801 26.548 0 36.137 0 s 17.39 7.801 17.39 17.39 C 53.527 26.979 45.726 34.78 36.137 34.78 z M 36.137 7 c -5.729 0 -10.39 4.661 -10.39 10.39 s 4.661 10.39 10.39 10.39 s 10.39 -4.661 10.39 -10.39 S 41.866 7 36.137 7 z"
                                style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 11.721 90 c -1.933 0 -3.5 -1.567 -3.5 -3.5 V 61.756 c 0 -11.14 9.063 -20.203 20.203 -20.203 h 15.427 c 6.92 0 13.29 3.505 17.039 9.375 c 1.084 1.698 1.904 3.539 2.438 5.471 c 0.516 1.862 -0.577 3.791 -2.44 4.306 c -1.86 0.519 -3.791 -0.576 -4.306 -2.44 c -0.349 -1.258 -0.884 -2.459 -1.593 -3.568 c -2.456 -3.847 -6.62 -6.143 -11.138 -6.143 H 28.424 c -7.28 0 -13.203 5.923 -13.203 13.203 V 86.5 C 15.221 88.433 13.654 90 11.721 90 z"
                                style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 60.554 90 c -1.933 0 -3.5 -1.567 -3.5 -3.5 v -2.236 c 0 -1.933 1.567 -3.5 3.5 -3.5 s 3.5 1.567 3.5 3.5 V 86.5 C 64.054 88.433 62.486 90 60.554 90 z"
                                style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                            <path
                                d="M 33.663 68.741 l 8.515 -8.515 c 1.367 -1.367 3.582 -1.367 4.949 0 c 1.367 1.366 1.367 3.583 0 4.949 l -2.54 2.54 h 33.693 c 1.933 0 3.5 1.567 3.5 3.5 s -1.567 3.5 -3.5 3.5 H 44.586 l 2.541 2.541 c 1.367 1.367 1.367 3.583 0 4.949 c -0.684 0.684 -1.579 1.025 -2.475 1.025 s -1.792 -0.342 -2.475 -1.025 l -8.515 -8.516 C 32.295 72.323 32.295 70.107 33.663 68.741 z"
                                style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                                transform=" matrix(1 0 0 1 0 0) "
                                stroke-linecap="round"
                            />
                        </g>
                    </svg>
                </a>
            </li>
        {/if}
    </ul>
</nav>

<!-- <nav>
    {#if !$authStore.isLoading && auth.currentUser}
        <button on:click={handleLogout}>Log out</button>
    {/if} -->
<!-- </nav> -->

<div class="flex h-screen">
    <div class="m-auto">
        <div class="artboard artboard-horizontal phone-4">
            <slot />
        </div>
    </div>
</div>
