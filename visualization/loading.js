var viv = new Vivus("loading", {
                      type: "Delayedstart",
                      duration: 3000,
                      file: "omniart.svg",
                    }, funcCall);

function funcCall(){
  viv.stop().reset().destroy()
}
