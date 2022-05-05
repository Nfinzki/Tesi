export function createWall() {
    const wall = new Entity();
    wall.addComponent(new BoxShape());
    wall.addComponent(new Transform({
        scale: new Vector3(15, 10, 1),
        position: new Vector3(8, 0, 15)
    }))
    engine.addEntity(wall);
}