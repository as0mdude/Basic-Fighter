class Fighter extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>fighter.js<br>fighter</h2>'
    }

    create() {
        this.player1 = this.add.graphics();

        // Set the fill style of the rectangle
        this.player1.fillStyle(0xFF0000); // Red color
    
        // Draw the rectangle
        this.player1.fillRect(0, 0, 50, 120); // x, y, width, height
        this.player1.y = 470;
        this.player1.x = 100;

        this.player2 = this.add.graphics();

        // Set the fill style of the rectangle
        this.player2.fillStyle(0x0000FF); // Blue color
    
        // Draw the rectangle
        this.player2.fillRect(0, 0, 50, 120); // x, y, width, height
        this.player2.y = 470;
        this.player2.x = 600;

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN
        });


        console.log("test");
    }

    update() {
        if (this.collides(this.player1, this.player2)){
            console.log("Collides");
        }
        
        if (this.input.keyboard.addKey('A').isDown) {
            this.player1.x -= 2.5;
        }

        if (this.input.keyboard.addKey('D').isDown) {
            this.player1.x += 2.5;
        }

        if (this.cursors.left.isDown) {
            this.player2.x -= 2.5;
        }
    
        if (this.cursors.right.isDown) {
            this.player2.x += 2.5;
        }
    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }


    
}


/**if (this.input.keyboard.addKey('D').isDown) {
            if(this.player1.x != this.player2.x-50){
                this.player1.x += 2.5;
            }
            this.player1.x += 2.5;
            
        }

        if (this.cursors.left.isDown) {
            if(this.player2.x != this.player1.x+50){
                this.player2.x -= 2.5;
            }
            this.player2.x -= 2.5;
        } **/