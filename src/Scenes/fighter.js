class Fighter extends Phaser.Scene {
    constructor() {
        super("FighterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Player 1 controls: (A) to move left, (D) to move right, (S) to crouch, (E) to punch, (E) and (S) to kick<br>Player 2 controls: (left arrow) to move left, (right arrow) to move right, (down arrow) to crouch, (P) to punch, (P) and (down arrow) to kick</h2>'
    }

    create() {


        this.player1HealthBar = this.add.rectangle(180, 30, 350, 30, 0xFF0000);
        this.player2HealthBar = this.add.rectangle(620, 30, 350, 30, 0x0000FF);


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

        this.player2punch = new Phaser.Geom.Rectangle(1000, 1000, 0, 0);
        this.player2punchGraphics = this.add.graphics();

        // Set the fill style of the rectangle
        this.player2punchGraphics.fillStyle(0x0000ff); // Red color

        this.player1punch = new Phaser.Geom.Rectangle(1000, 1000, 0, 0);
        this.player1punchGraphics = this.add.graphics();

        // Set the fill style of the rectangle
        this.player1punchGraphics.fillStyle(0xFF0000); // Red color


        

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN
        });

        this.player1punchactive = false;
        this.player1punchtimer = 0;
        this.player1punchcooldown = 100;

        

        this.player2punchactive = false;
        this.player2punchtimer = 0;
        this.player2punchcooldown = 100;


        this.player1kickactive = false;
        this.player1kicktimer = 0;
        this.player1kickcooldown = 100;

        this.player2kickactive = false;
        this.player2kicktimer = 0;
        this.player2kickcooldown = 100;



        this.player1crouch = false;
        this.player2crouch = false;

        this.player1health = 100;
        this.player2health = 100;

        console.log("test");


        this.titleText = this.add.text(80, 250, 'Basic Fighter Test \nby Vincent Fu \n \nPress "V" to start the game.', {
            fontSize: '30px',
            fill: '#FF0000',
            fontFamily: "Arial"
        })

        this.initialpause = true;

        this.endText = this.add.text(75, 250, 'Game over! \n Press "R" to restart the game. \n Game was designed and programmed by Vincent Fu \n for CMPM-120', {
            fontSize: '30px',
            fill: '#FF0000',
            fontFamily: "Arial"
        })

        this.endText.visible = false;

        
        

        

        

        

        
    }

    update() {

        
        

        if (this.input.keyboard.addKey('V').isDown){
            game.loop.wake()
            this.initialpause = false;
            this.titleText.visible = false;

        }

        

        if(this.collides(this.player1punch, this.player2) && this.player2health!=0){
            this.player2health-=1;
            this.player2HealthBar.width = (this.player2health / 100) * 350;

            console.log("player2punch collides");
        }

        if(this.collides(this.player1, this.player2punch) && this.player1health!=0){
            this.player1health-=1;
            this.player1HealthBar.width = (this.player1health / 100) * 350;

            console.log("player2punch collides");

        }

        

        if(this.player1health <= 0 || this.player2health <= 0){

            this.endText.visible = true;

            if(this.input.keyboard.addKey('R').isDown) {
                        this.scene.restart();
            }
        }

        
        

        if (this.input.keyboard.addKey('E').isDown && this.player1punchactive === false && this.player1punchcooldown==100 && this.player1crouch == false) {
            // Trigger punch action only if it's not already active
            this.player1punchactive = true;
        }else if(this.input.keyboard.addKey('E').isDown && this.input.keyboard.addKey('S').isDown && this.player1crouch == true && this.player1kickactive == false && this.player1kickcooldown==100){
            this.player1kickactive = true;
            
        }

        if(this.player1punchcooldown != 100){
            this.player1punchcooldown+=5;
        }

        if(this.player1kickcooldown != 100){
            this.player1kickcooldown+=5
        }

        if (this.player1kickactive == true && this.player1crouch) {
            this.player1punch.x = this.player1.x;
            this.player1punch.y = this.player1.y;
            this.player1punch.height = this.player1.height;

            if (this.player1kicktimer <= 20) {
                this.player1punchGraphics.clear();
                this.player1punch.width = 4.5 * this.player1kicktimer;
                this.player1punchGraphics.fillStyle(0xFF0000); // Red color
                this.player1punchGraphics.fillRectShape(this.player1punch);
                this.player1kicktimer += 1;
            } else {
                this.player1punch.x = 1000;
                this.player1punch.y = 1000;
                this.player1punchGraphics.clear();
                this.player1kickactive = false;
                this.player1kicktimer = 0;
                this.player1kickcooldown = 0; // Reset kick cooldown
            }
        }



        
        if (this.player1punchactive && this.player1crouch == false) {
            // Execute punch action if active
            this.player1punch.x = this.player1.x;
            this.player1punch.y = this.player1.y;
            this.player1punch.height = this.player1.height / 3;
            
            if (this.player1punchtimer <= 20) {
                // Control the punch animation for a certain duration
                this.player1punchGraphics.clear();
                this.player1punch.width = 7 * this.player1punchtimer; // Fixed a missing 'this'
                this.player1punchGraphics.fillStyle(0xFF0000); // Red color
                this.player1punchGraphics.fillRectShape(this.player1punch);
                this.player1punchtimer += 1;
            } else {
                this.player1punch.x = 1000;
                this.player1punch.y = 1000;
                // End punch animation
                this.player1punchGraphics.clear();
                this.player1punchactive = false; // Reset punch activation
                this.player1punchtimer = 0; // Reset punch timer
                this.player1punchcooldown = 0;
            }
        }


        //player2 punch code

        if (this.input.keyboard.addKey('P').isDown && this.player2punchactive === false && this.player2punchcooldown == 100 && this.player2crouch == false) {
            // Trigger punch action only if it's not already active
            this.player2punchactive = true;
        }else if(this.input.keyboard.addKey('P').isDown && this.cursors.down.isDown && this.player2crouch == true  && this.player2kickactive == false && this.player2kickcooldown == 100 ){
            this.player2kickactive = true;
        }
        
        if(this.player2punchcooldown != 100){
            this.player2punchcooldown+=5;
        }

        if (this.player2kickcooldown != 100) {
            this.player2kickcooldown += 5; // Increment kick cooldown
        }

        if (this.player2kickactive == true && this.player2crouch) {
            this.player2punch.x = this.player2.x + this.player2.width;
            this.player2punch.y = this.player2.y;
            this.player2punch.height = this.player2.height;

            if (this.player2kicktimer <= 20) {
                this.player2punchGraphics.clear();
                this.player2punch.width = -4.5 * this.player2kicktimer;
                this.player2punchGraphics.fillStyle(0x0000FF); // Blue color
                this.player2punchGraphics.fillRectShape(this.player2punch);
                this.player2kicktimer += 1;
            } else {
                this.player2punch.x = 1000;
                this.player2punch.y = 1000;
                this.player2punchGraphics.clear();
                this.player2kickactive = false;
                this.player2kicktimer = 0;
                this.player2kickcooldown = 0; // Reset kick cooldown
            }
        }
        
        if (this.player2punchactive && this.player2crouch == false) {
            // Execute punch action if active
            this.player2punch.x = this.player2.x + this.player2.width;
            this.player2punch.y = this.player2.y;
            this.player2punch.height = this.player2.height / 3;
            
            if (this.player2punchtimer <= 20) {
                // Control the punch animation for a certain duration
                this.player2punchGraphics.clear();
                this.player2punch.width = -(7 * this.player2punchtimer); // Fixed a missing 'this'
                this.player2punchGraphics.fillStyle(0x0000ff); // Red color
                this.player2punchGraphics.fillRectShape(this.player2punch);
                this.player2punchtimer += 1;
            } else {
                this.player2punch.x = 1000;
                this.player2punch.y = 1000;
                // End punch animation
                this.player2punchGraphics.clear();
                this.player2punchactive = false; // Reset punch activation
                this.player2punchtimer = 0; // Reset punch timer
                this.player2punchcooldown = 0;
            }
        }
        


        if (this.input.keyboard.addKey('A').isDown && this.player1punchactive == false && !this.initialpause) {

            this.player1.x -= 2.5;
            this.updateGraphics(this.player1);
            
        }
    
        if (this.input.keyboard.addKey('D').isDown && !this.collides(this.player1, this.player2) && this.player1punchactive == false && !this.initialpause) {

            this.player1.x += 2.5;
            this.updateGraphics(this.player1);
        }

        if (this.input.keyboard.addKey('S').isDown && !this.player1crouch && !this.initialpause) {

            
            this.player1.height /= 2;
            this.player1.y += 60
            this.player1crouch = true;
            this.updateGraphics(this.player1);
        } else if (!this.input.keyboard.addKey('S').isDown && this.player1crouch) {
            this.player1.height *= 2;
            this.player1.y -= 60
            this.player1crouch = false;
            this.updateGraphics(this.player1);
        }

        
    
        if (this.cursors.left.isDown && !(this.collides(this.player1, this.player2)) && !this.initialpause) {
            this.player2.x -= 2.5;
            this.updateGraphics(this.player2);
        }
    
        if (this.cursors.right.isDown && !this.initialpause) {
            this.player2.x += 2.5;
            this.updateGraphics(this.player2);
        }

        if (this.cursors.down.isDown && !this.player2crouch && !this.initialpause) {
            this.player2.height /= 2;
            this.player2.y += 60
            this.player2crouch = true;
            this.updateGraphics(this.player2);
        } else if (!this.cursors.down.isDown && this.player2crouch) {
            this.player2.height *= 2;
            this.player2.y -= 60
            this.player2crouch = false;
            this.updateGraphics(this.player2);
        }

        //console.log(this.player2.height)


        
    }


    updateGraphics(x){
        if(x === this.player1){
            this.player1Graphics.clear();
            this.player1Graphics.fillStyle(0xFF0000); // Blue color
            this.player1Graphics.fillRectShape(x);

        }else if(x === this.player2){
            this.player2Graphics.clear();
            this.player2Graphics.fillStyle(0x0000FF); // Blue color
            this.player2Graphics.fillRectShape(x);
        }
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
