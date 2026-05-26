<?php
$title = "{$tank->getName()} ({$tank->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $tank->getName() ?></h1>
    <article>
        <p><strong>Type:</strong> <?= $tank->getType() ?></p>
        <p><strong>Caliber:</strong> <?= $tank->getCaliber() ?></p>
        <p><strong>Faction:</strong> <?= $tank->getFaction() ?></p>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('tank-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('tank-edit', ['id'=> $tank->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';