const puppy = require("puppeteer");

let browserP = puppy.launch({
    headless: false,
    // pipe: true, <-- delete this property                              //this one is required for my system only so that puppeteer can work properly
    args: [                                                             //this one is required for my system only so that puppeteer can work properly
        '--no-sandbox',                                                 //this one is required for my system only so that puppeteer can work properly   
        '--disable-dev-shm-usage', // <-- add this one                  //this one is required for my system only so that puppeteer can work properly
    ],                                                                  //this one is required for my system only so that puppeteer can work properly
    defaultViewport: false,
});


const id = "tixig24015@irahada.com";
const pass = "random123";
let tab;

const challengeDetail=[
    {
        "name": "first one",
        "desc": "Aliquam porttitor lor",
        "prob": "",
        "input": "",
        "constr": "",
        "output": "",
        "tags": ""
    },
    {
        "name": "second one",
        "desc": "Alidshghdsfm porttitor lor",
        "prob": "dfmhdfjbgdkjgdj",
        "input": "dflskjlosk",
        "constr": "ghdrfjgesjfidsukjb",
        "output": "jhgffdgsbdfhdfn",
        "tags": "hdbjgfhdfnmbnnmdf"
    },
    {
        "name": "third one",
        "desc": "jddsjfliquam porttitor lor",
        "prob": "dfkjhbieujfnd",
        "input": "sldokelgn",
        "constr": "dfskjhkdfjbd",
        "output": "cskhkdfsjbds",
        "tags": "dfsnfdhgdskj"
    },
    {
        "name": "fourth one",
        "desc": "Aliquam po",
        "prob": "jhgfhjfsd",
        "input": "esksuhmdfs",
        "constr": "werkhdfsn",
        "output": "weoijkn",
        "tags": "ehoidj"
    },
    {
        "name": "fifth one",
        "desc": "Aliquam podsfjhbfdsmtitor lor",
        "prob": "ehdjkn",
        "input": "erdfshujkn",
        "constr": "weijosdk",
        "output": "ewiojfsdlk",
        "tags": "gyufdh"
    }
];

(async () =>{
    try{
    const browser = await browserP;
    let pages= await browser.pages();
    tab = pages[0];
    await tab.goto('https://www.hackerrank.com/auth/login');
    await login();
    //main(browser);
    //browser.close();
    }
    catch(err){
        console.log("ERROR CAUGHT");
        console.log(err);
    }
})();
async function main(browser){
    try{
        let pages=browser.pages();
        tab=pages[0];
       let pageOpen =await tab.goto("https://www.hackerrank.com/auth/login");
      login();
    }
    catch(err){
        console.log(err);
        console.log("error caught");
    }
}

async function login(){
   await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector(".nav-buttons.theme-m-section", { visible: true });
    tab.click(".dropdown-handle.nav_link.toggle-wrap");
    await admin();
}
function wait(time) {
    return new Promise(function(resolve,reject){
        setTimeout(() => {
          resolve();  
        }, time);
    })
}
async function admin(){
    //await tab.waitForSelector(".nav-buttons.theme-m-section", { visible: true });
     //await tab.waitForNavigation({ waitUntil: "networkidle2" });
    await wait(2000);
     await tab.click(".dropdown-handle.nav_link.toggle-wrap .username.text-ellipsis");
     await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await wait(2000);
    await tab.click("a[href='/administration/challenges']");
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    let challengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate((ele)=>{
        return ele.getAttribute("href");
    },challengeButton);
    for(let i=0;i<challengeDetail.length;i++){
    tab.goto("https://www.hackerrank.com"+createChallengeUrl);
        //await tab.waitForSelector(".pull-left.lightweight.pjT.psB",{visible:true});
        await wait(2000);
        await tab.type("#name",challengeDetail[i]["name"]);
        await tab.type(".description.span16", challengeDetail[i]["desc"]);
        await wait(2000);
        await tab.type("#problem_statement-container .CodeMirror textarea", challengeDetail[i]["prob"]);
        await tab.type("#input_format-container .CodeMirror textarea", challengeDetail[i]["input"]);
        await tab.type("#constraints-container .CodeMirror textarea", challengeDetail[i]["constr"]);
        await tab.type("#output_format-container .CodeMirror textarea", challengeDetail[i]["output"]);
        await tab.type("#tags_tag", challengeDetail[i]["tags"]);
        await tab.keyboard.press("Enter");
    }
}


