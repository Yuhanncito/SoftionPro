import { LoadingAtoms } from "../atoms/LoadingAtoms";
export const LoadingMolecule = () => {
  return (
    <div
      role="status"
      className="w-screen h-screen flex justify-center items-center flex-col"
    >
      <LoadingAtoms />
      <span className=" font-bold text-2xl mt-4">Cargando</span>
    </div>
  );
};
