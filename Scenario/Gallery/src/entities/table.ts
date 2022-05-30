import { getUserAccount } from "@decentraland/EthereumController";
import { getConnectedPlayers } from "@decentraland/Players";
import { currentUserAddress } from "src/resources";
import { CreateTransactionUI } from "src/ui/transactionUI";

export function createTable() {
    async function getAddresses(): Promise<Array<String>> {
    var usersAddresses = new Array<String>();
    let connectedPlayers = await getConnectedPlayers();
    
    for(var user of connectedPlayers) {
        usersAddresses.push(user.userId);
    }

    return usersAddresses;
    }

    const table = new Entity();
    engine.addEntity(table);
    table.addComponent(new GLTFShape("models/table.glb"));

    table.addComponent(new Transform({
    position: new Vector3(8, 0, 5),
    scale: new Vector3(0.3, 0.3, 0.3)
    }))

    let box = new CylinderShape();
    box.visible = false;

    const physicalTable = new Entity();
    engine.addEntity(physicalTable);
    physicalTable.addComponent(box);
    physicalTable.addComponent(new Transform({
    position: new Vector3(8, 0, 5),
    scale: new Vector3(0.7, 0.9, 0.7)
    }));

    table.addComponent(new OnPointerDown((e) => {
        let transactionUI = new CreateTransactionUI();
        transactionUI.setUserAddress(currentUserAddress);
        
        let usersAddresses = getAddresses();
        usersAddresses.then(value => {
        transactionUI.setAddresses(value);
        })

        transactionUI.setVisibility(true);
    },
    {button: ActionButton.POINTER},
    ))
}