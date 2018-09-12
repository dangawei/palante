

<template>

<Modal v-model="modalbool.modalBool" title="提示">
    <p>{{modalbool.modalText}}</p>
</Modal>

</template>

<script>

export default {
    props: [
        'modalbool'
    ],
    data() {
        return {

        }
    },
    methods: {

    }
}

</script>
