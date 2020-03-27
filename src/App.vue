<template lang="pug">
    v-app
        v-content
            v-container
                v-row
                    v-col(xs="12" sm="12" md="6")
                        v-row
                            v-col
                                Nav
                        v-row
                            v-col(class="d-flex justify-center")
                                Game

                    v-col(xs="12" sm="12" md="6")
                        Board
</template>

<script>
    import Nav from './components/Nav'
    import Game from './components/Game'
    import Board from './components/Board'

    export default {
        name: 'App',
        components: {
            Nav,
            Game,
            Board
        }
    };
</script>
