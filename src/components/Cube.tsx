import { Float } from "@react-three/drei";
import type { ModelsProps } from "../types";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mesh } from "three";

const Cube = (props: ModelsProps) => {
  const cubeRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);

  useGSAP(() => {
    if (cubeRef.current) {
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 1,
          yoyo: true,
        })
        .to(cubeRef.current.rotation, {
          x: hovered ? "+= 20" : `+=${Math.PI * 2}`,
          y: hovered ? "+= 2" : `+=${Math.PI * 2}`,
          duration: 2.5,
          stagger: {
            each: 0.15,
          },
        });
    }
  });

  return (
    <Float floatIntensity={10}>
      <mesh
        {...props}
        ref={cubeRef}
        onPointerEnter={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshNormalMaterial />
      </mesh>
    </Float>
  );
};

export default Cube;
