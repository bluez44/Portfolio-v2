import { Float, useGLTF } from "@react-three/drei";
import type { ModelsProps } from "../types";
import { useRef } from "react";

const ReactLogo = (props: ModelsProps) => {
  const { scene } = useGLTF("/models/react_logo.glb");
  const reactRef = useRef(null);

  return (
    <mesh {...props} ref={reactRef}>
      <Float floatIntensity={10}>
        <primitive object={scene} />
      </Float>
    </mesh>
  );
};

export default ReactLogo;
