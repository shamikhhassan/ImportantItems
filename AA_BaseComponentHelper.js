({
    getAllReportsData : function(component) {
        var actionResult = component.get("c.getRetriveAllAgentReports");
        actionResult.setParams({"filterType":  component.get("v.filterType"),
                                "sortType":  component.get("v.sortType"),
                                "limitRecords":  component.get("v.limitRecords"),
                                "offSet":  component.get("v.offSet"),
                                "applyFilter": component.get("v.applyFilter"),
                                "clusterId":component.get("v.clusterId"),                               
                                "countryId":component.get("v.countryId"),
                                "unileverBrandId":component.get("v.unileverBrandId"),
                                "retailerId":component.get("v.retailerId"),
                                "reportingOnId":component.get("v.reportingOnId"),
                                "reportType":component.get("v.reportType"),
                                "competitorBrandId":component.get("v.competitorBrandId"),
                                "competitorId":component.get("v.competitorId"),
                                "categoryId":component.get("v.categoryId"),
                                "topicId":component.get("v.topicId"),
                                "subTopic":component.get("v.subTopic"),
                               });
        actionResult.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                var results = a.getReturnValue();
                component.set("v.objPassAgentReportsToNG", results.objAgentReportsData);
                component.set("v.totalReportCount", results.TotalAgentReportsCount);
            } else if (a.getState() === "ERROR") {
                component.set("v.objPassAgentReportsToNG", null);
            }
        });
        $A.enqueueAction(actionResult);			
    },
})