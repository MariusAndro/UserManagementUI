$(document).ready(function() {

    //show html form when 'create user' button is clicked
    $(document).on('click', '.create-user-button', function() {
        //load list of companies
        $.getJSON("http://localhost:8080/UserManagement/RestApiPhpTestApp/api/company/readCompany.php", function(data) {
            //build company option html
            //loop through returned list of data

            var companies_option_html = `<select name='company_id' class= 'form-control'>`;
            $.each(data.records, function(key, val) {

                companies_option_html += `<option value='` + val["Company_Name"] + `'>` + val["Company_Name"] + `</option>`;
            });
            companies_option_html += `</select>`;


            var create_user_html = `
            <!-- 'create user' html form -->
            <form id='create-user-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
                    <tr>
                        <td>Personal ID Number</td>
                        <td><input type='text' name='personal_id_number' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td><input type='text' name='First_name' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td><input type='text' name='Last_name' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type='email' name='Email' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type='password' name='Password' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td><input type='text' name='Country' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td><input type='text' name='City' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td><input type='text' name='Street' class='form-control' required /></td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td><input type='text' name='Number' class='form-control' required /></td>
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
                        <td></td>
                        <td>
                            <button type='submit' class='btn btn-primary'>
                                <span class='glyphicon glyphicon-plus'></span> Create User
                            </button>
                        </td>
                    </tr>
                </table>
             </form>`;

            //inject html to 'page-content' of our app
            $("#page-content").html(create_user_html);
            //change page title
            changePageTitle("Create User");

        });

        //wil run if create product form was submitted                
        $(document).on('submit', '#create-user-form', function() {
            //console.log($(this));
            function getFormData($form) {
                var unindexed_array = $form.serializeArray();
                var indexed_array = {};

                $.map(unindexed_array, function(n, i) {
                    indexed_array[n['name']] = n['value'];
                });

                return indexed_array;
            }

            var $form = $("#create-user-form");
            var form_data = JSON.stringify(getFormData($form));
            //                 //console.log(form_data);

            //submit data to api                   
            $.ajax({
                url: "http://localhost:8080/NetBeans/Moodle/RestApiPhpTestApp/api/user/create.php",
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                data: form_data,
                datatype: 'json',
                success: function(result) {
                    //user was created, go back to users list
                    showUsers();
                },
                error: function(xhr, resp, text) {
                    //show error to console
                    //console.log(xhr,resp,text);
                }
            });
            return false;
        });

    });


});