<template lang="pug">
    .board__item
        .subtitle-1 {{item.winner}}
        .subtitle-1 {{item.date}}
</template>

<script>
    export default {
        name: "CardItem",
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .board {
        &__item {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            background-color: #cfd8dc;

            .subtitle-1 {
                font-size: 18px;
                color: #626a6d;
            }
        }
    }
</style>