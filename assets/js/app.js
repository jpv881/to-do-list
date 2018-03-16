$("#dataForm").on("keydown", function (event) {
    if (event.key === "Enter") start();
});

$("#btnCreate").on("click", function () {
    start();
});

function start() {
    let txt = $("#dataForm input").val();

    if (txt === "") alert("Empty form data");
    else {
        if (localStorage.getItem("taskList") === null) {
            let todo = {
                tasks: [
                    {index: 1, task: txt}
                ]
            };
            save(todo);
        } else {
            let taskList = getTasks();
            let newIndex = taskList.tasks.length + 1;
            taskList.tasks.push({index: newIndex, task: txt});
            save(taskList);
        }

    }
}

function renderTasks() {
    clearRenderedTasks();

    let tasks = getTasks().tasks;

    if (tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
            let rw = "<tr><th>" + tasks[i].index + "</th><td>" + tasks[i].task
                + "</td><td><span class='fa fa-trash-alt' index='" + tasks[i].index + "'></span></td></tr>"

            $("#table tbody").append(rw);
        }
        $("table").css("visibility", "visible");
    }else{
        $("table").css("visibility", "hidden");
    }
}

function save(obj) {
    localStorage.setItem("taskList", JSON.stringify(obj));
    $("#dataForm input").val("");

    renderTasks();
}

function getTasks() {
    let tasks = localStorage.getItem("taskList");
    if (tasks) return JSON.parse(tasks);
    else return {tasks: []};
}

function clearRenderedTasks() {
    $("#table tbody").empty();
}

$(document.body).on("click", ".fa-trash-alt", function () {
    removeElement($(this).attr("index"));
});

function removeElement(index) {
    let tasks = getTasks();
    tasks.tasks.splice(index - 1, 1);
    save(orderIndex(tasks));
    renderTasks();
}

function orderIndex(tasks) {
    for (let i = 0; i < tasks.tasks.length; i++) {
        tasks.tasks[i].index = i + 1;
    }

    return tasks;
}

renderTasks();