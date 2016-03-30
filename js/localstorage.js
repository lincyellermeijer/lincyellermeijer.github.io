//This is needed to call the function showList everytime the message page is reloaded        
$(document).on('pagebeforeshow', '#message', function (event) {
    loadPage();
});

// This loads the title of the clicked list item before the details page is loaded
$(document).on('pagebeforeshow', '#detail', function (event) {
    var title = decodeURIComponent(window.location.search.substring(1));
    renderDetail(title);
});


function loadPage() {
    // Fetch the existing objects
    objects = getObjects();

    // Clear the list
    $('#items').find('li').remove();

    // Add every object to the objects list
    $.each(objects, function (index, item) {
        element = `<li data-icon="info"><a href="detail.html?${item.title}">${item.title}</a></li>`;

        $('#items').append(element);
    });

    $('#items').listview();
    $('#items').listview("refresh");
}

function renderDetail(title) {
    // set title to detailTitle text
    $(".detailTitle").text(title);
}

// CREATE

function add() {
    // Retrieve the entered form data
    var title = $('[name="item"]').val();
    // Fetch the existing objects
    var objects = getObjects();
    // Push the new item into the existing list
    objects.push({
        title: title
    });
    // Store the new list
    saveObjects(objects);
    // Reload the page to show the new objects
    window.location.reload();
}

// READ

function getObjects() {
    // See if objects is inside localStorage
    if (localStorage.getItem("objects")) {
        // If yes, then load the objects
        objects = JSON.parse(localStorage.getItem("objects"));
    } else {
        // Make a new array of objects
        objects = new Array();

    }
    console.log(objects);
    return objects;
}

function getObject(name) {
    objects = JSON.parse(localStorage.getItem("objects"));

    var object = objects.filter(
        function (object) {
            return object.title === name;
        }
    );
    return object[0];
}

function saveObjects(objects) {
    // Save the list into localStorage
    localStorage.setItem("objects", JSON.stringify(objects));
}

// UPDATE
function update() {
    console.log("update button clicked")
        // get the title 
    var title = decodeURIComponent(window.location.search.substring(1));
    // Retrieve the entered form data
    var name = $('[name="itemUpdate"]').val();
    // fetch the existing objects
    var objects = getObjects();
    objects.map(function (item, index) {
        if (item.title === title) {
            objects[index].title = name;
        }
    })

    saveObjects(objects);
    alert("Message updated!");
    window.location.replace("message.html");
}


// DELETE
function deleteAll() {
    if (confirm('Are you sure you want to delete all messages?')) {
        // Fetch the existing objects
        objects = getObjects();

        // Clear the list
        $('#items').find('li').remove();

        localStorage.setItem("objects", []);

        $('#items').listview();
        $('#items').listview("refresh");
    } else {
        // Do nothing!
    }

}

function deleteThis() {
    console.log("delete button clicked")
    if (confirm('Are you sure you want to delete this message?')) {
        console.log("Deleted")
            // get the title 
        var title = $('.detailTitle')[0].innerText;
        // fetch the existing objects
        var objects = getObjects();
        objects.map(function (item, index) {
            if (item.title === title) {
                objects.splice(index, 1);
                saveObjects(objects);
                window.location.replace("message.html");
            }
        });
    } else {
        // Do nothing!
    }
}