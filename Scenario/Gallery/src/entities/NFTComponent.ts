export class NFTComponent {
    protected nftImage;

    constructor(imagePath: string, position: Vector3, rotation: Quaternion) {
        //Create entity and assign shape
        this.nftImage = new Entity()
        this.nftImage.addComponent(new PlaneShape())
        //Create material and configure its fields
        const myMaterial = new BasicMaterial()
        myMaterial.texture = new Texture(imagePath)
        //Assign the material to the entity
        this.nftImage.addComponent(myMaterial)
        this.nftImage.addComponent(new Transform({
            position: position,
            rotation: rotation
        }))
        
        engine.addEntity(this.nftImage)
    }
}