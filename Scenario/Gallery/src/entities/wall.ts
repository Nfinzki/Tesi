export function createWall(scale: Vector3, position: Vector3, text: string, transform: Transform) {
    const wall = new Entity();
    wall.addComponent(new BoxShape());
    wall.addComponent(new Transform({
        scale: scale,
        position: position
    }))

    const textSign = new Entity();
    const textShape = new TextShape(text);
    textShape.fontSize = 10;
    textShape.color = Color3.Black();
    textSign.addComponent(textShape);
    textSign.addComponent(transform);

    engine.addEntity(wall);
    engine.addEntity(textSign);
}