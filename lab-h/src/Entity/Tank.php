<?php

namespace App\Entity;

use App\Repository\TankRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TankRepository::class)]
class Tank
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $caliber = null;

    #[ORM\Column(length: 255)]
    private ?string $faction = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getCaliber(): ?string
    {
        return $this->caliber;
    }

    public function setCaliber(string $caliber): static
    {
        $this->caliber = $caliber;

        return $this;
    }

    public function getFaction(): ?string
    {
        return $this->faction;
    }

    public function setFaction(string $faction): static
    {
        $this->faction = $faction;

        return $this;
    }
}
