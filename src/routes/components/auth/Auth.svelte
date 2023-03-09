<script>
    import { authHandlers } from "../../stores/authstore";
    import { goto } from "$app/navigation";
    import { db, auth } from "../../lib/firebase.js";

    import { doc, setDoc } from "firebase/firestore";

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

            const user = auth.currentUser;

            if (!user) {
                console.log("Something went wrong");
                return;
            }

            const docRef = doc(db, "users", user.uid);

            try {
                await setDoc(docRef, {
                    gamesPlayed: { css: 0, js: 0, php: 0, wp: 0, mix: 0 },
                    averageScore: { css: 0, js: 0, php: 0, wp: 0, mix: 0 },
                });
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
