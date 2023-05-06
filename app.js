function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			round: 0,
			winner: null,
			addBattleLogs: [],
		};
	},
	computed: {
		monsterBarStyles() {
			if (this.monsterHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.monsterHealth + '%' };
		},
		playerBarStyles() {
			if (this.playerHealth < 0) {
				return { width: '0%' };
			}
			return { width: this.playerHealth + '%' };
		},
		enableSpecialAttack() {
			return this.round % 3 !== 0;
		},
		enableHeal() {
			return this.round % 4 !== 0;
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = 'draw';
			} else if (value <= 0) {
				this.winner = 'monster';
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = 'draw';
			} else if (value <= 0) {
				this.winner = 'player';
			}
		},
	},
	methods: {
		attackMonster() {
			this.round++;
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.addBattleLog('player', 'attack', attackValue);
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
			this.addBattleLog('monster', 'attack', attackValue);
		},
		specialAttack() {
			this.round++;
			const attackValue = getRandomValue(12, 30);
			this.monsterHealth -= attackValue;
			this.addBattleLog('player', 'special', attackValue);
			this.attackPlayer();
		},
		addHealth() {
			this.round++;
			const healValue = getRandomValue(12, 30);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
			this.addBattleLog('player', 'heal', healVallue);
			this.attackPlayer();
		},
		resetGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.round = 100;
			this.winner = null;
			this.addBattleLogs = [];
		},
		surrender() {
			this.winner = 'monster';
		},
		addBattleLog(who, what, value) {
			this.addBattleLogs.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			});
		},
	},
});

app.mount('#game');
