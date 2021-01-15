
$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});


var indexTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=1',
        success: successCB,
        error: errorCB
    }
    
    $.ajax(request);
};


var postTask = function (content, successCB, errorCB) {
    var postID = null;
    var request = {
        type: 'POST',
        url: 'api/tasks?api_key=1',
        data: {
            task: {
                content: content
            }
        },
        success: function (response) {
            postID = response.task.id
        },
        error: errorCB
    }
    
    async function postUpdate() {
        await $.ajax(request);
        await indexInject();
    }

    postUpdate();
};

var changeStatus = function (task, successCB, errorCB) {
    const id = task.id
    const status = (task.checked) ?  true : false
    const changeVar = (task.checked) ? "mark_complete" : "mark_active"

    var request = {
        type: 'PUT',
        url: 'api/tasks/' + id + '/' + changeVar + '?api_key=1',
        data: {
            task: {
                completed: status
            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

var deleteTask = function (id, successCB, errorCB) {
    //const id = task.id
    var request = {
        type: 'DELETE',
        url: 'api/tasks/' + id + '?api_key=1',
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
};

$(document).ready(function () {
    $(document).on('click', '.form-check-input', function() {
        let bkg = (this.checked) ? 'bg-success' : 'bg-dark';
        let rmBkg = (this.checked) ? 'bg-dark' : 'bg-success';
        let target = $(this).parent().parent()
        target.removeClass(rmBkg).addClass(bkg)
        
        changeStatus(this);     
    });
    $('#form').submit(function(e) {
        e.preventDefault();
        newTask = this[0].value;
        this[0].value = '';
        if (newTask) {
            postTask(newTask);
        } else {
            console.log("No task value to add");
        }
    });
    $(document).on('click', '.deleteBtn', function() {
        const id = $(this).parent()[0].attributes[1].value
        $(this).parent().remove();
        deleteTask(id);
    });
    $(document).on('click', '#activeTasks', function() {
        indexInject('active');
    });
    $(document).on('click', '#completedTasks', function() {
        indexInject('completed');
    });
    $(document).on('click', '#allTasks', function() {
        indexInject('all');
    });
})




