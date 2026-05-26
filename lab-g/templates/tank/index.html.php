<?php
$title = 'Armored Division List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Tanks</h1>

    <a href="<?= $router->generatePath('tank-create') ?>">Deploy new tank</a>

    <ul class="index-list">
        <?php foreach ($tanks as $tank): ?>
            <li><h3><?= $tank->getName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('tank-show', ['id' => $tank->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('tank-edit', ['id' => $tank->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';