<template lang="pug">
    v-container
        v-row(justify="center")
            v-col(sm="12" md="8")
                h3(class="headline mb-5") Leader Board
                BoardItem(
                    v-for="item of log"
                    :key="item.id"
                    :item="item"
                    class="mb-1")
</template>

<script>
    import BoardItem from '@/components/BoardItem';

    export default {
        name: "LeaderBoard",
        components: { BoardItem },
        computed: {
            log() {
                const arr = this.$store.state.log;
                return arr.reverse();
            }
        }
    }
</script>

<style scoped>
    .headline {
        color: #898989
    }
</style>