(function () {
    angular
        .module('JobApp')
        .controller('profileController', profileController);

    function profileController($location,
                               $routeParams,
                               currentUser,
                               employerService) {

        var model = this;

        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            renderUser(currentUser);
        }
        init();

        function logout() {
            employerService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function deleteUser(user) {
            employerService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(userId, user) {
            console.log(model.user.email);

            employerService
                .updateUser(userId, user)
                .then(function () {
                    model.message = "User has updated successfully!";
                });
        }

        function renderUser (user) {
            model.user = user;
        }
    }
})();