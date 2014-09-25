<?php

include ('./AndroidPusher.php');
// https://code.google.com/apis/console/
$apiKey = "AIzaSyDf89dKEjDfR0P3wHJs3DSqlfuVobbMB6Y";
$regId = "APA91bH306djMFdiRwU83naxe61LrsuXBYjgWW6XcWiuaWvlx8EmkLno-62WTjYhR6KSqtpNPvVSCnH9szNif4XV0-prU4kJKQrfMfMFMxzYKR4dMyenNRhfH7njsm1-JuOXq8RG-bo5fOCG-_60-1782n_ZZk3mFA";
echo "hola";
$pusher = new Pusher($apiKey);
echo "hola2";
$pusher->notify($regId, "Hola");
echo "hola3";

print_r($pusher->getOutputAsArray());

?>