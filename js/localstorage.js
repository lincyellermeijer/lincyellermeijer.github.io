function loadPage() {
    // Fetch the existing objects
    objects = getObjects();

    // Clear the list
    $('#items').find('li').remove();

    // Add every object to the objects list
    $.each(objects, function (index, item) {
        element = '<li>' + item.title + '</li>';

        $('#items').append(element);
    });

    $('#items').listview();
    $('#items').listview("refresh");
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
    return objects;
}

function saveObjects(objects) {
    // Save the list into localStorage
    localStorage.setItem("objects", JSON.stringify(objects));
}

// UPDATE



// DELETE

function deleteAll() {
    // Fetch the existing objects
    objects = getObjects();

    // Clear the list
    $('#items').find('li').remove();

    $('#items').listview();
    $('#items').listview("refresh");
}