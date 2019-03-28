//storing canvas in a varible 	
var canvas = document.querySelector('canvas');

//resizing to the browsers innerWidth and innerHeight
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//creating context
var c = canvas.getContext('2d');


//creating mouse object to store x and y coordinates
var mouse = {
    x: undefined,
    y: undefined
};

//creating mousemove eventlistener
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

});

//eventlistener for auto resizing 
window.addEventListener('resize', function() {
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

var maxRadius = 40;

var colorArray = [

    '#112F41',
    '#0894A1',
    '#47AB6C',
    '#F2B134',
    '#ED553B'

];

//function to create a circle
function Circle(x, y, dx, dy, radius) {
	//creating vars
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	//function for creating each circle
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    };

	
    this.update = function() {
		
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }


        this.draw();
    };
};


var circleArray = [];

for (var i = 0; i < 800; i++) {
	    var radius = Math.random() * 3 + 1;
	    var x = Math.random() * (innerWidth - radius * 2) + radius;
	    var y = Math.random() * (innerHeight - radius * 2) + radius;
	    var dx = Math.random() * -0.5 * 1;
	    var dy = Math.random() * -0.5 * 1;

	    circleArray.push(new Circle(x, y, dx, dy, radius));
	}


function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


};

animate();