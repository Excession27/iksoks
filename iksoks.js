let allBoxes = document.querySelectorAll(".box");

allBoxes.forEach(function (element) {
    element.addEventListener("click", function (event) {
        if (!(event.target.classList.contains("iks") || event.target.classList.contains("oks"))) {
            // console.log(drawSymbol());
            console.log(location);
            event.target.classList.add(drawSymbol());
            isVictorious();
        }

    });
})


function draw() {
    let lastSymbol = "oks";
    function changeLastDrawnSymbol() {
        return (lastSymbol = lastSymbol === "oks" ? "iks" : "oks");
        // if (lastSymbol === "oks"){
        //     lastSymbol = "iks";
        // } else  {
        //     lastSymbol = "oks";
        // }
    }
    return changeLastDrawnSymbol;
}

let drawSymbol = draw();

function isVictorious() {
    let iksFields = document.querySelectorAll(".iks");
    let oksFields = document.querySelectorAll(".oks");

    /*  iks victory conditions */
    let iksTopRow = document.querySelectorAll(".top .iks");
    let iksMiddleRow = document.querySelectorAll(".middle .iks");
    let iksBottomRow = document.querySelectorAll(".bottom .iks");

    let iksFirstColumnTop = document.querySelector(".top .first.iks");
    let iksFirstColumnMiddle = document.querySelector(".middle .first.iks");
    let iksFirstColumnBottom = document.querySelector(".bottom .first.iks");

    let iksSecondColumnTop = document.querySelector(".top .second.iks");
    let iksSecondColumnMiddle = document.querySelector(".middle .second.iks");
    let iksSecondColumnBottom = document.querySelector(".bottom .second.iks");

    let iksThirdColumnTop = document.querySelector(".top .third.iks");
    let iksThirdColumnMiddle = document.querySelector(".middle .third.iks");
    let iksThirdColumnBottom = document.querySelector(".bottom .third.iks");

    let iksDiagonalLeft = ((iksFirstColumnTop !== null) && (iksSecondColumnMiddle !== null) && (iksThirdColumnBottom !== null));
    let iksDiagonalRight = (iksThirdColumnTop !== null && iksSecondColumnMiddle !== null && iksFirstColumnBottom !== null);

    let iksFirstColumn = (iksFirstColumnTop !== null && iksFirstColumnMiddle !== null && iksFirstColumnBottom !== null);
    let iksSecondColumn = (iksSecondColumnTop !== null && iksSecondColumnMiddle !== null && iksSecondColumnBottom !== null);
    let iksThirdColumn = (iksThirdColumnTop !== null && iksThirdColumnMiddle !== null && iksThirdColumnBottom !== null);

    if (iksTopRow.length === 3 ||
        iksMiddleRow.length === 3 ||
        iksBottomRow.length === 3 ||
        iksDiagonalLeft ||
        iksDiagonalRight ||
        iksFirstColumn ||
        iksSecondColumn ||
        iksThirdColumn
    ) {
        restart("iks");
    }

    /*  oks victory conditions */
    let oksTopRow = document.querySelectorAll(".top .oks");
    let oksMiddleRow = document.querySelectorAll(".middle .oks");
    let oksBottomRow = document.querySelectorAll(".bottom .oks");

    let oksFirstColumnTop = document.querySelector(".top .first.oks");
    let oksFirstColumnMiddle = document.querySelector(".middle .first.oks");
    let oksFirstColumnBottom = document.querySelector(".bottom .first.oks");

    let oksSecondColumnTop = document.querySelector(".top .second.oks");
    let oksSecondColumnMiddle = document.querySelector(".middle .second.oks");
    let oksSecondColumnBottom = document.querySelector(".bottom .second.oks");

    let oksThirdColumnTop = document.querySelector(".top .third.oks");
    let oksThirdColumnMiddle = document.querySelector(".middle .third.oks");
    let oksThirdColumnBottom = document.querySelector(".bottom .third.oks");

    let oksDiagonalLeft = ((oksFirstColumnTop !== null) && (oksSecondColumnMiddle !== null) && (oksThirdColumnBottom !== null));
    let oksDiagonalRight = (oksThirdColumnTop !== null && oksSecondColumnMiddle !== null && oksFirstColumnBottom !== null);

    let oksFirstColumn = (oksFirstColumnTop !== null && oksFirstColumnMiddle !== null && oksFirstColumnBottom !== null);
    let oksSecondColumn = (oksSecondColumnTop !== null && oksSecondColumnMiddle !== null && oksSecondColumnBottom !== null);
    let oksThirdColumn = (oksThirdColumnTop !== null && oksThirdColumnMiddle !== null && oksThirdColumnBottom !== null);


    if (oksTopRow.length === 3 ||
        oksMiddleRow.length === 3 ||
        oksBottomRow.length === 3 ||
        oksDiagonalLeft ||
        oksDiagonalRight ||
        oksFirstColumn ||
        oksSecondColumn ||
        oksThirdColumn
    ) {
        restart("oks");
    }

}

function restart(victor) {
    let displayVictor = document.createElement("div");
    let text = document.createElement("p");
    displayVictor.classList.add("victory");
    text.textContent = `${victor} has been victorious. New game will start right away.`;
    displayVictor.appendChild(text);

    document.querySelector(".container").appendChild(displayVictor);
    setTimeout(function () {
        location.reload();
    }, 2500);
}
