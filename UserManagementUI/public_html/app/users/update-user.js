$(document).ready(function() {
    //show html form when update button is clicked
    $(document).on('click', '.update-user-button', function() {
        var id = $(this).attr('data-id');
        //read one user based on selected id
        $.getJSON("http://localhost:8080/UserManagement/RestApiPhpTestApp/api/user/read_one.php?userID=" + id, function(data) {
            var personalIdNumber = data.personalIdNumber;
            var firstName = data.firstName;
            var lastName = data.lastName;
            var email = data.email;
            var password = data.password;
            var country = data.country;
            var city = data.city;
            var street = data.street;
            var number = data.number;
            var company = data.company;

            $.getJSON("http://localhost:8080/UserManagement/RestApiPhpTestApp/api/user/readUser.php", function(data) {
                var companies_option_html = `<select name='Company' class= 'form-control'>`;
                $.each(data.records, function(key, val) {
                    //preselect option if company id is the same
                    if (val["Company_Name"] === company) { companies_option_html += `<option name = 'Company' value='` + val["Company_Name"] + `'selected>` + val["Company_Name"] + `</option>`; } else { companies_option_html += `<option name = 'Company' value='` + val["Company_Name"] + `'>` + val["Company_Name"] + `</option>`; }
                });
                companies_option_html += `</select>`;

                var update_user_html = `
                <div id='read-users' class=btn btn-primary pull-right m-b-15px read-users-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Users
                </div>
               <form id='update-user-form' action='#' method='post' border='0'>
               <table class='table table-hover table-responsive table-bordered'>
                    <tr>
                        <td>Personal ID Number</td>
                        <td><input type='text' name='personal_id_number' value =\"` + personalIdNumber + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td><input type='text' name='First_name' value=\"` + firstName + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><input type='text' name='Last_name' value=\"` + lastName + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type='email' name='Email' value=\"` + email + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type='password' name='password' value=\"` + password + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td><input type='text' name='Country' value=\"` + country + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td><input type='text' name='City' value=\"` + city + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td><input type='text' name='Street' value=\"` + street + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td><input type='text' name='Number' value=\"` + number + `\" class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Company</td>
                        <td>` + companies_option_html + `</td>
                    </tr>
                    <tr>
                        <td>Rank</td>
                        <td>
                            <select name='Rank' class='form-control'>
                                <option value="Administrator">Administrator</option>
                                <option value="User">User</option>
                            </select>
                        </td>
                    </tr>
                    <tr>

                        <!--button to submit form-->
                        <td>
                            <button type='submit' class='btn btn-info'>
                                <span class='glyphicon glyphicon-edit'></span> Update User
                            </button>
                        </td>
                    </tr>
               </table>
            </form>`;

                $("#page-content").html(update_user_html);

                changePageTitle("Update User");
            });
        });
    });
    // will run if 'create product' form was submitted
    $(document).on('submit', '#update-user-form', function() {

        function getFormData($form) {
            var unindexed_array = $form.serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function(n, i) {
                indexed_array[n['name']] = n['value'];
            });

            return indexed_array;
        }

        var $form = $("#update-user-form");
        var form_data = JSON.stringify(getFormData($form));

        // submit form data to api
        $.ajax({
            url: "http://localhost:8080/NetBeans/Moodle/RestApiPhpTestApp/api/user/update.php",
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: form_data,
            datatype: 'json',
            success: function(result) {
                //user was creSated, go back to users list
                showUsers();
                //console.log(form_data);
            },
            error: function(xhr, resp, text) {
                //show error to console
                console.log(xhr, resp, text);
            }
        });
        return false;
    });
});