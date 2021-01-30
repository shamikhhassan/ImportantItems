({
    checkBusinessPrinciple : function(component, event, helper) {
        var action2 = component.get("c.getTextMessage");
        action2.setCallback(this, function(response) {
            
            var show =response.getReturnValue().show;
            var message = response.getReturnValue().message;
            
            component.set("v.show",show);
            component.set("v.message",message);
          
            
        });
        $A.enqueueAction(action2);
         //GA implementation
         var act = component.get("c.getAgentBaseUrl");
                    act.setCallback(this, function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS" && response.getReturnValue()!='') {
                            component.set("v.getAgentBaseUrl", response.getReturnValue());
                            }               
                    });
                    $A.enqueueAction(act);
        /*
        var action1 = component.get("c.getAgentGAID");
                    action1.setCallback(this, function(response) {
                        var state = response.getState();
                        if (state == "SUCCESS" && response.getReturnValue()!='') {
                            component.set("v.ga", response.getReturnValue());
                            component.set("v.showVFpage", true);
                            }               
                    });
                    $A.enqueueAction(action1);
           */
           
        var action = component.get("c.getIsAcceptedTermsAndCondition");
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                component.set("v.businessPrincipleFlag", a.getReturnValue());
            } else if (a.getState() === "ERROR") {
                console.log("Errors"+ a.getError());
            }
            if(component.get("v.businessPrincipleFlag")==true){
                
                if(component.get("v.showLandingPageFlag")){
                    var content = component.find("baseComponentContainer");
                    $A.createComponent("c:AA_LandingPageComponent",
                                       {"objPassAgentReportsToNG":component.get("v.objPassAgentReportsToNG"),               
                                        "limitRecords":component.get("v.limitRecords"),
                                        "offSet":component.get("v.offSet"),
                                        "filterType":component.get("v.filterType"),
                                        "sortType":component.get("v.sortType"),
                                        "applyFilter":component.get("v.applyFilter"),             
                                        "objAgentAppDataResponse":component.get("v.objAgentAppDataResponse")},
                                       function(cmp) {
                                           content.set("v.body", [cmp]);
                                       });
               }
                else{
                    var content = component.find("baseComponentContainer");
                    $A.createComponent("c:AA_AgentBaseFeedBackComponent",{},
                                       function(cmp) {
                                           content.set("v.body", [cmp]);
                                       });
                }            
            }
            else{
                var content = component.find("baseComponentContainer");
                $A.createComponent("c:AA_BusinessPrincipleComponent",{},
                                   function(cmp) {
                                       content.set("v.body", [cmp]);
                                   });
            }
            // end sanju
        }); 
        $A.enqueueAction(action);
        //sanju new code start
        
    },
    handleBusinessPrincipleEvent: function(component, event, helper) {
        var bgFlag = event.getParam("bpFlag");
        var showLandingPage=event.getParam("showLandingPage");
        component.set("v.businessPrincipleFlag", bgFlag);
        component.set("v.showLandingPageFlag", showLandingPage);
        //strt
       if(component.get("v.showLandingPageFlag")){
            
            var content = component.find("baseComponentContainer");
            $A.createComponent("c:AA_LandingPageComponent",
                               {"objPassAgentReportsToNG":component.get("v.objPassAgentReportsToNG"),               
                                "limitRecords":component.get("v.limitRecords"),
                                "offSet":component.get("v.offSet"),
                                "filterType":component.get("v.filterType"),
                                "sortType":component.get("v.sortType"),
                                "applyFilter":component.get("v.applyFilter"),             
                                "objAgentAppDataResponse":component.get("v.objAgentAppDataResponse")},
                               function(cmp) {
                                   content.set("v.body", [cmp]);
                               });
        }else{
            
            var content = component.find("baseComponentContainer");
            $A.createComponent("c:AA_AgentBaseFeedBackComponent",{},
                               function(cmp) {
                                   content.set("v.body", [cmp]);
                               });
        }    
        //end
    },
    getDetail :function(component, event, helper) {
        
        var destination = "c:AA_LandingPageComponent";
        var content = component.find("baseComponentContainer");
        console.log("Apply filter in base component: "+event.getParam("applyFilter"));
        console.log("countryId in base component: "+event.getParam("countryId"));
        console.log("clusterId in base component: "+event.getParam("clusterId"));
        console.log("FromDate in base component: "+event.getParam("fromDate"));
        console.log("ToDate in base component: "+event.getParam("toDate"));
        console.log("filterType in base component: "+event.getParam("filterType"));
        console.log("recordType in base component: "+event.getParam("recordType"));
        $A.createComponent(destination,
                           {"filterType":event.getParam("filterType"),
                            "sortType":event.getParam("sortType"),
                            "applyFilter":event.getParam("applyFilter"),
                            "previousFilterType":component.get("v.filterType"),
                            "offSet":event.getParam("offSet"),
                            "limitRecords":event.getParam("limitRecords"),
                            "countryId":event.getParam("countryId"),
                            "clusterId":event.getParam("clusterId"),
                            "unileverBrandId":event.getParam("unileverBrandId"),
                            "retailerId":event.getParam("retailerId"),
                            "reportingOnId":event.getParam("reportingOnId"),
                            "recordType":event.getParam("recordType"),
                            "competitorBrandId":event.getParam("competitorBrandId"),
                            "competitorId":event.getParam("competitorId"),
                            "categoryId":event.getParam("categoryId"),
                            "topicId":event.getParam("topicId"),
                            "filterName":event.getParam("filterName"),
                            "filterId":event.getParam("filterId"),
                            "selectedFilterName":event.getParam("selectedFilterName"),
                            "subTopic":event.getParam("subTopic"),
                            "fromDate":event.getParam("fromDate"),
                            "toDate":event.getParam("toDate"),
                            "checkvalue":event.getParam("checkvalue"),
                            "weekly":event.getParam("weekly"),
                            "monthly":event.getParam("monthly"),
                            "choose":event.getParam("choose")
                           },
                           function(cmp) {
                               content.set("v.body", [cmp]);
                           }); 
    },
    getForm :function(component, event, helper) {
        console.log("getForm baseComponent");
        var destination = "c:"+ event.getParam("navigate");
        
        var content = component.find("baseComponentContainer");
        $A.createComponent(destination,
                           { filterType:event.getParam("filterType"),
                            sortType:event.getParam("sortType"),
                            applyFilter:event.getParam("applyFilter"),
                            offSet:event.getParam("offSet"),
                            limitRecords:event.getParam("limitRecords"),
                            countryId:event.getParam("countryId"),
                            filterId:event.getParam("filterId"),
                            selectedFilterName:event.getParam("selectedFilterName"),
                            clusterId:event.getParam("clusterId"),  },
                           function(cmp) {
                               content.set("v.body", [cmp]);
                           }); 
    },
    showSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();    
    },
    hideSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : false });
        evt.fire();    
    }, 
    getshowPage: function (component, event, helper){
        var showPage=event.getParam("showLandingPage");
        component.set("v.showLandingPageFlag",showPage);
       if(component.get("v.showLandingPageFlag")){
            
           
           
            var content = component.find("baseComponentContainer");
            $A.createComponent("c:AA_LandingPageComponent",
                               {"objPassAgentReportsToNG":component.get("v.objPassAgentReportsToNG"),               
                                "limitRecords":component.get("v.limitRecords"),
                                "offSet":component.get("v.offSet"),
                                "filterType":component.get("v.filterType"),
                                "sortType":component.get("v.sortType"),
                                "applyFilter":component.get("v.applyFilter"),             
                                "objAgentAppDataResponse":component.get("v.objAgentAppDataResponse")},
                               function(cmp) {
                                   content.set("v.body", [cmp]);
                               });
        }else{
            
            var content = component.find("baseComponentContainer");
            $A.createComponent("c:AA_AgentBaseFeedBackComponent",{},
                               function(cmp) {
                                   content.set("v.body", [cmp]);
                               });
        }    
    },
    close : function(component, event, helper) {
        var cmpTarget = component.find('remove');
        $A.util.addClass(cmpTarget, 'removee');
        $A.util.removeClass(component.find('rem'), 'slds-backdrop');
        
    },
})