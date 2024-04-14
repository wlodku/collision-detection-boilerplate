function Obstacle(x, y, w, h) {
    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.draw = function(c) {
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Obstacle }