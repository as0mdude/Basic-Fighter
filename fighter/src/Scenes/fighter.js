class Fighter extends Phaser.Scene {
    constructor() {
        super("FighterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>fighter.js<br>fighter</h2>'
    }

    create() {
        this.player1 = new Phaser.Geom.Rectangle(100, 480, 50, 120);
        this.player1Graphics = this.add.graphics();

        // Set the fill style of the rectangle
        this.player1Graphics.fillStyle(0xFF0000); // Red color
    
        // Draw the rectangle
        this.player1Graphics.fillRectShape(this.player1);

        this.player2 = new Phaser.Geom.Rectangle(600, 480, 50, 120);
        this.player2Graphics = this.add.graphics();

        // Set the fill style of the rectangle
        this.player2Graphics.fillStyle(0x0000FF); // Blue color
    
        // Draw the rectangle
        this.player2Graphics.fillRectShape(this.player2);

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN
        });

        this.player1crouch = false;
        this.player2crouch = false;

        console.log("test");
    }

    update() {

        if (this.collides(this.player1, this.player2)) {
            console.log("Collides");
        }
        

        if (this.input.keyboard.addKey('A').isDown ) {

            this.player1.x -= 2.5;
            this.player1Graphics.clear();
            this.player1Graphics.fillStyle(0xFF0000); // Red color
            this.player1Graphics.fillRectShape(this.player1);
        }
    
        if (this.input.keyboard.addKey('D').isDown && !this.collides(this.player1, this.player2)) {
            this.player1.x += 2.5;
            this.player1Graphics.clear();
            this.player1Graphics.fillStyle(0xFF0000); // Red color
            this.player1Graphics.fillRectShape(this.player1);
        }

        if (this.input.keyboard.addKey('S').isDown && !this.player1crouch) {
            this.player1.height /= 2;
            this.player1.y += 60
            this.player1crouch = true;
            this.player1Graphics.clear();
            this.player1Graphics.fillStyle(0xFF0000); // Red color
            this.player1Graphics.fillRectShape(this.player1);
        } else if (!this.input.keyboard.addKey('S').isDown && this.player1crouch) {
            this.player1.height *= 2;
            this.player1.y -= 60
            this.player1crouch = false;
            this.player1Graphics.clear();
            this.player1Graphics.fillStyle(0xFF0000); // Red color
            this.player1Graphics.fillRectShape(this.player1);
        }

        
    
        if (this.cursors.left.isDown && !(this.collides(this.player1, this.player2))) {
            this.player2.x -= 2.5;
            this.player2Graphics.clear();
            this.player2Graphics.fillStyle(0x0000FF); // Blue color
            this.player2Graphics.fillRectShape(this.player2);
        }
    
        if (this.cursors.right.isDown) {
            this.player2.x += 2.5;
            this.player2Graphics.clear();
            this.player2Graphics.fillStyle(0x0000FF); // Blue color
            this.player2Graphics.fillRectShape(this.player2);
        }

        if (this.cursors.down.isDown && !this.player2crouch) {
            this.player2.height /= 2;
            this.player2.y += 60
            this.player2crouch = true;
            this.player2Graphics.clear();
            this.player2Graphics.fillStyle(0x0000FF); // Blue color
            this.player2Graphics.fillRectShape(this.player2);
        } else if (!this.cursors.down.isDown && this.player2crouch) {
            this.player2.height *= 2;
            this.player2.y -= 60
            this.player2crouch = false;
            this.player2Graphics.clear();
            this.player2Graphics.fillStyle(0x0000FF); // Blue color
            this.player2Graphics.fillRectShape(this.player2);
        }

        //console.log(this.player2.height)
    }

    

    collides(a, b) {

        
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
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