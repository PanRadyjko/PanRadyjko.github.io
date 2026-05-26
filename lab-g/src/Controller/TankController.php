<?php
namespace App\Controller;

use App\Model\Tank;
use App\Service\Router;
use App\Service\Templating;

class TankController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $tanks = Tank::findAll();
        $html = $templating->render('tank/index.html.php', [
            'tanks' => $tanks,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestTank, Templating $templating, Router $router): ?string
    {
        if ($requestTank) {
            $tank = Tank::fromArray($requestTank);
            $tank->save();

            $path = $router->generatePath('tank-index');
            $router->redirect($path);
            return null;
        } else {
            $tank = new Tank();
        }

        $html = $templating->render('tank/create.html.php', [
            'tank' => $tank,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $tankId, ?array $requestTank, Templating $templating, Router $router): ?string
    {
        $tank = Tank::find($tankId);
        if (! $tank) {
            throw new \Exception("Tank not found");
        }

        if ($requestTank) {
            $tank->fill($requestTank);
            $tank->save();

            $path = $router->generatePath('tank-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('tank/edit.html.php', [
            'tank' => $tank,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $tankId, Templating $templating, Router $router): ?string
    {
        $tank = Tank::find($tankId);
        if (! $tank) {
            throw new \Exception("Tank not found");
        }

        $html = $templating->render('tank/show.html.php', [
            'tank' => $tank,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $tankId, Router $router): ?string
    {
        $tank = Tank::find($tankId);
        if (! $tank) {
            throw new \Exception("Tank not found");
        }

        $tank->delete();
        $path = $router->generatePath('tank-index');
        $router->redirect($path);
        return null;
    }
}