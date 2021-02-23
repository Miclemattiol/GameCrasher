import command from "../command";
import * as cp from "child_process";

const ds: command = {
    name: 'DISCORD',

    execute: () => {
        cp.exec("taskkill /f /im \"Discord.exe\"");

    }
}

export default ds;