<template>
  <div>
    <div>
      <label class="inputBtn" :for="id">
        <a-icon type="upload" />Select Pic
        <input
          :id="id"
          style="display: none;"
          type="file"
          ref="imgRef"
          :files="files"
          :fromData="formData"
          @input="handleInput"
          :multiple="multe"
        />
      </label>
    </div>
    <div class="preVieBox">
      <template v-if="isShowPropImg">
        <img :src="baseUrl + item" v-for="(item, index) of images" :key="index" />
      </template>
      <template v-else>
        <img :src="getFileURL(item)" v-for="(item, index) of files" :key="index" />
      </template>
    </div>
  </div>
</template>

<script>
import { getFileURL } from "../../utils/getFileURL";
export default {
  model: {
    prop: "formData",
    event: "input"
  },
  props: {
    id: {
      type: String
    },
    multe: {
      type: Boolean,
      default() {
        return false;
      }
    },
    formData: {
      type: FormData
    },
    fileName: {
      type: String
    },
    images: {
      type: Array,
      default() {
        return [];
      }
    },
    baseUrl: {
        type: String,
        default(){
            return ''
        }
    }
  },
  data() {
    return {
      files: [],
      timer: 0
    };
  },
  computed: {
    isShowPropImg() {
      return this.timer === 0 && this.images.length !== 0
    }
  },
  methods: {
    handleInput() {
      this.files = [...this.$refs.imgRef.files];
      this.files.forEach(item => {
        this.formData.append(this.fileName, item);
      });
      this.timer++;
    },
    mylabelclick() {
      this.$refs.myLabel.click();
    },
    getFileURL
  }
};
</script>

<style scoped>
.preVieBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}
.preVieBox > img {
  margin-right: 8px;
  height: 100px;
  width: 150px;
  display: block;
}
.inputBtn {
  display: block;
  width: 90px;
  height: 30px;
  border-radius: 5px;
  border: 1px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s;
}
.inputBtn:hover {
  color: red;
}
</style>