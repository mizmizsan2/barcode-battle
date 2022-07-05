let options = {
    preferFrontCamera: false,
    showFlipCameraButton: true,
    showTorchButton: true,
    formats: "EAN_13",
    disableAnimations: true, // iOS
    disableSuccessBeep: false, // iOS and Android
};

class Barcode {
    constructor(barcode) {
        this.barcode = barcode;
        this.hp = parseInt(barcode.substring(1, 3)) * 1000;
        this.st = parseInt(barcode.substring(4, 6)) * 100;
        this.df = parseInt(barcode.substring(7, 9)) * 100;

        if (this.hp == 0)
            this.hp = 50000;

        if (this.st == 0)
            this.st = 5000;

        if (this.df == 0)
            this.df = 5000;
    }



}

let bar1, bar2;

function onSuccess(result) {
    // alert(
    //     "結果: " + result.text + "\n" +
    //     "バーコードの種類: " + result.format + "\n" +
    //     "スキャンが中断されたかどうか: " + result.cancelled
    // )
    //divタグを作る


    bar1 = new Barcode(result.text);
    console.log(bar1.barcode);

    // preview();

    let div = document.createElement("div");

    //読み込み結果のテキストを作る
    let text = document.createTextNode(result.text);

    //作ったdivにテキスト設定
    div.appendChild(text);

    let results = document.getElementById("results");
    // results.appendChild(div);   //作ったdivをresultsの要素の下につなげる


    document.getElementById("HP").innerHTML = `体力＝${bar1.hp}`;
    document.getElementById("ST").innerHTML = `攻撃力＝${bar1.st}`;
    document.getElementById("DF").innerHTML = `防御力＝${bar1.df}`;



}

function onSuccess2(result) {

    bar2 = new Barcode(result.text);
    console.log(bar2.barcode);
    //divタグを作る
    let div = document.createElement("div");

    //読み込み結果のテキストを作る
    let text = document.createTextNode(bar2.barcode);

    //作ったdivにテキスト設定
    div.appendChild(text);

    let results2 = document.getElementById("results2");
    // results2.appendChild(div);   //作ったdivをresultsの要素の下につなげる

    document.getElementById("HP2").innerHTML = `体力＝${bar2.hp}`;
    document.getElementById("ST2").innerHTML = `攻撃力＝${bar2.st}`;
    document.getElementById("DF2").innerHTML = `防御力＝${bar2.df}`;

}


function battle() {

    let turn = Math.floor(Math.random() * 2);

    console.log("バトル開始！");
    let damage;




    while (bar1.hp > 0 && bar2.hp > 0) {

        let frame = document.createElement("div");
        let contents = document.createElement("div");
        let bar1hp = document.createElement("div");
        let bar2hp = document.createElement("div");

        frame.className = "turn";

        if (turn % 2 == 0) {
            damage = ((bar1.st * 2) + (bar1.st * Math.floor(Math.random() * 9) / 10) - bar2.df) / 2
            bar2.hp -= damage;
            contents.innerHTML = `バーコード1が${damage}の攻撃！`;
            bar1hp.innerHTML = `バーコード１：${bar1.hp}`
            bar2hp.innerHTML = `バーコード２：${bar2.hp}`


        } else {
            damage = ((bar2.st * 2) + (bar2.st * Math.floor(Math.random() * 9) / 10) - bar1.df) / 2
            bar1.hp -= damage;
            contents.innerHTML = `バーコード2が${damage}の攻撃！`;
            bar1hp.innerHTML = `バーコード１：${bar1.hp}`
            bar2hp.innerHTML = `バーコード２：${bar2.hp}`
        }

        frame.appendChild(contents);
        frame.appendChild(bar1hp);
        frame.appendChild(bar2hp);

        let battles = document.getElementById("battles");
        battles.appendChild(frame);

        turn++;
    }


    let frame = document.createElement("div");
    let contents = document.createElement("div");

    frame.className = "turn";

    if (bar1.hp > 0) {
        contents.innerText = "バーコード１の勝利！";
    } else {
        contents.innerText = "バーコード２の勝利！";
    }

    frame.appendChild(contents);
    let battles = document.getElementById("battles");
    battles.appendChild(frame);

}



function onError(error) {
    alert("スキャン失敗: " + error);
}

function scan() {
    cordova.plugins.barcodeScanner.scan(onSuccess, onError, options);
}

function scan2() {
    cordova.plugins.barcodeScanner.scan(onSuccess2, onError, options);
}