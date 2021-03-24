<template>
  <section class="chat-container">
    <button class="toggle-chat" @click="onToggleChat()">Chat</button>
    <div v-if="toggleChat" class="chat">
        <h1>About Us</h1>
        <p>We like You</p>
        <h2>Lets Chat About {{topic}}</h2>
        <ul>
          <li v-for="(msg, idx) in msgs" :key="idx">
            {{msg.txt}}
          </li>
        </ul>
        <form @submit.prevent="sendMsg">
          <input type="text" v-model="msg.txt" />
          <button>Send</button>
        </form>
    </div>
  </section>
</template>
<script>
    import {socketService} from '../services/socket.service.js';
  export default {
    props:{
      toyId: String
    },
    data(){
      return{
        toggleChat:false,
         msg: {from: 'Me', txt: ''},
        msgs: [],
        topic : null
      }
    },
    created() {
    const toyId = this.$route.params.toyId;
    this.topic = toyId;
    console.log('this.topic',this.topic );
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
      console.log('this.msgs', this.msgs);
    },
    sendMsg() {
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      this.msg = {from: 'Me', txt: ''};
    },
    onToggleChat() {
        console.log('hiiii');
        this.toggleChat = !this.toggleChat;
      },
  },
  components:{
    socketService
  }
}
</script>
