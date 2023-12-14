({
    doInit: function (component, event, helper) {
        var path = $A.get("$Resource.AmthurTaskOnAura");
        var req = new XMLHttpRequest();
        req.open("GET", path);
        req.addEventListener("load", $A.getCallback(function() {
            var jsonResponse = JSON.parse(req.response);
            //console.log('response is--------------------------'+JSON.stringify(jsonResponse));
            var stringArray = [];
            var concauth = jsonResponse.ConcessionAuthority.authority;
            console.log('concauth--------------------'+JSON.stringify(concauth));
            var cardtype = jsonResponse.cardType.CentreLink;
            console.log('cardtype-------------------'+JSON.stringify(cardtype));
            var cardtype2 = jsonResponse.cardType["Department of Veteran Affairs"];
            for (let i = 0; i < jsonResponse.fields.length; i++) {
                stringArray.push(jsonResponse.fields[i].Name);
            }
            component.set('v.options', stringArray);
            component.set('v.concauth', concauth);
            component.set('v.cardtype', cardtype);
            component.set('v.cardtype2', cardtype2);
        }));
        req.send(null);
    },

    handleFirstPicklistChange: function (component, event, helper) {
        console.log('i am in handle');
       
        var selectedValue = component.get("v.selectedValue");
        console.log('componetn---111111111----'+selectedValue);
       if(selectedValue == " " || selectedValue === undefined  )
       {
        console.log('i am in inside if condition');
          //component.set("v.cardtype","");
          component.set("v.cardtype2", "");
       }
         else if (selectedValue == 'CentreLink') {
            component.set("v.cardtype", component.get("v.cardtype"));
        } else {
            component.set("v.cardtype2", component.get("v.cardtype2"));
        }
    },

    handleSecondPicklistChange: function (component, event, helper) {
        // Use event.getParam("value") to get the selected value
        
        var selectedCardType = event.getParam("value");
        console.log("Selected Card Type: " + selectedCardType);
        
    }
})
