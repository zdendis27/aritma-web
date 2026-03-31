# Uživatelská dokumentace

**Projekt:** SK Aritma Praha Web  
**Autor:** Zdeněk Vacek  
**Třída:** C3a  
**Škola:** SPŠE Ječná  
**Datum:** 31. 3. 2026

## 1. Úvod

Tato uživatelská dokumentace popisuje práci s webovou aplikací SK Aritma Praha Web. Aplikace slouží pro veřejné zobrazení informací o klubu a pro administraci obsahu.

## 2. Spuštění aplikace

Po spuštění projektu jsou dostupné tyto části:

- veřejný web: `http://localhost:5173`
- administrace: `http://localhost:5173/admin`
- backend API: `http://localhost:4000/api`

## 3. Veřejná část webu

Veřejná navigace obsahuje tyto položky:

- `Domů`
- `Zápasy`
- `Týmy`
- `Novinky`
- `Klub`
- `Admin`

Součástí aplikace jsou také samostatné stránky:

- `Kalendář`
- `Galerie`

### Domů

Na úvodní stránce se zobrazují hlavní informace o klubu a přehled nejdůležitějšího obsahu.

### Zápasy

Sekce `Zápasy` slouží k prohlížení plánovaných nebo odehraných utkání. Uživatel zde může sledovat přehled zápasů jednotlivých týmů.

### Týmy

V sekci `Týmy` jsou zobrazeny klubové kategorie a jejich základní informace.

### Novinky

Sekce `Novinky` obsahuje články a aktuality publikované klubem.

### Klub

Stránka `Klub` slouží k prezentaci obecných informací o organizaci a fungování klubu.

### Kalendář

Stránka `Kalendář` zobrazuje časový přehled akcí a zápasů.

### Galerie

V sekci `Galerie` si může návštěvník prohlížet fotografie.

## 4. Přihlášení do administrace

Administrace je určena pouze pro správce systému.

### Postup přihlášení

1. Otevřete stránku `http://localhost:5173/admin`.
2. Budete přesměrováni na přihlašovací formulář.
3. Zadejte e-mail a heslo administrátora.
4. Klikněte na tlačítko `Přihlásit`.

Výchozí testovací přihlašovací údaje:

- email: `admin@aritma.cz`
- heslo: `Aritma123!`

## 5. Administrace systému

Po přihlášení se zobrazí administrační panel. V levém menu jsou dostupné tyto sekce:

- `Dashboard`
- `Zápasy`
- `Týmy`
- `Hráči`
- `Novinky`
- `Galerie`

Součástí panelu je také tlačítko `Odhlásit`.

### Dashboard

Dashboard zobrazuje základní přehled dat v systému, například počty:

- zápasů,
- týmů,
- hráčů,
- článků.

### Správa zápasů

V této části může správce:

- zobrazovat seznam zápasů,
- přidávat nové zápasy,
- upravovat existující zápasy,
- mazat zápasy.

### Správa týmů

V této části může správce:

- zobrazovat seznam týmů,
- vytvářet nové týmy,
- upravovat údaje o týmech,
- mazat týmy.

### Správa hráčů

V této části může správce:

- zobrazovat seznam hráčů,
- přidávat nové hráče,
- upravovat informace o hráčích,
- mazat hráče.

### Správa novinek

V této části může správce:

- zobrazovat seznam článků,
- přidávat nové články,
- upravovat články,
- mazat články.

### Správa galerie

V této části může správce:

- zobrazovat galerii,
- přidávat nové položky galerie,
- mazat položky galerie.

## 6. Odhlášení

Pro bezpečné ukončení práce v administraci použijte tlačítko `Odhlásit` v levém postranním panelu.

## 7. Doporučení pro uživatele

- Pro běžné návštěvníky je určena veřejná část webu.
- Administraci by měl používat pouze oprávněný správce.
- Po dokončení práce v administraci je vhodné se odhlásit.
- Při nesprávných přihlašovacích údajích je nutné zkontrolovat e-mail a heslo.

## 8. Závěr

Aplikace SK Aritma Praha Web umožňuje pohodlné prohlížení klubových informací pro veřejnost a zároveň poskytuje jednoduché rozhraní pro správu obsahu administrátorem.
