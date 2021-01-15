$(document).on("turbolinks:load", function () {
    indexInject();
});


var indexInject = function (view) {
    if ($('.static_pages.index').length > 0) {
        indexTasks(function (response) {
            var htmlString = response.tasks.map(function(task) {
                var action = 'pass'
                switch (view) {
                    case 'active':
                        action = (task.completed) ? 'fail' : 'pass';
                        break;
                    case 'completed':
                        action = (task.completed) ? 'pass' : 'fail';
                        break;
                    case 'all':
                        action = 'pass'
                        break;
                    default:
                        action = 'pass'
                        break;
                }        
                var taskStatus = (task.completed) ? 'checked' : '';
                var classStatus = (taskStatus) ? 'bg-success' : 'bg-dark';
                if (action == 'pass') {
                    return "<div class='d-flex col-6 mb-3 py-2 text-center text-light border rounded task " + classStatus + "' data-id='" + task.id + "'> \
                        " + task.content + "\
                            <div class='ml-auto mr-5 form-check'> \
                                <input class='form-check-input' type='checkbox' id='" + task.id +"' " + taskStatus + "> \
                            </div> \
                            <button class='btn rounded text-dark deleteBtn'>Delete</button> \
                        </div>";
                } else {
                    return;
                }
            });
            $("#tasks").html(htmlString);
        });
    }
}


//onclick='deleteTask(" + task.id + ")';
