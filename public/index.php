<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buzzies</title>
</head>
<body>
    <h1>Welcome to Buzzies!</h1>
    <p>This is a simple PHP application.</p>
    <p>Current date and time: <?php echo date('Y-m-d H:i:s'); ?></p>
    <p>PHP version: <?php echo phpversion(); ?></p>
    <p>Server software: <?php echo $_SERVER['SERVER_SOFTWARE']; ?></p>
    <p>Document root: <?php echo $_SERVER['DOCUMENT_ROOT']; ?></p>
    <p>Request method: <?php echo $_SERVER['REQUEST_METHOD']; ?></p>
</body>
</html>