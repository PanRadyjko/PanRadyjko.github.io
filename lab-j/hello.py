import sys

imie = "Piotr"
album = "57756"
wersja_python = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
sciezka_venv = sys.executable
print(f"Hello {imie} ({album}). This environment is using Python version {wersja_python} at location {sciezka_venv}.")
