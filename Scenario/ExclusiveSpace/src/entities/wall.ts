export function createWall(scale: Vector3, position: Vector3) {
    const wall = new Entity();
    wall.addComponent(new BoxShape());
    wall.addComponent(new Transform({
        scale: scale,
        position: position
    }))
    engine.addEntity(wall);
}