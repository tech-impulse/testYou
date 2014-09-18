<?php

//namespace AndroidPusher;

$apiKey = "AIzaSyDf89dKEjDfR0P3wHJs3DSqlfuVobbMB6Y";
$regId = "APA91bH306djMFdiRwU83naxe61LrsuXBYjgWW6XcWiuaWvlx8EmkLno-62WTjYhR6KSqtpNPvVSCnH9szNif4XV0-prU4kJKQrfMfMFMxzYKR4dMyenNRhfH7njsm1-JuOXq8RG-bo5fOCG-_60-1782n_ZZk3mFA";
echo "hola";
$pusher = new Pusher($apiKey);
echo "hola2";
$pusher->notify($regId, "Hola");
echo "hola3";

print_r($pusher->getOutputAsArray());


class Pusher
{
    
    const GOOGLE_GCM_URL = 'https://android.googleapis.com/gcm/send';

    private $apiKey;
    private $proxy;
    private $output;
   
    public function __construct($apiKey, $proxy = null)
    {
        $this->apiKey = $apiKey;
        $this->proxy  = $proxy;
    }

     
    public function notify($regIds, $data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::GOOGLE_GCM_URL);
        if (!is_null($this->proxy)) {
            curl_setopt($ch, CURLOPT_PROXY, $this->proxy);
        }
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $this->getPostFields($regIds, $data));

        $result = curl_exec($ch);
        if ($result === false) {
            throw new \Exception(curl_error($ch));
        }

        curl_close($ch);

        $this->output = $result;
    }


    public function getOutputAsArray()
    {
        return json_decode($this->output, true);
    }

    public function getOutputAsObject()
    {
        return json_decode($this->output);
    }

    private function getHeaders()
    {
        return [
            'Authorization: key=' . $this->apiKey,
            'Content-Type: application/json'
        ];
    }

    private function getPostFields($regIds, $data)
    {
        $fields = [
            'registration_ids' => is_string($regIds) ? [$regIds] : $regIds,
            'data'             => is_string($data) ? ['message' => $data] : $data,
        ];

        return json_encode($fields, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    }
    
    
    
}

?>