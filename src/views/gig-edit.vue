    title: '',
    about: '',
    tags: [],
    imgsUrls: [],
    price: 0,
<template>
  <section class="gig-edit-container container">
    <div class="edit-title">
      <h4>Add title</h4>
      <textarea class="edit-inputs" name="title" id="" cols="30" rows="1" placeholder="Add title..." v-model="gigToEdit.title"></textarea>
    </div>
    <div class="edit-aboat">
      <h4>Add about</h4>
      <textarea class="edit-inputs" name="about" id="" cols="30" rows="5" placeholder="Enter gig about..." v-model="gigToEdit.about"></textarea>
    </div>
    <div class="edit-tags">
      <h4>Add tags</h4>
      <input class="edit-inputs" type="text" placeholder="Add tags..." v-model="gigToEdit.tags" >
    </div>
    <div class="edit-imgs">
      <h4>Add imgs</h4>
      <input placeholder="Add img url..." class="edit-inputs" type="text" v-model="gigToEdit.imgsUrls" >
      <input placeholder="Add img url..." class="edit-inputs" type="text" v-model="gigToEdit.imgsUrls" >
      <input placeholder="Add img url..." class="edit-inputs" type="text" v-model="gigToEdit.imgsUrls" >
      <input placeholder="Add img url..." class="edit-inputs" type="text" v-model="gigToEdit.imgsUrls" >
    </div>
    <div class="edit-price">
      <h4>Add price</h4>
      <input class="edit-inputs" type="number" v-model="gigToEdit.price" placeholder="Add price...">
    </div>
    <div class="edit-delivery-time">
      <input class="edit-inputs" type="number" v-model="gigToEdit.deliveryTime" placeholder="Add delivery time...">
    </div>
    <button class="edit-save fiverr-button" @click="saveGig" >SAVE</button>
  </section>

</template>

<script>
import { gigService } from '../services/gig.service.js'
export default {
 data() {
        return {
            gigToEdit: gigService.getEmptyGig(),
        }
  },
  methods:{
    saveGig() {
      if(!this.$store.getters.loggedinUser){
        // console.log('this.$router.history.current.path', this.$router.history.current.path);
        this.$store.commit({ type: 'updateLastPath', path: this.$router.history.current.path })
        this.$store.commit({ type: 'keepEditChanges', newEditChanges: this.gigToEdit})
        return this.$router.push('/login')
      }
        const gigToSave = JSON.parse(JSON.stringify(this.gigToEdit));
        this.$store.dispatch({ type: 'saveGigs', gig: gigToSave }).then(() => {
            this.gigToEdit = gigService.getEmptyGig()
        })
    },
  },
  components: {
  },
  created(){
    console.log('this.$store.getters.getEditChanges', this.$store.getters.getEditChanges);
    if(this.$store.getters.getLastPath === '/login'){
      this.gigToEdit = this.$store.getters.getEditChanges;
    }
  }
};
</script>

<style>
</style>
