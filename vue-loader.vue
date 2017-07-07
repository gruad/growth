<style>
    .my-component h1 {
        color: red;
    }
</style>

<template>
    <div class="my-component">
        <h2>Hello form {{msg}}</h2>
        <other-component></other-component>
    </div>
</template>

<script>
    // 遵循CommonJs规范
    var otherComponent = require('./other-component')
    // 导出组件定义
    module.exports = {
        data: function () {
            return {
                msg: 'vue'
            }
        },
        components: {
            'other-component': otherComponent
        }

    }
</script>