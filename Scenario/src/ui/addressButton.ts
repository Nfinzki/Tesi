import { requirePayment } from "@decentraland/EthereumController";
import { currency, price } from "../resources";

export class AddressButton {

    constructor(uiShape: UIShape, texture: Texture = new Texture("images/background.png"), value: string, positionY: number) {
        let button = new UIImage(uiShape, texture);
        button.sourceWidth = 100;
        button.sourceHeight = 200;
        button.width = 500;
        button.positionY = positionY;
        button.isPointerBlocker = true;
        button.onClick = new OnPointerDown((e) => {
            this.payment(value);
        },
        {button: ActionButton.POINTER},
        )
        
        let text = new UIText(button);
        text.value = value;
        text.isPointerBlocker = false;
        text.fontSize = 15
        text.adaptWidth = true;
        text.vAlign = "center";
        text.hAlign = "center";
        text.paddingBottom = 15;
    }

    payment(address: string) {
        executeTask(async () => {
            try {
                await requirePayment(address, price, currency);
            } catch {
                log("Payment failed");
            }
        })
    }
}