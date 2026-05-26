<?php
$title = 'Add Tank';
$bodyClass = 'edit';

ob_start(); ?>
    <h1>Deploy New Tank</h1>
    <form action="<?= $router->generatePath('tank-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="tank-create">
    </form>

    <a href="<?= $router->generatePath('tank-index') ?>">Cancel</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';