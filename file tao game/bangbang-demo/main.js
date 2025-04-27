let tank;
let cursors;
let power = 300; // lực bắn mặc định
let angle = 45;  // góc mặc định

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('tank', 'assets/tank.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
}

function create() {
    // Tạo nền
    const ground = this.physics.add.staticGroup();
    ground.create(400, 580, 'ground').setScale(2).refreshBody();

    // Xe tăng
    tank = this.physics.add.sprite(100, 500, 'tank');
    tank.setCollideWorldBounds(true);
    this.physics.add.collider(tank, ground);

    // Phím điều khiển
    cursors = this.input.keyboard.createCursorKeys();

    // Bắn đạn
    this.input.keyboard.on('keydown-SPACE', () => {
        shootBullet.call(this);
    });

    // Điều chỉnh góc
    this.input.keyboard.on('keydown-UP', () => { angle += 2; });
    this.input.keyboard.on('keydown-DOWN', () => { angle -= 2; });
}

function update() {
    if (cursors.left.isDown) {
        tank.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        tank.setVelocityX(160);
    } else {
        tank.setVelocityX(0);
    }
}

function shootBullet() {
    const bullet = this.physics.add.image(tank.x + 40, tank.y - 20, 'bullet');
    bullet.setCollideWorldBounds(true);
    bullet.setBounce(0.6);

    // Tính góc thành radian
    const rad = Phaser.Math.DegToRad(angle);
    const vx = Math.cos(rad) * power;
    const vy = Math.sin(rad) * -power;
    bullet.setVelocity(vx, vy);
}
