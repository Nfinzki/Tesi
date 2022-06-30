export class NFTComponent {
    protected nftImage;

    constructor(imagePath: string, position: Vector3, rotation: Quaternion, scale?: Vector3) {
        //Create entity and assign shape
        this.nftImage = new Entity()
        this.nftImage.addComponent(new PlaneShape())

        //Create material and configure its fields
        const myMaterial = new BasicMaterial()
        myMaterial.texture = new Texture(imagePath)

        //Assign the material to the entity
        this.nftImage.addComponent(myMaterial)

        //Create the Transform component
        let transform: Transform;
        if (typeof scale !== 'undefined') {
            transform = new Transform({
                position: position,
                rotation: rotation,
                scale: scale
            })
        } else {
            transform = new Transform({
                position: position,
                rotation: rotation
            })
        }
        
        this.nftImage.addComponent(transform)
        
        engine.addEntity(this.nftImage)
    }
}