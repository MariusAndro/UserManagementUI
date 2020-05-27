$(document).ready(function(){
    //handle read one button click
    $(document).on('click', '.read-one-user-button',function(){
        var id = $(this).attr('data-id');       
        //read user based on User ID
        $.getJSON("http://localhost:8080/NetBeans/Moodle/RestApiPhpTestApp/api/user/read_one.php?userID=" + id, function(data){            
            var read_one_product_html = `
                <div id='read-users' class='btn btn-primary pull right m-b-15px read-users-button'>
                    <span class='glyphicon glyphicon-list'></span> Read Users
                </div>
            
                <table class='table table-bordered table-hover'>
                    <tr>
                        <td>Personal ID Number</td>
                        <td>`+data.personalIdNumber+`</td>
                    </tr>
                    <tr>
                        <td class='w-30-pct'>First Name</td>
                        <td class='w-70-pct'>`+ data.firstName +`</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>`+data.lastName+`</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>`+data.email+`</td>
                    </tr>                    
                    <tr>
                        <td>Country</td>
                        <td>`+data.country+`</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>`+data.city+`</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>`+data.street+`</td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td>`+data.number+`</td>
                    </tr>
            </table>`;
            $("#page-content").html(read_one_product_html);
            changePageTitle("Create Product");
        });
    });
});
