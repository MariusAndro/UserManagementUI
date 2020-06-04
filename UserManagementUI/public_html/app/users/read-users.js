$(document).ready(function() {
    //show users at first load    
    showUsers();
});

$(document).on('click', 'read-users-button', function() {
    showUsers();
});

function showUsers() {
    //get users from API         
    $.getJSON("http://localhost:8080/UserManagement/RestApiPhpTestApp/api/user/readUser.php", function(data) {
        var read_users_html = `
            <!--when clicked, it will load the create product form' -->
               <div id='create-user-button' class='btn btn-primary pull-right m-b-15px create-user-button'>
                    <span class='glyphicon glyphicon-plus'></span>Create User</div>
             
                    <table class='table table-bordered table-hover'>
                    <tr>
                        <th class='w-10-pct'>User ID</th>
                        <th class='w-25-pct'>Personal ID Number</th>
                        <th class='w-25-pct'>First Name</th>
                        <th class='w-25-pct'>Last Name</th>
                        <th class='w-25-pct'>Email</th>
                        <th class='w-25-pct'>Country</th>
                        <th class='w-25-pct'>City</th>
                        <th class='w-25-pct'>Street</th>
                        <th class='w-10-pct'>Number</th>
                        <th class='w-25-pct text-align-center'>Action</th>
                    </tr>`;
        //loop through returned list of data
        $.each(data.records, function(key, val) {
            //create new table row per record            
            read_users_html += `<tr>            
                <td>` + val["User_ID"] + `</td>
                <td>` + val["personal_id_number"] + `</td>
                <td>` + val["First_name"] + `</td>
                <td>` + val["Last_name"] + `</td>
                <td>` + val["Email"] + `</td>
                <td>` + val["Country"] + `</td>
                <td>` + val["City"] + `</td>
                <td>` + val["Street"] + `</td>
                <td>` + val["Number"] + `</td>
            
                <!--'action' buttons -->               
                <td style='white-space: nowrap'>
                    <!-- read user button -->
                    <button class='btn btn-primary m-r-10px read-one-user-button' data-id='` + val["User_ID"] + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Read
                    </button>

                    <!-- edit button -->
                    <button class='btn btn-info m-r-10px update-user-button' data-id='` + val["User_ID"] + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>

                    <!-- delete button -->
                    <button class='btn btn-danger delete-user-button' data-id='` + val["User_ID"] + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
            </tr>`;

        });

        //end table
        read_users_html += `</table>`;
        $("#page-content").html(read_users_html);

        changePageTitle("Read Users");

    });
};