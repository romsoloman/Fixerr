<template>
  <div ref="register" class=" register" @click.stop="backToHomePage">
    <section class="register-modal-container">
      <div class="login-signup-container" v-if="!loggedinUser && isMember">
        <h4 class="title">Sign in to fixerr</h4>
        <div class="separator">OR</div>
        <form @submit.prevent="doLogin">
          <input
            type="text"
            v-model="loginCred.username"
            placeholder="Username"
          />
          <input
            type="password"
            v-model="loginCred.password"
            placeholder="Password"
          />
          <button class="fiverr-button">Login</button>
        </form>
        <footer>
          <button>
            Not a member yet?<span @click="toggleIsMemeber"> Join Now</span>
          </button>
        </footer>
      </div>

      <div
        class="login-signup-container"
        v-else-if="!loggedinUser && !isMember"
      >
        <form @submit.prevent="doSignup">
          <h4 class="title">Signup fixerr</h4>
          <div class="separator">OR</div>
          <input
            type="text"
            v-model="signupCred.fullname"
            placeholder="Your full name"
          />
          <input
            type="password"
            v-model="signupCred.password"
            placeholder="Password"
          />
          <input
            type="text"
            v-model="signupCred.username"
            placeholder="Username"
          />
          <button class="fiverr-button">continue</button>
          <p>By joining I agree to receive emails from Fiverr.</p>
        </form>
        <footer>
          <button>
            Already a member? <span @click="toggleIsMemeber"> Sign In </span>
          </button>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "login-signup",
  data() {
    return {
      msg: "",
      loginCred: { username: "", password: "" },
      signupCred: { username: "", password: "", fullname: "" },
      isMember: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.loadUsers();
  },
  methods: {
    toggleIsMemeber() {
      this.isMember = !this.isMember;
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        if (this.$store.getters.getLastPath === "/gig/edit") {
          this.$store.commit({
            type: "updateLastPath",
            path: this.$router.history.current.path,
          });
          return this.$router.push("/gig/edit");
        }
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    backToHomePage(e) {
      if (this.$refs.register === e.target) {
        this.$router.push("/");
      }
      return;
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      if (this.$store.getters.getLastPath === "/gig/edit") {
        this.$store.commit({
          type: "updateLastPath",
          path: this.$router.history.current.path,
        });
        return this.$router.push("/gig/edit");
      }
      this.$router.push("/");
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
  },
  components: {},
};
</script>
