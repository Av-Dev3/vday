"use client";

import { useState } from "react";
import { SceneShell } from "../ui/SceneShell";
import { ModalLightbox } from "../ui/ModalLightbox";
import { TearReveal } from "../interactions/TearReveal";
import { PocketOpen } from "../interactions/PocketOpen";
import { FlipPhoto } from "../interactions/FlipPhoto";
import { getPoems, getNotes, getClues } from "@/lib/vday/data";
import { photos } from "@/data/vday/photos";

interface RevealSiteSceneProps {
  foundClues: string[];
  onClueFound: (id: string) => void;
  onHuntComplete: () => void;
}

export function RevealSiteScene({
  foundClues,
  onClueFound,
  onHuntComplete,
}: RevealSiteSceneProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "photos" | "poems" | "notes" | "hunt"
  >("hunt");

  const poems = getPoems();
  const notes = getNotes();
  const clues = getClues();

  const totalClues = clues.length;
  const foundCount = foundClues.length;
  const isHuntComplete = foundCount === totalClues;

  const tearClues = clues.filter((c) => c.type === "tear");
  const pocketClues = clues.filter((c) => c.type === "pocket");
  const flipClues = clues.filter((c) => c.type === "flip");

  const collectedWords = clues
    .filter((c) => foundClues.includes(c.id) && c.word)
    .map((c) => c.word);

  return (
    <div className="min-h-screen bg-gradient-to-br from-vday-cream to-vday-lavender py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-vday-rose mb-4">
            Our Love Story
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our memories and find all the hidden clues
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["photos", "poems", "notes", "hunt"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as any)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeSection === section
                  ? "bg-vday-rose text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-vday-pink/30"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Photos Section */}
        {activeSection === "photos" && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-vday-purple">
              Our Moments Together
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo}
                  onClick={() => setLightboxImage(photo)}
                  className="aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poems Section */}
        {activeSection === "poems" && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-vday-purple">
              Love Poems
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {poems.map((poem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4 text-center">💝</div>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line text-center">
                    {poem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        {activeSection === "notes" && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-vday-purple">
              Little Notes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-vday-pink to-vday-rose rounded-xl shadow-lg p-6 text-white hover:scale-105 transition-transform"
                >
                  <p className="text-center text-lg font-medium">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scavenger Hunt Section */}
        {activeSection === "hunt" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-vday-purple mb-4">
                Scavenger Hunt
              </h2>
              <div className="inline-block bg-white rounded-full px-8 py-4 shadow-lg">
                <p className="text-2xl font-bold text-vday-rose">
                  {foundCount} / {totalClues} Clues Found
                </p>
              </div>
              {collectedWords.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {collectedWords.map((word, i) => (
                    <span
                      key={i}
                      className="bg-vday-rose text-white px-4 py-2 rounded-full font-bold shadow-md"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tear Reveals */}
            {tearClues.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-gray-700">
                  Tear to Reveal
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {tearClues.map((clue) => (
                    <TearReveal
                      key={clue.id}
                      id={clue.id}
                      content={clue.content}
                      isImage={clue.content.startsWith("/")}
                      word={clue.word}
                      onComplete={onClueFound}
                      alreadyFound={foundClues.includes(clue.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pockets */}
            {pocketClues.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-gray-700">
                  Open the Pockets
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {pocketClues.map((clue) => (
                    <PocketOpen
                      key={clue.id}
                      id={clue.id}
                      content={clue.content}
                      word={clue.word}
                      onComplete={onClueFound}
                      alreadyFound={foundClues.includes(clue.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Flip Photos */}
            {flipClues.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center text-gray-700">
                  Flip the Photos
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {flipClues.map((clue) => (
                    <FlipPhoto
                      key={clue.id}
                      id={clue.id}
                      frontImage={clue.content}
                      backContent={`You found a clue! ${clue.word || ""}`}
                      word={clue.word}
                      onComplete={onClueFound}
                      alreadyFound={foundClues.includes(clue.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Complete button */}
            {isHuntComplete && (
              <div className="text-center pt-8">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <p className="text-2xl font-bold text-vday-purple mb-6">
                  You found all the clues!
                </p>
                <button
                  onClick={onHuntComplete}
                  className="px-10 py-5 bg-gradient-to-r from-vday-rose to-vday-purple text-white font-bold text-xl rounded-full hover:scale-110 transition-all shadow-2xl"
                >
                  Enter Final Answer →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <ModalLightbox
          imageSrc={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
