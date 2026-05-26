<?php
namespace App\Model;

use App\Service\Config;

class Tank
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $type = null;
    private ?string $caliber = null;
    private ?string $faction = null;

    public function getId(): ?int { return $this->id; }
    public function setId(?int $id): Tank { $this->id = $id; return $this; }

    public function getName(): ?string { return $this->name; }
    public function setName(?string $name): Tank { $this->name = $name; return $this; }

    public function getType(): ?string { return $this->type; }
    public function setType(?string $type): Tank { $this->type = $type; return $this; }

    public function getCaliber(): ?string { return $this->caliber; }
    public function setCaliber(?string $caliber): Tank { $this->caliber = $caliber; return $this; }

    public function getFaction(): ?string { return $this->faction; }
    public function setFaction(?string $faction): Tank { $this->faction = $faction; return $this; }

    public static function fromArray(array $array): Tank
    {
        $tank = new self();
        $tank->fill($array);
        return $tank;
    }

    public function fill(array $array): Tank
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) $this->setName($array['name']);
        if (isset($array['type'])) $this->setType($array['type']);
        if (isset($array['caliber'])) $this->setCaliber($array['caliber']);
        if (isset($array['faction'])) $this->setFaction($array['faction']);

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM tank';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $tanks = [];
        $tanksArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($tanksArray as $tankArray) {
            $tanks[] = self::fromArray($tankArray);
        }

        return $tanks;
    }

    public static function find($id): ?Tank
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM tank WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $tankArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (!$tankArray) {
            return null;
        }

        return Tank::fromArray($tankArray);
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (!$this->getId()) {
            $sql = "INSERT INTO tank (name, type, caliber, faction) VALUES (:name, :type, :caliber, :faction)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'type' => $this->getType(),
                'caliber' => $this->getCaliber(),
                'faction' => $this->getFaction(),
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE tank SET name = :name, type = :type, caliber = :caliber, faction = :faction WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'type' => $this->getType(),
                'caliber' => $this->getCaliber(),
                'faction' => $this->getFaction(),
                'id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM tank WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            'id' => $this->getId(),
        ]);
    }
}