import { setPrice } from "src/resources";
import { AddressButton } from "./addressButton";

export class CreateTransactionUI {
    transactionCanvas: UICanvas
    userAddress: UIText;
    container: UIContainerRect
    close: UIImage
    scrollableRect: UIScrollRect
    addresses: String[]

    constructor() {
        this.addresses = [];
        this.transactionCanvas = new UICanvas();

        this.container = new UIContainerRect(this.transactionCanvas);
        this.container.hAlign = 'center';
        this.container.vAlign = 'center';
        this.container.height = "100%";
        this.container.width = "80%";
        this.container.color = new Color4(1, 1, 1, 1);
        this.container.visible = false;
    
        //Adds the closing button
        this.close = new UIImage(
            this.container,
            new Texture("images/button_close.png")
        );
        this.close.sourceWidth = 92;
        this.close.sourceHeight = 92;
        this.close.width = 46;
        this.close.height = 46;
        this.close.vAlign = 'top';
        this.close.hAlign = 'right';
        this.close.onClick = new OnPointerDown((e) => {
            this.container.visible = false;
        },
        {button: ActionButton.POINTER},
        )

        //Adds the user address
        this.userAddress = new UIText(this.container);
        this.userAddress.fontSize = 15;
        this.userAddress.color = new Color4(0, 0, 0, 1);
        this.userAddress.vAlign = 'top';
        this.userAddress.positionX = -150;

        const textInput = new UIInputText(this.container)
        textInput.width = "50%"
        textInput.height = "25px"
        textInput.hAlign = "center"
        textInput.fontSize = 15
        textInput.placeholder = "Enter the amount of ETH to send"
        textInput.positionY = "235px"
        textInput.isPointerBlocker = true

        textInput.onTextSubmit = new OnTextSubmit((x) => {
            setPrice(parseFloat(x.text));
        })

        this.scrollableRect = new UIScrollRect(this.container);
        this.scrollableRect.isVertical = true;
        this.scrollableRect.hAlign = "left";
        this.scrollableRect.vAlign = "top";
        this.scrollableRect.paddingTop = 100;
        this.scrollableRect.paddingLeft = 100;
        this.scrollableRect.width = "80%";
        this.scrollableRect.height = "80%";
    }

    setUserAddress(text: string) {
        this.userAddress.value = text;
    }

    getUserAddress(): string {
        return this.userAddress.value;
    }

    setVisibility(visibility: boolean) {
        this.container.visible = visibility;
    }

    setAddresses(addresses: String[]) {
        this.addresses = addresses;

        let offset = 0;
        for (var user of addresses) {
            new AddressButton(this.scrollableRect, undefined, <string> user, offset);
            offset += 75;
        }
    }
}