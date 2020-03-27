<template lang="pug">
    .block
        .block__item(
            v-for="(block, index) in blocks"
            :key="index"
            :class="[block['className'] ? block['className'] : '']"
            @click="setWinnerHandler(index)")
</template>

<script>
    export default {
        name: "Game",
        data: () => ({
            blocks: {},
            numbers: [],
            current: 0,
            step: 0
        }),
        computed: {
            isPlay: {
                get() {
                    return this.$store.state.isPlay;
                },
                set(newValue) {
                    this.$store.commit('setPlay', newValue);
                }
            },
            mode() {
                return this.$store.state.mode;
            },
            name(){
                return this.$store.state.name;
            },
            date() {
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                const time = today.getHours() + ":" + today.getMinutes();

                return `${day}/${month}/${year} ${time}`;
            }
        },
        watch: {
            isPlay() {
                if (this.isPlay) {
                    this.updateGame();
                    this.play();
                }
            },
            mode() {
                this.updateGame();
            }
        },
        methods: {
            play() {
                this.current = this.numbers[this.step];

                this.blocks[this.current] = {
                    className: 'info',
                    winner: ''
                };

                if (this.mode.field === (this.step + 1)) {
                    //delay for the last step
                    setTimeout(() => {
                        if(this.blocks[this.current].winner !== 'user' ) {
                            this.setWinner(this.current, 'computer', 'error');
                        }
                        const winner = this.getWinner(this.blocks, this.name);
                        this.addWinnerToLog( winner );
                    }, this.mode.delay);
                } else {
                    this.next(this.current);
                }
            },
            next(current) {
                setTimeout(() => {
                    if(this.blocks[current].winner !== 'user' ) {
                        this.setWinner(current, 'computer', 'error');
                    }
                    this.step += 1;
                    this.play();
                }, this.mode.delay);
            },
            delayForClick(){
                let count = 0;
                const delay = this.mode.delay;
                const counter = setInterval(timer, 100);
                const timer = () => {
                    if (count >= delay) {
                        clearInterval(counter);
                        return false;
                    }
                    count += 100;
                };
                return true;
            },
            setWinnerHandler(index){
                if (Number(index) !== this.current) return;
                if (this.blocks[this.current].winner) return;
                if (this.delayForClick()) {
                    this.setWinner(this.current, 'user', 'success');
                }
            },
            setWinner(current, winner, color) {
                this.blocks[current].winner = winner;
                this.blocks[current].className = color;
            },
            getWinner(blocks, name) {
                let user = 0;
                let cpu = 0;
                for(let block in blocks) {
                    const item = blocks[ block ];
                    if(typeof item === 'object') {
                        item.winner === 'user' ? user += 1 : cpu += 1;
                    }
                }
                return user > cpu ? name : 'computer';
            },
            addWinnerToLog(winner) {
                this.$store.commit('addWinnerToLog', {
                    id: Math.random(),
                    winner: winner,
                    date: this.date
                });
            },
            generateNumbers(length) {
                const numbers = [];
                for (let i = 0; i <= length - 1; i++) {
                    const randomNumber = () => {
                        const item = Math.floor(Math.random() * 24);
                        if (numbers.indexOf(item) === -1) {
                            numbers.push(item)
                        } else {
                            randomNumber();
                        }
                    };
                    randomNumber();
                }
                return numbers;
            },
            newBlocks(){
                let blocks = {};
                for (let i = 0; i <= 24; i++) {
                    blocks[i] = i;
                }
                return blocks;
            },
            updateGame(){
                this.isPlay = false;
                this.blocks = this.newBlocks();
                this.numbers = this.generateNumbers(this.mode.field);
                this.step = 0;
            }
        },
        created(){
            this.blocks = this.newBlocks();
        }
    }
</script>

<style lang="scss" scoped>
    .block {
        display: flex;
        flex-wrap: wrap;
        width: 300px;
        height: 300px;
        border: 1px solid #ddd;

        &__item {
            width: 20%;
            height: 20%;
            border: 1px solid #ddd;
            cursor: pointer;

            &.info {
                border-color: #ddd!important;
            }
            &.success {
                border-color: #ddd!important;
            }
            &.error {
                border-color: #ddd!important;
            }
        }
    }
</style>