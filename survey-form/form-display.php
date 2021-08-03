<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Survey Form</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">

        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
        <div class="container padding-50 bg-gray">
            <div class="form-container bg-white">
                <form class="form" action="test.php" method="GET">
                    <div class="header-info">
                        <h1 id="title">Survey Form</h1>
                        <p id="description">Your information will be confidential</p>
                    </div>
                    <div class="wrap">
                        <label class="field-label">Full name</label>
                        <input value="<?php echo $_GET['name'] ?>" type="text" disabled placeholder="No Full name">
                    </div>
                    <div class="wrap">
                        <label class="field-label">Email Address</label>
                        <input value="<?php echo $_GET['email'] ?>" type="text" disabled placeholder="No Email Address">
                    </div>

                    <div class="wrap">
                        <label class="field-label">Age</label>
                        <input value="<?php echo $_GET['age'] ?>" type="text" disabled placeholder="No age">
                    </div>
                    <div class="wrap">
                        <label class="field-label">University</label>
                        <input value="<?php echo $_GET['university'] ?>" type="text" disabled placeholder="No university">
                    </div>
                    <div class="wrap no-border">
                        <fieldset class="group"> 
                            <legend>Hobbies</legend> 
                            <ul class="checkbox"> 
                                <label class="container-checkbox">Reading
                                    <input <?php echo in_array('reading', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> type="checkbox" id="reading"  value="reading" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Traveling
                                    <input <?php echo in_array('traveling', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="traveling" value="traveling" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Fishing
                                    <input <?php echo in_array('reading', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="fishing" value="fishing" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Coding
                                    <input <?php echo in_array('coding', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="coding" value="coding" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Television
                                    <input <?php echo in_array('television', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="television" value="television" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Video Games
                                    <input <?php echo in_array('video-games', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="video-games" value="video-games" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Collecting
                                    <input <?php echo in_array('collecting', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="collecting" value="collecting" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container-checkbox">Music
                                    <input <?php echo in_array('music', $_GET['hobbies']) ? 'checked disabled' : 'disabled' ?> id="music" value="music" type="checkbox" name="hobbies[]">
                                    <span class="checkmark"></span>
                                </label>
                            </ul> 
                        </fieldset> 
                    </div>
                    <div class="wrap">
                        <label class="field-label">Gender</label>
                        <input value="<?php echo ucfirst($_GET['gender']) ?>" type="text" disabled placeholder="No university">
                    </div>
                    <div class="wrap full">
                        <label class="field-label" for="comment">Comment</label>
                        <textarea disabled class="field-focus" name="comment" id="comment" cols="30" rows="4" placeholder="No comment..."><?php echo $_GET['comment'] ?></textarea>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>
