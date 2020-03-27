<template lang="pug">
    v-form(
        ref="form"
        v-model="valid")
        v-row
            v-col(cols="5")
                v-select(
                    v-model="selected"
                    :items="selectModes"
                    :rules="[v => !!v || 'Select is required']"
                    single-line
                    label="Pick game mode"
                    required
                    @change="selectMode")
            v-col(cols="5")
                v-text-field(
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
                    label="Enter your name"
                    required)
            v-col(cols="2")
                v-btn(
                    color="success"
                    :disabled="!valid"
                    @click="validate") Play
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                valid: true,
                selected: null,
            }
        },
        computed: {
            modes() {
                return this.$store.state.modes;
            },
            selectModes() {
                const arr = [];
                for (let mode in this.modes) {
                    arr.push(mode)
                }
                return arr;
            },
            mode: {
                get() {
                    return this.$store.state.mode
                },
                set(newValue) {
                    this.$store.commit('setMode', newValue)
                }
            },
            isPlay: {
                get() {
                    return this.$store.state.isPlay;
                },
                set(newValue) {
                    this.$store.commit('setPlay', newValue)
                }
            },
            name: {
                get(){
                    return this.$store.state.name;
                },
                set(newValue) {
                    this.$store.commit('setName', newValue);
                }
            }
        },
        methods: {
            validate () {
                this.$refs.form.validate();
                if(this.valid) {
                    this.isPlay = true
                }
            },
            selectMode() {
                this.mode = this.modes[this.selected];
            }
        }
    }
</script>
