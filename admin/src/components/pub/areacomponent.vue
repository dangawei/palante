<template>
    <Cascader 
    :data="data" 
    v-model="value"
    @on-change="areaselect"
    ></Cascader>
</template>
<script>
    export default {
        data () {
            return {
                value: [],
                data: [
                    {
                        value: 'zhejiang',
                        label: '浙江',
                        children: [
                            {
                                value: 'hangzhou',
                                label: '杭州',
                                children: [
                                    {
                                        value: 'xihu',
                                        label: '西湖',
                                        code: 310000,
                                    },
                                    {
                                        value: 'binjiang',
                                        label: '滨江',
                                        code: 310001,
                                    }
                                ]
                            }
                        ]
                    }, 
                    {
                        value: 'jiangsu',
                        label: '江苏',
                        children: [
                            {
                                value: 'nanjing',
                                label: '南京',
                                children: [
                                    {
                                        value: 'zhonghuamen',
                                        label: '中华门',
                                        code: 210000,
                                    }
                                ]
                            },
                            {
                                value: 'suzhou',
                                label: '苏州',
                                children: [
                                    {
                                        value: 'subei',
                                        label: '苏北',
                                        code: 210001,
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }
        },
        methods:{
            areaselect(val,sel){
                this.$emit("areaselect",sel);
            }
        }
    }
</script>
