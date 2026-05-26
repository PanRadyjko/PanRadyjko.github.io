<?php ?>
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="tank[name]" value="<?= $tank ? $tank->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="type">Type</label>
    <input type="text" id="type" name="tank[type]" value="<?= $tank ? $tank->getType() : '' ?>">
</div>

<div class="form-group">
    <label for="caliber">Caliber</label>
    <input type="text" id="caliber" name="tank[caliber]" value="<?= $tank ? $tank->getCaliber() : '' ?>">
</div>

<div class="form-group">
    <label for="faction">Faction</label>
    <input type="text" id="faction" name="tank[faction]" value="<?= $tank ? $tank->getFaction() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>