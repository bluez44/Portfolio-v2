import { useGLTF } from "@react-three/drei";
import type { ModelsProps } from "../types";

const HackerRoom = (props: ModelsProps) => {
  const { scene } = useGLTF("models/hacker_room.glb");
  return <primitive object={scene} {...props} />;
};

export default HackerRoom;
