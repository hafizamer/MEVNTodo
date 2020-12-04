<template>
  <div id="app">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" v-model="description" type="text" placeholder="Enter here" />
      </div>

      <div class="control">
        <a class="button is-info" @click="addItem" :disabled="!description">Add</a>
      </div>
    </div>

    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">

        <input class="column input" v-if="isSelected(item)" v-model="editedDescription" />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ item.description }}
        </p>
        
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
          </span>

          <span
            class="icon has-text-info"
            @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
          >
            <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data(){
    return{
      items:[],
      description:"",
      editedDescription:"",
      selected:{}
    }
  }, 
  async mounted(){
    const response=await axios.get("api/TodoList");
    this.items=response.data;
  },
  methods:{
    async addItem(){
      const response =await axios.post('api/TodoList/',{description: this.description})
      this.items.push(response.data)
      this.description=""
    },
    async removeItem(item, i){
      await axios.delete("api/TodoList/"+item._id)
      this.items.splice(i,1)
    },
    select(item){
      this.selected=item;
      this.editedDescription=item.description;
    },
    isSelected(item){
      return item._id===this.selected._id;

    },
    unselect(){
      this.selected={};
      this.editedDescription="";
    },
    async updateItem(item, i){
      const response=await axios.put("api/TodoList/"+item._id,{
        description: this.editedDescription
      })
      this.items[i]=response.data;
      this.unselect()
    }

  }

}
</script>


<style>
#app{
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}

.icon{
  cursor: pointer;
}

</style>
