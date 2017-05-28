(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams.widgetId;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
            $location.url('/user/' + model.userId +'/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    }

})();