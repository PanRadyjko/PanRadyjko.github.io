<?php // I:\ptw\lab-f\yaml.php

$data = [
    'name' => 'Piotr Mikulski',
    'index' => '57756',
    'date' => date(DATE_ATOM),
];

$yaml = yaml_emit($data);

echo $yaml;