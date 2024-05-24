"use client";

import DNDList from "../primitive/drag-drop-list";

export default function DeckList() {
  return (
    <DNDList
      initialItems={tempDecks.map((deck) => ({
        id: deck.id,
        index: deck.index,
        isGroup: deck.isGroup,
        attributes: {
          Title: deck.title,
          New: deck.new,
          Learning: deck.learning,
          Review: deck.review,
        },
      }))}
    />
  );
}

const tempDecks = [
  {
    id: "group-0",
    title: "First Group",
    new: 0,
    learning: 0,
    review: 0,
    index: 8,
    isGroup: true,
  },
  {
    id: "f3b8180b-6033-42f9-a340-0979e5410f80",
    title: "Crocuta crocuta",
    new: 35,
    learning: 32,
    review: 347,
    index: 0,
  },
  {
    id: "c149a4a6-07a5-4bd7-99e2-733ad3bc8008",
    title: "Phascogale calura",
    new: 81,
    learning: 183,
    review: 309,
    index: 5,
  },
  {
    id: "fb39c57f-3604-4d32-a503-f1ba1e90b8a7",
    title: "Anas punctata",
    new: 5,
    learning: 11,
    review: 182,
    index: 2,
  },
  {
    id: "6507b961-1cfc-4dd1-a487-7171954df091",
    title: "Marmota flaviventris",
    new: 83,
    learning: 99,
    review: 134,
    index: 3,
  },
  {
    id: "6b509de1-14ad-4e91-889e-1f878f2ddaaa",
    title: "Chlidonias leucopterus",
    new: 45,
    learning: 122,
    review: 41,
    index: 4,
  },
  {
    id: "11e9db11-e946-4ea5-91f2-86663bc46a67",
    title: "Otaria flavescens",
    new: 94,
    learning: 88,
    review: 415,
    index: 1,
  },
  {
    id: "ce052d2b-9ff1-4ed3-b3e0-3008247fcc16",
    title: "Cebus apella",
    new: 24,
    learning: 179,
    review: 368,
    index: 6,
  },
  {
    id: "99bb4d5a-90f9-4f8a-8c2e-b9df30792d8d",
    title: "Passer domesticus",
    new: 50,
    learning: 42,
    review: 173,
    index: 7,
  },
];
