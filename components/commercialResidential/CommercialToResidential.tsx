import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { projects_social_to_commercial } from "../../common/constants";

type GalleryImage = {
  src: string;
  alt: string;
  name?: string;
};

type PlanImage = {
  src: string;
  alt: string;
  name: string;
};

type SelectedImage = {
  src: string;
  alt: string;
  isPlan: boolean;
  name?: string;
};

type ProjectItem = {
  property: GalleryImage;
  plans: PlanImage[];
  apartmentCount?: number;
};

type CommercialProject = {
  title: string;
  description: string;
  items: ProjectItem[];
};

export default function TopSection() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const router = useRouter();
  const pinchStateRef = useRef<{ distance: number; zoom: number } | null>(null);
  const lastTapAtRef = useRef<number>(0);

  const clampZoom = (value: number): number => {
    return Math.max(1, Math.min(4, value));
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    pinchStateRef.current = null;
  };

  const resetViewerTransform = (): void => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    pinchStateRef.current = null;
  };

  const openSelectedImage = (image: SelectedImage): void => {
    resetViewerTransform();
    setSelectedImage(image);
  };

  const getPlansGridClasses = (count: number): string => {
    if (count === 1) {
      return "grid gap-4 sm:gap-6 grid-cols-1 max-w-xs";
    }

    if (count === 2) {
      return "grid gap-4 sm:gap-6 grid-cols-2 max-w-md";
    }

    if (count === 3) {
      return "grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 max-w-3xl";
    }

    return "grid gap-4 sm:gap-6 grid-cols-2 xl:grid-cols-4 max-w-full";
  };

  const handleWheelZoom = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (!selectedImage?.isPlan) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    const nextZoom = clampZoom(zoom + delta);
    setZoom(nextZoom);

    if (nextZoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!selectedImage?.isPlan) {
      return;
    }

    if (event.touches.length === 2) {
      const firstTouch = event.touches[0];
      const secondTouch = event.touches[1];
      const distance = Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY);
      pinchStateRef.current = { distance, zoom };
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!selectedImage?.isPlan || event.touches.length !== 2 || !pinchStateRef.current) {
      return;
    }

    event.preventDefault();

    const firstTouch = event.touches[0];
    const secondTouch = event.touches[1];
    const distance = Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY);
    const nextZoom = clampZoom((distance / pinchStateRef.current.distance) * pinchStateRef.current.zoom);
    setZoom(nextZoom);

    if (nextZoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = (): void => {
    pinchStateRef.current = null;
  };

  const handleViewerDoubleClick = (): void => {
    if (!selectedImage?.isPlan) {
      return;
    }

    resetViewerTransform();
  };

  const handleViewerTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    handleTouchEnd();

    if (!selectedImage?.isPlan) {
      return;
    }

    if (event.touches.length === 0 && event.changedTouches.length === 1) {
      const now = Date.now();
      if (now - lastTapAtRef.current < 280) {
        resetViewerTransform();
      }
      lastTapAtRef.current = now;
    }
  };

