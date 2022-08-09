
new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.log= []
        },
        attack(especial) {
            this.hurt('monsterLife', 7, 12, especial, 'Jogador', 'monstro', 'player')
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 5, 10, false, 'Monstro', 'Jogador', 'monster')
            }

        },
        hurt(atr, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0;
            const hurt = this.getRadom(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLogs(`${source} atingiu ${target}  com ${hurt}`,cls)
        },
        getRadom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false,'Monstro', 'Jogador', 'monster')
        },
        heal(min, max) {
            const heal = this.getRadom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLogs(`O jogador ganhou força de ${heal}.`,'player')

        },
        registerLogs(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }

    }

})