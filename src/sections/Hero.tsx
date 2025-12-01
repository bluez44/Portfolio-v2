import {
  DragControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { useMediaQuery } from "react-responsive";
import Robot from "../components/Robot";
import ReactLogo from "../components/ReactLogo";
import Cube from "../components/Cube";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center">
          Hi, I'm Quang Vinh <span className="waving-hand">👋</span>
        </p>
        <p className="text-gray-500 text-center text-2xl sm:text-4xl">
          Building Products & Brands
        </p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera
              makeDefault
              position={isMobile ? [0, 0, 15] : [0, 0, 30]}
            />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={isMobile ? 0.06 : 0.1}
                position={[isMobile ? 0.5 : 1, isMobile ? -2 : -6, 0]}
                rotation={[Math.PI / 12, Math.PI, 0]}
              />
            </HeroCamera>

            <group>
              <DragControls>
                <Robot
                  position={[isMobile ? 0 : -8, -10, 6]}
                  rotation={[0, 0.6, 0]}
                />
              </DragControls>
              <ReactLogo
                position={[isMobile ? 5 : 12, isMobile ? 6 : 8, 0]}
                rotation={[0, -0.6, 0]}
                scale={0.5}
              />
              <Cube
                position={[isMobile ? -5 : -12, isMobile ? 0 : 8, 0]}
                scale={isMobile ? 0.5 : 1}
              />
            </group>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a href="#contact" className="w-fit">
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96 text-white mx-auto bg-white/10 hover:bg-white/5 hover:cursor-pointer duration-300 transistion-colors flex items-center justify-center py-5"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
