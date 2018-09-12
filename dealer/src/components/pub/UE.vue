<template>
    <div>
      <quill-editor v-model="content"
            class="editer"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            style="background:#fff"
           >
      </quill-editor>
   </div>
</template>
<style scoped="" lang="less">
  .quill-editor {
    height: 745px;
    background: #fff;
    .ql-container {
       background: #fff!important;
    }
  }
</style>
<script>
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
        data () {
            return {
              content:"",
              editorOption:{}
            }
        },
        components: {
           quillEditor
        },
        computed: {
           editor() {
             return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorBlur(quill) {
              console.log('editor blur!', quill)
              this.$emit('UE_data',quill)
            },
            onEditorFocus(quill) {
              console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
              console.log('editor ready!', quill)
            },
            onEditorChange({ quill, html, text }) {
              console.log('editor change!', quill, html, text)
              this.content = html
            }
        }
    }
</script>
