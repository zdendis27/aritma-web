import bcrypt from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.gallery.deleteMany();
  await prisma.article.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("Aritma123!", 10);

  await prisma.user.create({
    data: {
      email: "admin@aritma.cz",
      password,
      role: UserRole.ADMIN
    }
  });

  const teams = await Promise.all(
    [
      { name: "A tym", category: "Muzi" },
      { name: "B tym", category: "Muzi" },
      { name: "U19", category: "Dorost" },
      { name: "U17", category: "Dorost" },
      { name: "U15", category: "Zaci" }
    ].map((team) => prisma.team.create({ data: team }))
  );

  const players = [
    { name: "Jan Novak", position: "Brankar", number: 1, photo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80", teamId: teams[0].id },
    { name: "Petr Svoboda", position: "Obrance", number: 4, photo: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80", teamId: teams[0].id },
    { name: "Tomas Cerny", position: "Zaloznik", number: 8, photo: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80", teamId: teams[1].id },
    { name: "Daniel Vesely", position: "Utocnik", number: 10, photo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=900&q=80", teamId: teams[2].id },
    { name: "Ondrej Kral", position: "Zaloznik", number: 6, photo: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=900&q=80", teamId: teams[3].id },
    { name: "Lukas Holub", position: "Obrance", number: 3, photo: "https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=900&q=80", teamId: teams[4].id }
  ];

  await prisma.player.createMany({ data: players });

  await prisma.match.createMany({
    data: [
      {
        homeTeam: "SK Aritma Praha",
        awayTeam: "FK Kraluv Dvur",
        homeScore: 2,
        awayScore: 1,
        competition: "Divize A",
        date: new Date("2026-03-08T14:30:00.000Z"),
        stadium: "Stadion Aritma",
        teamId: teams[0].id
      },
      {
        homeTeam: "SK Aritma Praha",
        awayTeam: "Admira Praha B",
        homeScore: null,
        awayScore: null,
        competition: "Divize A",
        date: new Date("2026-03-22T09:15:00.000Z"),
        stadium: "Stadion Aritma",
        teamId: teams[0].id
      },
      {
        homeTeam: "SK Aritma Praha B",
        awayTeam: "Slavoj Podoli",
        homeScore: 1,
        awayScore: 1,
        competition: "I.A trida",
        date: new Date("2026-03-10T17:00:00.000Z"),
        stadium: "Praha 6",
        teamId: teams[1].id
      },
      {
        homeTeam: "SK Aritma Praha U19",
        awayTeam: "Bohemians Praha 1905 U19",
        homeScore: 3,
        awayScore: 2,
        competition: "Ceska liga dorostu",
        date: new Date("2026-03-12T11:00:00.000Z"),
        stadium: "Stadion Aritma",
        teamId: teams[2].id
      }
    ]
  });

  await prisma.article.createMany({
    data: [
      {
        title: "A tym zvládl vstup do jara",
        content: "Aritma zvitezila po disciplinovanem vykonu 2:1. Muzstvo podrzel organizovany blok i efektivni prechod do utoku.",
        image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80",
        author: "Klubova redakce"
      },
      {
        title: "Dorostenci otocili dramaticky zapas",
        content: "Kategorie U19 navazala na dobrou pripravu a po aktivnim druhom polocase si pripsala cenne tri body.",
        image: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=1200&q=80",
        author: "Trenersky tym"
      },
      {
        title: "Zveme na rodinny den v arealu",
        content: "Klub připravuje odpoledne pro rodiny, fanoušky a mladé fotbalisty. Nebudou chybět ukázkové tréninky ani autogramiáda.",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80",
        author: "SK Aritma Praha"
      }
    ]
  });

  await prisma.gallery.createMany({
    data: [
      { title: "Vitezne derby", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80" },
      { title: "Mládežnický turnaj", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80" },
      { title: "Trenink pod svetly", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80" }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
