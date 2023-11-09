<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <title>PHP CRUD</title>

</head>

<body>

    <div class='api-message' id='api-message'></div>

    <div class='table'>
        <div class='table__headers'>
            <div class='title'>
                Фамилия
            </div>
            <div class='title'>
                Имя
            </div>
            <div class='title'>
                Отчество
            </div>
        </div>

        <!-- a list of users will be generated inside this element  -->
        <div id="usersList">

        </div>

        <form class="form-create" id="form-create-user" action="" method="post">

            <input class="form-create__input" type="text" name="lastName" id="lastName" />
            <input class="form-create__input" type="text" name="firstName" id="firstName" />
            <input class="form-create__input" type="text" name="middleName" id="middleName" />

            <button class="form-create__btn-submit" type="submit" name="submit" id="form-create-btn-submit">Добавить<br />пользователя</button>

        </form>

    </div>

    <script type="module" src="index.js"></script>
</body>

</html>