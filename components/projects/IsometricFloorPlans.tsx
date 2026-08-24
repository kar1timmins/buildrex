"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type FloorPlan = {
  id: string;
  name: string;
  imagePath: string;
  baseZIndex: number;
};

const FLOOR_PLANS: FloorPlan[] = [
  {
    id: "t104-lower-ground",
    name: "T-104 Lower Ground",
    imagePath: "/floorplans/ground_floor.png",
    baseZIndex: 10,
  },
  {
    id: "t104-ground",
    name: "T-104 Ground",
    imagePath: "/floorplans/first_floor.png",
    baseZIndex: 20,
  },
  {
    id: "t104-first",
    name: "T-104 First",
    imagePath: "/floorplans/second_floor.png",
    baseZIndex: 30,
  },
  {
    id: "tower-view-apartments",
    name: "Tower View Apartments",
    imagePath: "/floorplans/third_floor.png",
    baseZIndex: 40,
  },
];

const STACK_STEP_Y = 16;
const HOVER_LIFT_Y = -20;

export default function IsometricFloorPlans(): JSX.Element {
  const [activeFloor, setActiveFloor] = useState<string | null>(null);
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null);

  const orderedFloors = useMemo(() => [...FLOOR_PLANS].sort((a, b) => a.baseZIndex - b.baseZIndex), []);
  const activeFloorData = useMemo(
    () => orderedFloors.find((floor) => floor.id === activeFloor) ?? null,
    [orderedFloors, activeFloor]
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Interactive Plan Navigator</p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Isometric Floor Plans</h2>
        </div>

        {activeFloorData ? (
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900">
            Viewing: {activeFloorData.name}
          </div>
        ) : (
          <p className="text-sm text-slate-600">Hover a floor to preview, then click to inspect in detail.</p>
        )}
      </div>

      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 p-4 md:h-[680px] md:p-8">
        {activeFloorData ? (
          <div className="pointer-events-auto absolute right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-slate-300 bg-white/95 p-2 shadow-lg backdrop-blur">
            {orderedFloors.map((floor) => {
              const isSelected = floor.id === activeFloor;
              return (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() => setActiveFloor(floor.id)}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                    isSelected
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
                  ].join(" ")}
                >
                  {floor.name}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setActiveFloor(null)}
              className="ml-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Back to Stack
            </button>
          </div>
        ) : null}

        <div
          className="relative mx-auto h-full w-full"
          style={{
            perspective: "1800px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          {orderedFloors.map((floor, index) => {
            const isActive = activeFloor === floor.id;
            const inDetailMode = activeFloor !== null;
            const isHovered = hoveredFloor === floor.id;
            const hasHoveredCard = hoveredFloor !== null;
            const isOtherCard = hasHoveredCard && hoveredFloor !== floor.id;

            const stackY = index * STACK_STEP_Y + (isHovered ? HOVER_LIFT_Y : 0);
            const detailY = isActive ? "-50%" : index % 2 === 0 ? -80 : 80;
            const zIndex = floor.baseZIndex + index;

            return (
              <motion.div
                key={floor.id}
                initial={false}
                animate={{
                  top: inDetailMode ? "50%" : 42,
                  x: "-50%",
                  y: inDetailMode ? detailY : stackY,
                  opacity: inDetailMode ? (isActive ? 1 : 0) : isOtherCard ? 0.42 : 1,
                  scale: inDetailMode ? (isActive ? 1.08 : 0.92) : isHovered ? 1.04 : 1,
                  rotateX: inDetailMode ? (isActive ? 0 : 60) : 60,
                  rotateZ: inDetailMode ? (isActive ? 0 : -45) : -45,
                }}
                transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.85 }}
                onHoverStart={() => {
                  if (!inDetailMode) {
                    setHoveredFloor(floor.id);
                  }
                }}
                onHoverEnd={() => {
                  if (!inDetailMode) {
                    setHoveredFloor((current) => (current === floor.id ? null : current));
                  }
                }}
                onClick={() => {
                  if (!inDetailMode) {
                    setActiveFloor(floor.id);
                  }
                }}
                className="absolute left-1/2"
                style={{ zIndex }}
              >
                <div
                  className={[
                    "relative rounded-2xl bg-white p-2 ring-1 ring-slate-200 transition-shadow",
                    "shadow-[6px_6px_0_#cbd5e1,0_24px_45px_rgba(15,23,42,0.28)]",
                    inDetailMode && isActive
                      ? "h-[320px] w-[86vw] max-w-[1020px] cursor-default md:h-[560px]"
                      : "h-[220px] w-[320px] cursor-pointer md:h-[320px] md:w-[470px]",
                  ].join(" ")}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={floor.imagePath}
                      alt={`${floor.name} floor plan`}
                      fill
                      sizes={inDetailMode ? "(max-width: 1200px) 86vw, 1020px" : "(max-width: 768px) 320px, 470px"}
                      className={inDetailMode && isActive ? "object-contain" : "object-cover"}
                      priority={index === orderedFloors.length - 1}
                    />
                  </div>

                  <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-slate-900/75 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white md:text-xs">
                    {floor.name}
                  </div>

                  {inDetailMode && isActive ? (
                    <button
                      type="button"
                      onClick={() => setActiveFloor(null)}
                      className="absolute right-3 top-3 rounded-md border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                    >
                      Close
                    </button>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}