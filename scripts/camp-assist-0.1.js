console.log(new Date() + " Inside camp-assist-0.1.js created by TG");

function campAssistProcessor(counter) {
    let url = window.location.href;
    console.log(new Date() + " TG: URL:" + url);
    if (url.indexOf("journeys.adobe.com") < 0) {
        //not the url we want to run on
        // Needs to be updated with RegEx
        console.log(new Date() + " TG: Not the URL we want to work on");
        return;
    }

    if (!counter)
        counter = 0;

    /* Adobe Experience Cloud */

    //Get the Span with text "Edit email body" 
    //let domObj = document.querySelector("#react-spectrum-2 .NW91UW_flex .Dniwja_spectrum-ActionButton-label");//The Id is changing

    //let domObj = document.querySelector(".spectrum-SplitView-pane .EmailEditorRightRail-module_rightRailContainer__1SDfG .NW91UW_flex .Dniwja_spectrum-ActionButton-label");
    let ifrmContent = document.querySelector("#contentEditorFrame");
    if (!ifrmContent) {
        //We need to wait more
        counter++;
        if (counter >= 10) {
            console.log("Enough waiting!! You better switch to a better network :)");
            return;
        }
        console.log(new Date() + " Ifrmae content is not ready, will wait for another " + counter + " secs");
        setTimeout(campAssistProcessor.bind(null, counter), 1000 * counter);
        return;
    }

    let domObj = ifrmContent.contentWindow.document.querySelector(".spectrum-SplitView-pane .EmailEditorRightRail-module_rightRailContainer__1SDfG .NW91UW_flex .Dniwja_spectrum-ActionButton-label");

    let objDiv, objButton;
    if (domObj) {
        console.log(new Date() + " TG: Dom is ready.");
        let objParent = domObj.parentNode;
        while (objParent) {

            console.log(new Date() + " TG: We are at node - " + objParent.nodeName + "\n" + objParent.innerHTML);

            //Button is first parent, so by the time Div is reached, the button obj shouldn't be null
            if (objParent.nodeName == "DIV" && objButton) {
                objDiv = objParent;
                console.log(new Date() + " TG: Got the div.");
                break;
            }
            if (objParent.nodeName == "BUTTON") {
                objButton = objParent;
                console.log(new Date() + " TG: Got the button.");
            }
            objParent = objParent.parentNode
            if (!objParent) {
                console.log(new Date() + " TG: TRaversed the whole document and unable to find the Div and button.");
                return;
            }
        }

        if (!(objDiv && objButton)) {
            //The DOM has changed
            console.log("Unable to find the button 'Edit email body'. PLease contact CampAssist.ai Admins.");
            return;
        }

        let newButton = getCampAssistButton();

        console.log("Button:" + newButton.innerHTML);

        //Making the Gen AI Button First
        objDiv.removeChild(objButton);
        objDiv.appendChild(newButton);
        objDiv.appendChild(objButton);
    }
    else {
        //We need to wait more
        counter++;
        if (counter >= 10) {
            console.log("Enough waiting!! You better switch to a better network :)");
            return;
        }
        console.log(new Date() + " Will wait for another " + counter + " secs");
        setTimeout(campAssistProcessor.bind(null, counter), 1000 * counter);
    }

    /*
    //"http://*.w3schools.com/html/*"
    let domObj = document.querySelector("#main h1 span");
    let formType = ""
    if(url.indexOf("iframe")>=0)
    {
        formType = "IFrame";
        console.log("TG:Inside Iframe");
    }
    else{
        formType = "Main Frame";
        console.log("TG:Inside Main frame");
    }
    if (domObj) {    
        document.querySelector(".w3-col h1 span").innerHTML = "Tarun's " + formType;
    }
    */

    //"https://wb.gov.in/*"
    //document.querySelector(".col-md-12 h5").innerHTML = "Tarun Ghosh";
}

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;
  
    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
  }


function getCampAssistButton() {
    var template = document.createElement('template');
    let html = '<button id="campAssistButton" class="Dniwja_spectrum-ActionButton Dniwja_spectrum-BaseButton Dniwja_i18nFontFamily Dniwja_spectrum-FocusRing Dniwja_spectrum-FocusRing-ring"';
    html += '    type="button" data-testid="acriteButton"';
    html += '        data-email-designer-url="https://experience.adobe.com/solutions/pixel-acrites-drivers/assets/ajoDriver-80e93fd67ed368a9bb63.js"';
    html += '        data-is-email-designer-default-url="false" data-omega-element="edit email body button"';
    html += '        data-omega-feature="email channel" data-omega-widget="email details"';
    html += '        data-omega-attribute-action="click button to edit email body"><svg viewBox="0 0 36 36"';
    html += '            class="yxBNXG_spectrum-Icon yxBNXG_spectrum-Icon--sizeS Dniwja_spectrum-Icon" focusable="false"';
    html += '            aria-hidden="true" role="img">';
    html += '            <path fill-rule="evenodd"';
    html += '                d="M33.567,8.2,27.8,2.432a1.215,1.215,0,0,0-.866-.353H26.9a1.371,1.371,0,0,0-.927.406L5.084,23.372a.99.99,0,0,0-.251.422L2.055,33.1c-.114.377.459.851.783.851a.251.251,0,0,0,.062-.007c.276-.063,7.866-2.344,9.311-2.778a.972.972,0,0,0,.414-.249L33.513,10.028a1.372,1.372,0,0,0,.4-.883A1.221,1.221,0,0,0,33.567,8.2ZM11.4,29.316c-2.161.649-4.862,1.465-6.729,2.022l2.009-6.73Z">';
    html += '            </path>';
    html += '        </svg>';
    html += '       <span class="Dniwja_spectrum-ActionButton-label">Update CampAssist Info</span></button>';
    console.log("Here is the HTML:" + html);

    template.innerHTML = html;

    //obj= fromHTML(html);
    //return obj;
/**/
    if (template.content.children)
        return template.content.children[0];
    else
        console.log("Unable to create the new button 'Edit email body'. PLease contact CampAssist.ai Admins.");

}

//document.onload(campAssistProcessor);

//Using Function.prototype.bind() to pass the parameter
setTimeout(campAssistProcessor.bind(null, 0), 5000);