"use client";

import dynamic from "next/dynamic";

const NeuralScene = dynamic(() => import("./NeuralScene"), { ssr: false });

export default function SceneRoot() {
  return <NeuralScene />;
}
