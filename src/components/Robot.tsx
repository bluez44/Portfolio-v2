import { useAnimations, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type { ModelsProps } from "../types";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Robot = (props: ModelsProps) => {
  const { scene, animations } = useGLTF("/models/robot.glb");
  const robotRef = useRef<Mesh>(null);
  const { actions } = useAnimations(animations, robotRef);

  useGSAP(() => {
    if(robotRef.current) {
      gsap.to(robotRef.current.position, {
      y: robotRef.current.position.y + 0.5,
      duration: 1,                                                      
      repeat: -1,
      yoyo: true,
    });
    }
  });

  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y += 0.01;
      actions["Dance"]?.play();
    }
  });

  return (
    <mesh {...props} ref={robotRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Robot;
