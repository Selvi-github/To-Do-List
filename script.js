var app = angular.module('todoApp', []);

app.controller('x', function ($scope) {
    // Auth State
    $scope.isLoggedIn = false;
    $scope.user = {
        name: "",
        age: null
    };

    // Initial State
    $scope.schedule = [
        { work: 'Build Todo App', completed: false },
        { work: 'Style with Premium CSS', completed: false }
    ];
    $scope.todoWork = "";
    $scope.filterType = 'all';

    // Add New Task
    $scope.addNew = function () {
        if ($scope.todoWork.trim() === "") return;

        $scope.schedule.push({
            work: $scope.todoWork,
            completed: false
        });

        $scope.todoWork = ""; // Clear input
    };

    // Count Pending Tasks
    $scope.pending = function () {
        var count = 0;
        angular.forEach($scope.schedule, function (todo) {
            if (!todo.completed) count++;
        });
        return count;
    };

    // Archive Completed Tasks
    $scope.archive = function () {
        var oldSchedule = $scope.schedule;
        $scope.schedule = [];
        angular.forEach(oldSchedule, function (todo) {
            if (!todo.completed) $scope.schedule.push(todo);
        });
    };

    // Delete Specific Task
    $scope.deleteTask = function (index) {
        $scope.schedule.splice(index, 1);
    };

    // Filter Logic
    $scope.statusFilter = function (todo) {
        if ($scope.filterType === 'all') return true;
        if ($scope.filterType === 'pending') return !todo.completed;
        if ($scope.filterType === 'completed') return todo.completed;
    };

    // Login Logic
    $scope.login = function () {
        if ($scope.loginForm.$valid) {
            $scope.isLoggedIn = true;
        }
    };
});
