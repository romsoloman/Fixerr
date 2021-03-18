<template>
  <div class="container about">
    <p>{{ msg }}</p>
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.username }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else-if="!loggedinUser && isMember">
      <h2>Login</h2>
      <form @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        />
        <button>Login</button>
        <button @click="toggleIsMemeber">Not a member yet? Join Now</button>
      </form>
    </div>

    <div v-else-if="!loggedinUser && !isMember">
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password"
        />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username"
        />
        <button>Signup</button>
        <button @click="toggleIsMemeber">Already a member? Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-signup",
  data() {
    return {
      msg: "",
      loginCred: {username: '', password: ''},
      signupCred: {username: '', password: '', fullname: ''},
      isMember:false,

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
    this.loadUsers()
    console.log('this.$store.getters.getLastPath',this.$store.getters.getLastPath );
  },
  methods: {
    toggleIsMemeber(){
      this.isMember = !this.isMember;
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password"
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        if(this.$store.getters.getLastPath === '/gig/edit'){
          this.$store.commit({ type: 'updateLastPath', path: this.$router.history.current.path })
          return this.$router.push('/gig/edit')
        }
        this.$router.push('/')
      } catch(err) {
          console.log(err)
          this.msg = "Failed to login"
      }
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = "Please fill up the form"
        return
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      if(this.$store.getters.getLastPath === '/gig/edit'){
        this.$store.commit({ type: 'updateLastPath', path: this.$router.history.current.path })
        return this.$router.push('/gig/edit')
      }
      this.$router.push('/')
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    // async removeUser(userId) {
    //   try {
    //     await this.$store.dispatch({ type: "removeUser", userId })
    //     this.msg = 'User removed'
    //   } catch(err) {
    //     this.msg = 'Failed to remove user'
    //   }
    // }
  }
};
</script>
