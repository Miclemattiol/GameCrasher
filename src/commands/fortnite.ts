import command from "../command";
import * as cp from "child_process";

const fn: command = {
    name: 'FORTNITE',

    execute: () => {
        cp.exec("taskkill /f /im \"FortniteClient-Win64-Shipping.exe\"");

    }
}

export default fn;