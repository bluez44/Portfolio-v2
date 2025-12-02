export type ModelsProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

export type Project = {
  title: string;
  desc: string;
  subdesc: string;
  href: string;
  texture: string;
  logo: string;
  logoStyle: {
    backgroundColor: string;
    background?: string;
    border: string;
    boxShadow: string;
  };
  spotlight: string;
  tags: Tag[];
};

type Tag = {
  id: number;
  name: string;
  path: string;
};
