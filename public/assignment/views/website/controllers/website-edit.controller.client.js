(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.website2 = {
                _id: model.website._id,
                name: model.website.name,
                developerId: model.website.developerId,
                description: model.website.description
            };
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }

        function updateWebsite(websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        }
    }

})();