return (
    <div className="bg-gray-100 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 pt-24 sm:pt-32 md:pt-28">
      <div className="container mx-auto max-w-6xl mb-6 sm:mb-8 md:mb-12">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gallery of Works
        </motion.h1>
      </div>

      <div className="container mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.push('/projects?category=current#portfolio')}
          className="mb-6 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span aria-hidden="true" className="mr-1">‹</span> Back
        </button>
      </div>

      <div className="container mx-auto max-w-6xl">
        {(projects_social_to_commercial as CommercialProject[]).map((project, index) => (
          <motion.div
            key={index}
            className="mb-8 sm:mb-12 md:mb-16 p-3 sm:p-4 md:p-6 lg:p-8 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-3 sm:mb-4">{project.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-4 sm:mb-6">{project.description}</p>

            <div className="space-y-4 sm:space-y-6">
              {project.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Left Column: Property View */}
                  <div className="rounded-lg border border-gray-200 p-3 bg-white lg:col-span-5 flex flex-col">
                    <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-500 text-center">
                      {item.property.name ?? "PROPERTY VIEW"}
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <div
                        className="relative w-full h-full min-h-[14rem] rounded-xl overflow-hidden bg-white cursor-pointer"
                        onClick={() => openSelectedImage({ src: item.property.src, alt: item.property.alt, isPlan: false, name: "Property View" })}
                      >
                        <Image
                          src={item.property.src}
                          alt={item.property.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Plans OR Apartment Count */}
                  <div className="rounded-lg border border-gray-200 p-3 bg-white lg:col-span-7 flex flex-col items-center justify-center">
                    <p className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-500">
                      {item.plans && item.plans.length > 0 ? "FLOOR PLANS" : "PROPOSED DEVELOPMENT"}
                    </p>
                    <div className="flex justify-center items-center w-full min-h-[18rem]">
                      
                      {/* Render Floor Plans Grid if plans exist */}
                      {item.plans && item.plans.length > 0 ? (
                        <div className={getPlansGridClasses(item.plans.length) + " items-center justify-items-center content-center"}>
                          {item.plans.map((plan, planIndex) => (
                            <div key={plan.src + "-" + planIndex} className="flex flex-col items-center justify-center gap-2 h-full">
                              <div
                                className="relative w-full h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
                                onClick={() => openSelectedImage({ src: plan.src, alt: plan.alt, isPlan: true, name: plan.name })}
                              >
                                <Image
                                  src={plan.src}
                                  alt={plan.alt}
                                  width={520}
                                  height={520}
                                  className="rounded-lg object-contain bg-white w-full h-40 sm:h-48 md:h-56 mx-auto my-auto transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                              <p className="text-xs font-semibold text-gray-600 uppercase text-center">{plan.name}</p>
                            </div>
                          ))}
                        </div>
                      ) : 
                      
                      /* Render Apartment Count representation if no plans exist */
                      item.apartmentCount ? (
                        <div className="flex flex-col items-center justify-center w-full h-full p-6">
                          <div className="bg-gray-50 border border-gray-100 shadow-sm rounded-2xl w-full max-w-sm aspect-video flex flex-col items-center justify-center transform transition-transform hover:scale-105">
                            <span className="text-7xl sm:text-8xl font-black text-blue-600 drop-shadow-sm mb-2">
                              {item.apartmentCount}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-gray-500 uppercase tracking-[0.2em]">
                              Apartments
                            </span>
                          </div>
                        </div>
                      ) : null}

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Modal for Selected Image */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4" onClick={closeModal}>
          <motion.div
            className="relative w-full max-w-6xl p-4 sm:p-6 bg-white rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-gray-800 text-2xl z-20" onClick={closeModal}>
              ✕
            </button>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 pr-10">
              <p className="text-sm font-semibold text-gray-700">{selectedImage.name ?? "Image Preview"}</p>
              {selectedImage.isPlan ? <p className="text-xs text-gray-500">Pinch or scroll to zoom, drag to pan</p> : null}
            </div>

            <div
              className="relative flex items-center justify-center min-h-[50vh] max-h-[78vh] overflow-hidden touch-manipulation"
              onWheel={handleWheelZoom}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleViewerTouchEnd}
              onDoubleClick={handleViewerDoubleClick}
              style={{ touchAction: selectedImage.isPlan && zoom > 1 ? "pan-x pan-y" : "manipulation" }}
            >
              <motion.div
                animate={{
                  scale: selectedImage.isPlan ? zoom : 1,
                  x: selectedImage.isPlan ? pan.x : 0,
                  y: selectedImage.isPlan ? pan.y : 0,
                }}
                transition={{ type: "spring", stiffness: 210, damping: 28 }}
                drag={selectedImage.isPlan && zoom > 1}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (!selectedImage.isPlan || zoom <= 1) return;
                  setPan((previousPan) => ({
                    x: previousPan.x + info.offset.x,
                    y: previousPan.y + info.offset.y,
                  }));
                }}
                className="relative flex items-center justify-center w-full h-full"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={900}
                  className="rounded-2xl w-auto max-w-full max-h-[75vh] object-contain mx-auto my-auto select-none"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}