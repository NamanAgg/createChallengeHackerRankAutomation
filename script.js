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

const id ="xivof52097@tlhao86.com";
const pass = "random123";
let tab;

const challengeDetail=[
    {
        "name": "firstChallenge",
        "desc": "Aliquam porttitor lor",
        "prob": "kjdfshkjdsf",
        "input": "sdfuhejnm",
        "constr": "erdsfijk",
        "output": "erfdhudsia",
        "tags": "rewwetrthegfxxc"
    },
    {
        "name": "secondChallenge",
        "desc": "Alidshghdsfm porttitor lor",
        "prob": "dfmhdfjbgdkjgdj",
        "input": "dflskjlosk",
        "constr": "ghdrfjgesjfidsukjb",
        "output": "jhgffdgsbdfhdfn",
        "tags": "hdbjgfhdfnmbnnmdf"
    },
    {
        "name": "thirdChallenge",
        "desc": "jddsjfliquam porttitor lor",
        "prob": "dfkjhbieujfnd",
        "input": "sldokelgn",
        "constr": "dfskjhkdfjbd",
        "output": "cskhkdfsjbds",
        "tags": "dfsnfdhgdskj"
    },
    {
        "name": "fourthChallenge",
        "desc": "Aliquam po",
        "prob": "jhgfhjfsd",
        "input": "esksuhmdfs",
        "constr": "werkhdfsn",
        "output": "weoijkn",
        "tags": "ehoidj"
    },
    {
        "name": "fifthChallenge",
        "desc": "Aliquam podsfjhbfdsmtitor lor",
        "prob": "ehdjkn",
        "input": "erdfshujkn",
        "constr": "weijosdk",
        "output": "ewiojfsdlk",
        "tags": "gyufdh"
    }
];
const modNames = ["nocidi6371", "ralariv999", "yasekin473", "sibaje3329", "pamahex943", "kipavof852", "kejavib309","mijora9576"];



(async () =>{
    try{
    const browser = await browserP;
    let pages= await browser.pages();
    tab = pages[0];
    await tab.goto('https://www.hackerrank.com/auth/login');
    await login();
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
     await tab.waitForNavigation({ waitUntil: "networkidle2" });
    
     await tab.click(".dropdown-handle.nav_link.toggle-wrap");
     await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await wait(3000);   //here we used wait
  
    await tab.click("a[href='/administration/challenges']");
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    
    let challengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate((ele)=>{
        return ele.getAttribute("href");
    },challengeButton);
    for(let i=0;i<challengeDetail.length;i++){
    tab.goto("https://www.hackerrank.com"+createChallengeUrl);
        await tab.waitForNavigation({ waitUntil: "networkidle2" });
        await tab.type("#name",challengeDetail[i]["name"]);
        await tab.type(".description.span16", challengeDetail[i]["desc"]);
        await tab.waitForSelector("#problem_statement-container .CodeMirror textarea", { visible: true });
        await tab.type("#problem_statement-container .CodeMirror textarea", challengeDetail[i]["prob"]);
        await tab.type("#input_format-container .CodeMirror textarea", challengeDetail[i]["input"]);
        await tab.type("#constraints-container .CodeMirror textarea", challengeDetail[i]["constr"]);
        await tab.type("#output_format-container .CodeMirror textarea", challengeDetail[i]["output"]);
        await tab.type("#tags_tag", challengeDetail[i]["tags"]);
        await tab.keyboard.press("Enter");
        await tab.click(".save-challenge.btn.btn-green");
        await tab.waitForSelector("li[data-tab='moderators'] a",{visible: true});
        await tab.click("li[data-tab='moderators'] a");
        for(let j=0;j<modNames.length;j++){
            await tab.waitForSelector("#moderator", { visible: true });
            await tab.type("#moderator",modNames[j]);
            await tab.keyboard.press("Enter");
            
        }
        await tab.click(".save-challenge.btn.btn-green");
    }
   
    
}


