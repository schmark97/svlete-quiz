<script>
    import { authHandlers, authStore } from "../stores/authStore";
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
            try {
                await authHandlers.signup(email, password);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await authHandlers.login(email, password);
            } catch (err) {
                console.log(err);
            }
        }
    }
</script>

<div class="container">
    <h1>{register ? "Register" : "Log in"}</h1>
    <form>
        <label>
            <input bind:value={email} type="email" placeholder="Email" />
        </label>
        <label>
            <input
                bind:value={password}
                type="password"
                placeholder="Password"
            />
        </label>
        {#if register}
            <label>
                <input
                    bind:value={confirmPassword}
                    type="password"
                    placeholder="Confirm Password"
                />
            </label>
        {/if}
        <button on:click={handleSubmit}>Submit</button>
    </form>
    {#if register}
        <div
            on:click={() => {
                register = false;
            }}
            on:keydown={() => {}}
        >
            Already have an account?
            <p>Log in</p>
        </div>
    {:else}
        <div
            on:click={() => {
                register = true;
            }}
            on:keydown={() => {}}
        >
            Don't have an account? <p>Sign Up</p>
        </div>
    {/if}
</div>
