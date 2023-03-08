<script>
    import { authHandlers } from "../../stores/authstore";
    import { goto } from "$app/navigation";
    let register = false;
    let email = "";
    let password = "";
    let confirmPassword = "";

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password || (register && !confirmPassword)) {
            return;
        }
        if (register && password === confirmPassword) {
            await authHandlers.signup(email, password);
        } else {
            await authHandlers.login(email, password);
        }

        goto("/");
    }
</script>

<div class="container">
    <h1 class="mb-4 text-primary text-center text-5xl font-bold">
        {register ? "Register" : "Log in"}
    </h1>
    <form>
        <div class="mb-4">
            <label>
                <input
                    class="input  input-primary"
                    bind:value={email}
                    type="email"
                    placeholder="Email"
                />
            </label>
        </div>
        <div class="mb-4">
            <label>
                <input
                    class="input  input-primary"
                    bind:value={password}
                    type="password"
                    placeholder="Password"
                />
            </label>
        </div>
        {#if register}
            <div class="mb-4">
                <label>
                    <input
                        class="input  input-primary"
                        bind:value={confirmPassword}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </label>
            </div>
        {/if}
        <button class="btn btn-primary w-full mb-6" on:click={handleSubmit}
            >Submit</button
        >
    </form>
    {#if register}
        <div
            on:click={() => {
                register = false;
            }}
            on:keydown={() => {}}
        >
            Already have an account?
            <p
                class="text-primary font-bold cursor-pointer hover:text-orange-400"
            >
                Log in
            </p>
        </div>
    {:else}
        <div
            on:click={() => {
                register = true;
            }}
            on:keydown={() => {}}
        >
            Don't have an account? <p
                class="text-primary font-bold cursor-pointer hover:text-orange-400"
            >
                Sign Up
            </p>
        </div>
    {/if}
</div>
