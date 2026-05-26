<?php
$title = "Edit Tank {$tank->getName()} ({$tank->getId()})";
$bodyClass = 'edit';

ob_start(); ?>
    <h1>Edit Tank</h1>
    <form action="<?= $router->generatePath('tank-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="tank-edit">
        <input type="hidden" name="id" value="<?= $tank->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('tank-index') ?>">Cancel</a>
        </li>
        <li>
            <form action="<?= $router->generatePath('tank-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure you want to scrap this tank?')">
                <input type="hidden" name="action" value="tank-delete">
                <input type="hidden" name="id" value="<?= $tank->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';